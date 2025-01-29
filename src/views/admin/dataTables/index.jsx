

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import React from "react";
import { columnsDataDevelopment } from "constants";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </SimpleGrid>
    </Box>
  );
}
