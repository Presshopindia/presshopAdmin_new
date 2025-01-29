// Helper function to create the base column structure
const createColumnData = (additionalColumns = []) => [
    { Header: "NAME", accessor: "name" },
    { Header: "PROGRESS", accessor: "progress" },
    { Header: "DATE", accessor: "date" },
    ...additionalColumns,
  ];
  
  // Define columns for each case with additional custom columns
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
  