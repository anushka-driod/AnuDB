const db = require("../database/db");

async function getColumns(tableId) {
    const result = await db.query(
        `SELECT
            id,
            column_name,
            data_type,
            is_required
         FROM columns
         WHERE table_id = $1
         ORDER BY id`,
        [tableId]
    );

    return result.rows;
}

function validateValue(column, value) {

    if (value === null || value === "") {
        if (column.is_required) {
            throw new Error(
                `${column.column_name} is required`
            );
        }

        return;
    }

    switch (column.data_type) {

        case "VARCHAR":
        case "TEXT":

            if (typeof value !== "string") {
                throw new Error(
                    `${column.column_name} must be text`
                );
            }

            break;

        case "INTEGER":

            if (
                typeof value !== "number" ||
                !Number.isInteger(value)
            ) {
                throw new Error(
                    `${column.column_name} must be INTEGER`
                );
            }

            break;

        case "DECIMAL":

            if (
                typeof value !== "number" ||
                Number.isNaN(value)
            ) {
                throw new Error(
                    `${column.column_name} must be DECIMAL`
                );
            }

            break;

        case "BOOLEAN":

            if (typeof value !== "boolean") {
                throw new Error(
                    `${column.column_name} must be BOOLEAN`
                );
            }

            break;

        case "DATE":

        case "TIMESTAMP":

            if (typeof value !== "string") {
                throw new Error(
                    `${column.column_name} must be a valid date`
                );
            }

            break;

        default:
            break;
    }
}

async function validateRecord(tableId, values) {

    const columns = await getColumns(tableId);

    if (columns.length === 0) {
        throw new Error(
            "No columns found for this table"
        );
    }

    // Required fields
    for (const column of columns) {

        const item = values.find(
            v => Number(v.columnId) === Number(column.id)
        );

        if (
            column.is_required &&
            (!item ||
                item.value === null ||
                item.value === "")
        ) {
            throw new Error(
                `${column.column_name} is required`
            );
        }
    }

    // Validate supplied values
    for (const item of values) {

        const column = columns.find(
            c => Number(c.id) === Number(item.columnId)
        );

        if (!column) {
            throw new Error(
                `Invalid column ID: ${item.columnId}`
            );
        }

        validateValue(column, item.value);
    }
}

async function validateUpdateRecord(tableId, values) {

    const columns = await getColumns(tableId);

    for (const item of values) {

        const column = columns.find(
            c => Number(c.id) === Number(item.columnId)
        );

        if (!column) {
            throw new Error(
                `Invalid column ID: ${item.columnId}`
            );
        }

        validateValue(column, item.value);
    }
}

module.exports = {
    validateCreateRecord: validateRecord,
    validateUpdateRecord
};