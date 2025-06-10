const pool = require('../config/database');

const healthCheck = async (req, res) => {
    try {
        // Check database connection
        await pool.query('SELECT 1');
        
        return res.status(200).json({
            status: 'healthy',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(503).json({
            status: 'unhealthy',
            database: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = {
    healthCheck
};