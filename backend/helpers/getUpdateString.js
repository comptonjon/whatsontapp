function getUpdateStringAndValues(tableName, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    values.push(id);
    const assignmentArray = getKeyArray(keys);
    const assignments = assignmentArray.join(", ");
    const updateString = `UPDATE ${tableName} SET ${assignments} WHERE id=$${values.length} RETURNING *`;
    return { updateString, values };

}

function getKeyArray(keys) {
    return keys.map((k, i) => `${k}=$${i+1}`);
}

module.exports = { getUpdateStringAndValues, getKeyArray };