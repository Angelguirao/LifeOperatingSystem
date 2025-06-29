const { MongoClient, ObjectId } = require('mongodb');

// Global connection variables (reused across invocations)
let cachedClient = null;
let cachedDb = null;

// Connection pooling configuration
const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  maxPoolSize: 1, // Keep only one connection for Lambda
  minPoolSize: 0,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  w: 'majority',
  // SSL configuration that works better with Lambda
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  // Add these for better Lambda compatibility
  directConnection: false,
  retryReads: true
};

async function connectToDatabase() {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    try {
      // Test if connection is still alive
      await cachedClient.db('admin').admin().ping();
      console.log('Using cached MongoDB connection');
      return cachedDb;
    } catch (error) {
      console.log('Cached connection failed, creating new one');
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    console.log('Creating new MongoDB connection...');
    
    // Clean up connection string
    let connectionString = process.env.MONGODB_URI;
    
    // Ensure we have the right database name
    if (!connectionString.includes('/lifeos')) {
      connectionString = connectionString.replace('?', '/lifeos?');
    }
    
    const client = new MongoClient(connectionString, CONNECTION_OPTIONS);
    
    // Connect with timeout
    await Promise.race([
      client.connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 15000)
      )
    ]);
    
    cachedClient = client;
    cachedDb = client.db('lifeos');
    
    console.log('MongoDB connection established successfully');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cachedClient = null;
    cachedDb = null;
    throw error;
  }
}

// Helper function to format API Gateway response
function formatResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify(body)
  };
}

// GET /api/events
exports.getEvents = async (event) => {
  try {
    console.log('getEvents function called');
    const db = await connectToDatabase();
    
    const events = await db.collection('events')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    
    console.log(`Found ${events.length} events`);
    return formatResponse(200, events);
  } catch (error) {
    console.error('Error getting events:', error);
    return formatResponse(500, { 
      error: error.message,
      details: 'Database connection or query failed'
    });
  }
};

// POST /api/events
exports.createEvent = async (event) => {
  try {
    console.log('createEvent function called');
    const body = JSON.parse(event.body);
    const { content, type = 'thought', emotion, energy } = body;
    
    if (!content) {
      return formatResponse(400, { error: 'Content is required' });
    }

    const eventData = {
      content,
      type,
      emotion: emotion || null,
      energy: energy || null,
      timestamp: new Date(),
      createdAt: new Date()
    };

    const db = await connectToDatabase();
    const result = await db.collection('events').insertOne(eventData);
    
    console.log('Event created successfully:', result.insertedId);
    return formatResponse(201, { ...eventData, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating event:', error);
    return formatResponse(500, { 
      error: error.message,
      details: 'Failed to create event'
    });
  }
};

// GET /api/events/{id}
exports.getEvent = async (event) => {
  try {
    console.log('getEvent function called');
    const { id } = event.pathParameters;
    const db = await connectToDatabase();
    
    const eventData = await db.collection('events').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!eventData) {
      return formatResponse(404, { error: 'Event not found' });
    }
    
    return formatResponse(200, eventData);
  } catch (error) {
    console.error('Error getting event:', error);
    return formatResponse(500, { 
      error: error.message,
      details: 'Failed to retrieve event'
    });
  }
};

// DELETE /api/events/{id}
exports.deleteEvent = async (event) => {
  try {
    console.log('deleteEvent function called');
    const { id } = event.pathParameters;
    const db = await connectToDatabase();
    
    const result = await db.collection('events').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return formatResponse(404, { error: 'Event not found' });
    }
    
    console.log('Event deleted successfully');
    return formatResponse(200, { message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return formatResponse(500, { 
      error: error.message,
      details: 'Failed to delete event'
    });
  }
}; 