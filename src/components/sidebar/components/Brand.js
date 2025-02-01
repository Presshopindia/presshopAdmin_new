import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";
// Custom components
// import logo from "assets/img/logoblack.svg";
import sidebarlogo from "../../../assets/img/icons/sidebar-logo.png";
export function SidebarBrand() {
  //   Chakra color mode

  return (
    <Flex align="center" direction="column">
      <img
        className="sidebarLogo"
        src={sidebarlogo}
        alt={sidebarlogo}
        style={{
          transform: "scale(2)",
          transition: "transform 0.3s ease",
          marginBottom:"-10px",
          marginTop:"-20px",
          marginLeft:"-5px"
        }}
      />
    </Flex>
  );
}

export default SidebarBrand;
