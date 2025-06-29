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

exports.health = async (event) => {
  return formatResponse(200, { 
    status: 'OK', 
    timestamp: new Date(),
    service: 'lifeos-backend'
  });
}; 