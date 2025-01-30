import React from "react";
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

function IconBox(props) {
  const { icon, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      {...rest}>
      {icon}
    </Flex>
  );
}

IconBox.propTypes = {
  icon: PropTypes.string
}
export default IconBox;