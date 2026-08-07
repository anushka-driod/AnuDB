const db = require("../database/db");

async function validateRecord(tableId, values) {
    // Get all columns for the table
    const result = await db.query(
        `SELECT
            id,
            column_name,
            data_type,
            is_required
         FROM columns
         WHERE table_id = $1`,
        [tableId]
    );

    const columns = result.rows;

    // Check required fields
    for (const column of columns) {
        if (column.is_required) {
            const value = values.find(
                v => v.columnId === column.id
            );

            if (!value || value.value === null || value.value === "") {
                throw new Error(
                    `${column.column_name} is required`
                );
            }
        }
    }

    // Check data types
    for (const item of values) {
        const column = columns.find(
            c => c.id === item.columnId
        );

        if (!column) continue;

        switch (column.data_type) {

            case "INTEGER":
                if (!Number.isInteger(item.value)) {
                    throw new Error(
                        `${column.column_name} must be INTEGER`
                    );
                }
                break;

            case "DECIMAL":
                if (typeof item.value !== "number") {
                    throw new Error(
                        `${column.column_name} must be DECIMAL`
                    );
                }
                break;

            case "BOOLEAN":
                if (typeof item.value !== "boolean") {
                    throw new Error(
                        `${column.column_name} must be BOOLEAN`
                    );
                }
                break;

            case "TEXT":
                if (typeof item.value !== "string") {
                    throw new Error(
                        `${column.column_name} must be TEXT`
                    );
                }
                break;
        }
    }
}

module.exports = {
    validateCreateRecord: validateRecord,
    validateUpdateRecord: async function (tableId, values) {

        const result = await db.query(
            `SELECT
                id,
                column_name,
                data_type
             FROM columns
             WHERE table_id = $1`,
            [tableId]
        );

        const columns = result.rows;

        for (const item of values) {

            const column = columns.find(
                c => c.id === item.columnId
            );

            if (!column) continue;

            switch (column.data_type) {

                case "INTEGER":
                    if (!Number.isInteger(item.value)) {
                        throw new Error(
                            `${column.column_name} must be INTEGER`
                        );
                    }
                    break;

                case "DECIMAL":
                    if (typeof item.value !== "number") {
                        throw new Error(
                            `${column.column_name} must be DECIMAL`
                        );
                    }
                    break;

                case "BOOLEAN":
                    if (typeof item.value !== "boolean") {
                        throw new Error(
                            `${column.column_name} must be BOOLEAN`
                        );
                    }
                    break;

                case "TEXT":
                    if (typeof item.value !== "string") {
                        throw new Error(
                            `${column.column_name} must be TEXT`
                        );
                    }
                    break;
            }
        }
    }
}; 