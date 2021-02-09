const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config')
const { getUpdateStringAndValues } = require('../helpers/getUpdateString')

class User {
    static async get() {
        const results = await db.query('SELECT username, email, city, state, zip, is_owner FROM users');
        return results.rows;
    };

    static async create(data) {
        const { username, password, email, city, state, zip } = data;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const results = await db.query(
            `INSERT INTO users (username, password, email, city, state, zip)
                VALUES
                ($1, $2, $3, $4, $5, $6)
                RETURNING *`, [username, hashedPassword, email, city, state, zip]);
        if (results.rows.length === 0) {
            throw new Error();
        }
        const newUser = results.rows[0];
        delete newUser.password;
        return newUser;
        
    };

    static async update(id, data) {
        console.log(id, data);
        const { updateString, values } = getUpdateStringAndValues("users", id, data);
        const result = await db.query(updateString, values);
        return result.rows[0];
    }

    static async delete(id) {
        await db.query(`DELETE FROM users WHERE id=$1`, [id]);
        return ({ message: "deleted" });
    }


}

module.exports = User;