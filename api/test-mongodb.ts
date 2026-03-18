// Test MongoDB connection endpoint
import { MongoClient } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'GoogleSim';
const COLLECTION_NAME = 'tracking_events';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!MONGODB_URI) {
      return res.status(500).json({ error: 'MONGODB_URI environment variable is not set' });
    }

    console.log('Testing MongoDB connection...');
    const client = new MongoClient(MONGODB_URI);
    
    try {
      await client.connect();
      console.log('✅ Connected to MongoDB');
      
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      // Test insert
      const testEvent = {
        eventType: 'test',
        elementType: 'test',
        persona: 'test',
        timestamp: new Date(),
        createdAt: new Date(),
        test: true
      };

      const insertResult = await collection.insertOne(testEvent);
      console.log('✅ Test event inserted:', insertResult.insertedId);

      // Count documents
      const count = await collection.countDocuments();
      console.log('✅ Total documents in collection:', count);

      // Get recent events
      const recentEvents = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();

      return res.status(200).json({
        success: true,
        message: 'MongoDB connection successful',
        insertedId: insertResult.insertedId,
        totalDocuments: count,
        recentEvents: recentEvents.map(e => ({
          id: e._id,
          eventType: e.eventType,
          persona: e.persona,
          timestamp: e.timestamp,
          createdAt: e.createdAt
        }))
      });
    } catch (dbError: any) {
      console.error('❌ Database error:', dbError);
      return res.status(500).json({
        success: false,
        error: dbError.message,
        stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
      });
    } finally {
      await client.close();
      console.log('Connection closed');
    }
  } catch (error: any) {
    console.error('❌ Connection error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to connect to MongoDB',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
