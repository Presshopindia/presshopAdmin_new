import { Flex } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const HSeparator = (props) => {
  const { variant, children, ...rest } = props;
  return <Flex h='1px' w='100%' bg='rgba(135, 140, 189, 0.3)' {...rest}></Flex>;
};

HSeparator.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};

const VSeparator = (props) => {
  const { variant, children, ...rest } = props;
  return <Flex w='1px' bg='rgba(135, 140, 189, 0.3)' {...rest}></Flex>;
};

VSeparator.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
};

export { HSeparator, VSeparator };
