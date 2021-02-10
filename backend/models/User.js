const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config')
const { getUpdateStringAndValues } = require('../helpers/getUpdateString');
const getCreateString = require('../helpers/getCreateString');

class User {
    static async authenticate(data) {
        const { username, password } = data;
        const results = await db.query(`SELECT * FROM users WHERE username=$1`, [username]);
        if (results.rows.length === 0) {
            throw new Error();
        } 
        const user = results.rows[0];
        const authenticated = await bcrypt.compare(password, user.password);
        if (!authenticated) {
            throw new Error();
        }
        delete user.password;
        return user;
    }

    static async get() {
        const results = await db.query('SELECT username, email, city, state, zip, is_owner FROM users');
        return results.rows;
    };

    static async register(data) {
        data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        const { createString, values } = getCreateString("users", data);
        const results = await db.query(createString, values);
        if (results.rows.length === 0) {
            throw new Error();
        }
        const newUser = results.rows[0];
        delete newUser.password;
        return newUser;
        
    };

    static async update(id, data) {
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