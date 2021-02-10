const db = require('../db');
const getCreateString = require('../helpers/getCreateString');
const getUpdateString = require('../helpers/getUpdateString');
const { ExpressError } = require('../expressError');

class DraughtItems {
    static async get() {
        const results = await db.query(`SELECT * FROM draught_list`);
        return results.rows;
    }

    static async getByItemId(id) {
        const results = await db.query(`SELECT * FROM draught_list WHERE item_id=$1`, [id]);
        return results.rows;
    }
    static async getByVenue(id) {
        const results = await db.query(`SELECT * FROM draught_list WHERE venue_id=$1`, [id]);
        return results.rows;
    }

    static async create(data) {
        try {
            const { createString, values } = getCreateString("draught_list", data);
            const newDraughtItem = await db.query(createString, values);
            return newDraughtItem.rows[0];
        } catch (e) {
            if (e.code === '23503') {
                throw new ExpressError(e.detail, 403)
            }
        }
        
    }

    static async update(id, data) {
        const { updateString, values } = getUpdateString("draught_list", id, data);
        const draughtItem = await db.query(updateString, values);
        return draughtItem;
    }

    static async delete(id) {
        await db.query(`DELETE FROM draught_list WHERE id=$1`, [id]);
    }
}

module.exports = DraughtItems;