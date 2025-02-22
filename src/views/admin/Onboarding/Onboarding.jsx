

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "./components/DevelopmentTable";
import CheckTable from "./components/CheckTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import tableDataDevelopment from "views/admin/Onboarding/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/Onboarding/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/Onboarding/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/Onboarding/variables/tableDataComplex.json";
import React from "react";
import { columnsDataDevelopment, columnsDataCheck, columnsDataColumns, columnsDataComplex } from "constants";

export default function Onboarding() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}
