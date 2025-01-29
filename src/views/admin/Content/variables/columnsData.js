const createColumnData = (additionalColumns) => [
  { Header: "NAME", accessor: "name" },
  { Header: "PROGRESS", accessor: "progress" },
  { Header: "DATE", accessor: "date" },
  ...additionalColumns
];

export const columnsDataDevelopment = createColumnData([{ Header: "TECH", accessor: "tech" }]);

export const columnsDataCheck = createColumnData([{ Header: "QUANTITY", accessor: "quantity" }]);

export const columnsDataColumns = createColumnData([{ Header: "QUANTITY", accessor: "quantity" }]);

export const columnsDataComplex = createColumnData([{ Header: "STATUS", accessor: "status" }]);
