const db = require('../db');
const { getUpdateStringAndValues } = require('../helpers/getUpdateString');
const getCreateString = require('../helpers/getCreateString');

class Venue {
    static async get() {
        const results = await db.query('SELECT * FROM venues');
        return results.rows;
    };

    static async create(data) {
        // const { name, address1, address2, city, state, zip, url, phone } = data;
        // const results = await db.query(
        //     `INSERT INTO venues (name, address1, address2, city, state, zip, url, phone)
        //         VALUES
        //         ($1, $2, $3, $4, $5, $6, $7, $8)
        //         RETURNING *`, [name, address1, address2, city, state, zip, url, phone]);
        const { createString, values } = getCreateString("venues", data);
        const results = await db.query(createString, values);
        if (results.rows.length === 0) {
            throw new Error();
        }
        const newVenue = results.rows[0];
        return newVenue;
        
    };

    static async update(id, data) {
        console.log(id, data);
        const { updateString, values } = getUpdateStringAndValues("venues", id, data);
        const result = await db.query(updateString, values);
        return result.rows[0];
    }

    static async delete(id) {
        await db.query(`DELETE FROM venues WHERE id=$1`, [id]);
        return ({ message: "deleted" });
    }
}

module.exports = Venue;