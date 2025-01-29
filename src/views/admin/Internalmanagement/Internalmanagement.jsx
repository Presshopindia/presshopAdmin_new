

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "./components/DevelopmentTable";
import tableDataDevelopment from "views/admin/Internalmanagement/variables/tableDataDevelopment.json";
import React from "react";
import { columnsDataDevelopment } from "constants";

export default function Internalmanagement() {
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
      </SimpleGrid>
    </Box>
  );
}
