const db = require('../db');

class User {
    static async get() {
        const results = await db.query('SELECT * FROM users');
        console.log(results.rows)
        return results.rows;
    }
}

module.exports = User;