export function exportToCSV(data, fileName = "databases") {

  if (!data.length) return;

  const headers = Object.keys(data[0]);

  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers.map(key => `"${row[key]}"`).join(",")
    )
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `${fileName}.csv`;

  link.click();
}