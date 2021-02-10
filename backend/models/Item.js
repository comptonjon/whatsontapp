const db = require('../db');
const getCreateString = require('../helpers/getCreateString');
const { getUpdateStringAndValues } = require('../helpers/getUpdateString');
const ExpressError = require('../expressError');

class Item {
    static async get(id=null) {
        let queryString = "SELECT * FROM items";
        const values = [];
        if (id) {
            queryString += " WHERE id=$1";
            values.push(id);
        }
        const results = await db.query(queryString, values);
        return results.rows;
    }

    static async create(data) {
        const { createString, values } = getCreateString("items", data);
        const results = await db.query(createString, values);
        return results.rows[0];
    }

    static async update(id, data) {
        const { updateString, values } = getUpdateStringAndValues("items", id, data);
        const result = await db.query(updateString, values);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query(`DELETE FROM items WHERE id=$1 RETURNING *`, [id]);
        if (result.rows.length === 0) {
            throw new ExpressError("Item not found", 404);
        }

    }
}

module.exports = Item;