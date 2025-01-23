import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import logo from "assets/img/logoblack.svg";
import { HSeparator } from "components/separator/Separator";
import sidebarlogo from "../../../assets/img/icons/sidebar-logo.png";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <img
        className="sidebarLogo"
        src={sidebarlogo}
        style={{
          transform: "scale(2)",
          transition: "transform 0.3s ease",
          marginBottom:"-10px",
          marginTop:"-20px",
          marginLeft:"-5px"
        }}
      />
      {/* <HSeparator mb='20px' /> */}
    </Flex>
  );
}

export default SidebarBrand;
