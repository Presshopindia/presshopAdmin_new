

// Chakra imports
import { Box,
  //  SimpleGrid
   } from "@chakra-ui/react";
import DevelopmentTable from "../Publications/components/DevelopmentTable";
import tableDataDevelopment from "views/admin/Hoppers/variables/tableDataDevelopment.json";
import React from "react";
import { columnsDataDevelopment } from "constants";

export default function Publications() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      {/* </SimpleGrid> */}
    </Box>
  );
}
