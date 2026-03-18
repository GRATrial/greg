// Vercel serverless function for tracking events to MongoDB
import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'GoogleSim';
const COLLECTION_NAME = 'greg_events';

// Handle CORS preflight
if (typeof process !== 'undefined' && process.env) {
  // Running in Node.js environment
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Parse request body - Vercel may send it as a string
    let event = req.body;
    if (typeof event === 'string') {
      try {
        event = JSON.parse(event);
      } catch (parseError) {
        console.error('Failed to parse request body:', parseError);
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }
    }

    console.log('Received request:', {
      method: req.method,
      headers: req.headers,
      bodyType: typeof req.body,
      body: event
    });

    // Validate required fields
    if (!event || !event.eventType || !event.persona) {
      console.error('Missing required fields:', { 
        hasEvent: !!event,
        eventType: event?.eventType, 
        persona: event?.persona,
        fullEvent: event 
      });
      return res.status(400).json({ 
        error: 'Missing required fields', 
        received: event,
        required: ['eventType', 'persona']
      });
    }

    // Check that MONGODB_URI is configured
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return res.status(500).json({ error: 'Database not configured' });
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    
    try {
      await client.connect();
      console.log('✅ Connected to MongoDB successfully');
      
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      // Prepare document for insertion
      const document = {
        ...event,
        timestamp: event.timestamp ? new Date(event.timestamp) : new Date(),
        createdAt: new Date(),
      };

      console.log('Inserting document:', JSON.stringify(document, null, 2));

      // Insert the event
      const result = await collection.insertOne(document);
      console.log('✅ Event inserted successfully:', result.insertedId);

      // Verify insertion
      const verify = await collection.findOne({ _id: result.insertedId });
      console.log('✅ Verification:', verify ? 'Document found' : 'Document NOT found');

      return res.status(200).json({ 
        success: true, 
        insertedId: result.insertedId,
        message: 'Event tracked successfully'
      });
    } catch (dbError: any) {
      console.error('❌ Database error:', {
        message: dbError.message,
        name: dbError.name,
        code: dbError.code,
        stack: dbError.stack
      });
      throw dbError;
    } finally {
      await client.close();
      console.log('MongoDB connection closed');
    }
  } catch (error: any) {
    console.error('❌ Tracking error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    // Return error details for debugging
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Tracking failed',
      errorName: error.name,
      errorCode: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
