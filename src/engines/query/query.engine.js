function applySearch(records, search) {

    if (!search) return records;

    const keyword = search.toLowerCase();

    return records.filter(record => {

        return Object.values(record).some(value => {

            return String(value)
                .toLowerCase()
                .includes(keyword);

        });

    });

}

function applySort(records, sortBy, order = "asc") {

    if (!sortBy) return records;

    return [...records].sort((a, b) => {

        if (a[sortBy] < b[sortBy])
            return order === "asc" ? -1 : 1;

        if (a[sortBy] > b[sortBy])
            return order === "asc" ? 1 : -1;

        return 0;

    });

}

function applyPagination(records, page = 1, limit = 10) {

    page = Number(page);
    limit = Number(limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    return records.slice(start, end);

}

module.exports = {
    applySearch,
    applySort,
    applyPagination
};