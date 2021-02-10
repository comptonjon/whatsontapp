function getCreateString(tableName, data) {
    const keys = Object.keys(data);
    const values = Object.values(data).map(val => val === "" ? null : val);
    const columnString = keys.join(", ");
    const valueVariables = keys.map((k, i) => `$${i+1}`);
    const variableString = valueVariables.join(", ")
    const createString = `INSERT INTO ${tableName} (${columnString}) VALUES (${variableString}) RETURNING *`;
    return { createString, values };
}

module.exports = getCreateString;