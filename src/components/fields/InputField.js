// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import PropTypes from "prop-types";

function Default(props) {
  const { id, label, extra, placeholder, type, mb ="30px", ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex direction='column' mb={mb}>
      <FormLabel
        display='flex'
        ms='10px'
        htmlFor={id}
        fontSize='sm'
        color={textColorPrimary}
        fontWeight='bold'
        _hover={{ cursor: "pointer" }}>
        {label}
        <Text fontSize='sm' fontWeight='400' ms='2px'>
          {extra}
        </Text>
      </FormLabel>
      <Input
        {...rest}
        type={type}
        id={id}
        fontWeight='500'
        variant='main'
        placeholder={placeholder}
        _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
        h='44px'
        maxh='44px'
      />
    </Flex>
  );
}

Default.propTypes = {
  id: PropTypes.string.isRequired, // The id of the input field
  label: PropTypes.string.isRequired, // The label text for the input field
  extra: PropTypes.string, // Extra text to display beside the label (optional)
  placeholder: PropTypes.string.isRequired, // Placeholder text for the input field
  type: PropTypes.string.isRequired, // The type of the input (text, password, etc.)
  mb: PropTypes.string, // Margin bottom (optional)
};

export default Default;