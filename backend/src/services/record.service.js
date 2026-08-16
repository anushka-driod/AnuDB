const db = require("../database/db");
const recordModel = require("../models/record.model");
const recordValueModel = require("../models/recordValue.model");
const recordValidator = require("../validators/record.validator");
const queryEngine = require("../engines/query/query.engine");
const relationshipEngine = require("../engines/relationship/relationship.engine");

// Create Record
async function createRecord(tableId, values) {

    await recordValidator.validateCreateRecord(tableId, values);

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const record = await recordModel.createRecordWithClient(
            client,
            tableId
        );

        for (const item of values) {

            await recordValueModel.createRecordValue(
                client,
                record.id,
                item.columnId,
                item.value
            );

        }

        await client.query("COMMIT");

        return record;

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

// Update Record
async function updateRecord(recordId, values) {

    const result = await db.query(
        `SELECT table_id
         FROM records
         WHERE id = $1`,
        [recordId]
    );

    if (result.rows.length === 0) {
        throw new Error("Record not found");
    }

    const tableId = result.rows[0].table_id;

    await recordValidator.validateUpdateRecord(
        tableId,
        values
    );

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        for (const item of values) {

            await recordValueModel.updateRecordValue(
                client,
                recordId,
                item.columnId,
                item.value
            );

        }

        await client.query("COMMIT");

        return {
            id: recordId
        };

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

// Get Records
async function getRecords(tableId, query) {

    let rows = await recordModel.getRecords(tableId);

    let groupedRecords = {};

    rows.forEach((row) => {

        if (!groupedRecords[row.record_id]) {

            groupedRecords[row.record_id] = {
                recordId: row.record_id
            };

        }

        groupedRecords[row.record_id][row.column_name] = row.value;

    });

    let records = Object.values(groupedRecords);

    // Get relationship metadata
    const relationships = await relationshipEngine.getRelationships(tableId);

    records = records.map(record => ({
        ...record,
        relationships
    }));

    // Search
    records = queryEngine.applySearch(
        records,
        query.search
    );

    // Sort
    records = queryEngine.applySort(
        records,
        query.sortBy,
        query.order
    );

    // Pagination
    records = queryEngine.applyPagination(
        records,
        query.page,
        query.limit
    );

    return records;
}

// Delete Record
async function deleteRecord(recordId) {

    return await recordModel.deleteRecord(recordId);

}

module.exports = {
    createRecord,
    updateRecord,
    getRecords,
    deleteRecord
};