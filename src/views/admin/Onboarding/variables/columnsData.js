// Helper function to create the base column structure
const createColumnData = (extraColumns = []) => [
  { Header: "NAME", accessor: "name" },
  { Header: "PROGRESS", accessor: "progress" },
  { Header: "DATE", accessor: "date" },
  ...extraColumns,
];

// Define each column data set
export const columnsDataDevelopment = createColumnData([
  { Header: "TECH", accessor: "tech" },
]);

export const columnsDataCheck = createColumnData([
  { Header: "QUANTITY", accessor: "quantity" },
]);

export const columnsDataColumns = createColumnData([
  { Header: "QUANTITY", accessor: "quantity" },
]);

export const columnsDataComplex = createColumnData([
  { Header: "STATUS", accessor: "status" },
]);
