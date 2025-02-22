

// Chakra imports
import { Box } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/Hoppers/components/DevelopmentTable";
import tableDataDevelopment from "views/admin/Hoppers/variables/tableDataDevelopment.json";
import React from "react";
import { columnsDataDevelopment } from "constants";

export default function Hopers() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
    </Box>
  );
}
