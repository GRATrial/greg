// Vercel serverless function for tracking events to MongoDB
//
// 2026-09-13: the MongoClient is cached across warm invocations (faster, fewer connections),
// and a duplicate (sessionId, seq) insert — a client re-send — is answered 200 so the client
// stops retrying. Requires the partial unique index `uniq_session_seq` on the collection.
import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'GoogleSim';
const COLLECTION_NAME = 'greg_events';

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

const getClient = (): Promise<MongoClient> => {
  if (cachedClient) return Promise.resolve(cachedClient);
  if (!cachedPromise) {
    cachedPromise = new MongoClient(MONGODB_URI, { maxPoolSize: 5 })
      .connect()
      .then((c) => { cachedClient = c; return c; })
      .catch((e) => { cachedPromise = null; throw e; });
  }
  return cachedPromise;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body - Vercel may send it as a string (sendBeacon posts a Blob)
    let event = req.body;
    if (typeof event === 'string') {
      try {
        event = JSON.parse(event);
      } catch (parseError) {
        console.error('Failed to parse request body:', parseError);
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }
    }

    // Validate required fields
    if (!event || !event.eventType || !event.persona) {
      console.error('Missing required fields:', { eventType: event?.eventType, persona: event?.persona });
      return res.status(400).json({
        error: 'Missing required fields',
        received: event,
        required: ['eventType', 'persona'],
      });
    }

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return res.status(500).json({ error: 'Database not configured' });
    }

    const client = await getClient();
    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

    const document = {
      ...event,
      timestamp: event.timestamp ? new Date(event.timestamp) : new Date(),
      createdAt: new Date(),
    };

    try {
      const result = await collection.insertOne(document);
      return res.status(200).json({
        success: true,
        insertedId: result.insertedId,
        message: 'Event tracked successfully',
      });
    } catch (dbError: any) {
      if (dbError && dbError.code === 11000) {
        // Same (sessionId, seq) already stored — a client re-send. Treat as success.
        return res.status(200).json({ success: true, duplicate: true, message: 'Event already tracked' });
      }
      // Connection may have gone stale — drop the cache so the next call reconnects
      cachedClient = null;
      cachedPromise = null;
      throw dbError;
    }
  } catch (error: any) {
    console.error('❌ Tracking error:', { message: error.message, name: error.name, code: error.code });
    return res.status(500).json({
      success: false,
      error: error.message || 'Tracking failed',
      errorName: error.name,
      errorCode: error.code,
    });
  }
}
