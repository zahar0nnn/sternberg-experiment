module.exports = async (req, res) => {
    console.log('Test API called with method:', req.method);
    console.log('Request body:', req.body);
    
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.json({ 
        success: true, 
        message: 'API is working',
        method: req.method,
        timestamp: new Date().toISOString()
    });
};
