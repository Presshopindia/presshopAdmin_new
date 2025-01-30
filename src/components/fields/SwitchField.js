// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
import PropTypes from "prop-types";

function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth = "75%",
    reversed,
    fontSize = "md",
    ...rest
  } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box w='100%' fontWeight='500' {...rest}>
      {reversed ? (
        <Flex align='center' borderRadius='16px'>
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant='main'
              colorScheme='brandScheme'
              size='md'
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant='main'
              colorScheme='brandScheme'
              size='md'
            />
          )}
          <FormLabel
            ms='15px'
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction='column'
            mb='0px'
            maxW={textWidth}>
            <Text
              color={textColorPrimary}
              fontSize='md'
              fontWeight='500'>
              {label}
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize={fontSize}>
              {desc}
            </Text>
          </FormLabel>
        </Flex>
      ) : (
        <Flex justify='space-between' align='center' borderRadius='16px'>
          <FormLabel
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction='column'
            maxW={textWidth}>
            <Text
              color={textColorPrimary}
              fontSize='md'
              fontWeight='500'>
              {label}
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize={fontSize}>
              {desc}
            </Text>
          </FormLabel>
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant='main'
              colorScheme='brandScheme'
              size='md'
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant='main'
              colorScheme='brandScheme'
              size='md'
            />
          )}
        </Flex>
      )}
    </Box>
  );
}

Default.propTypes = {
  id: PropTypes.string.isRequired, // The id of the switch input
  label: PropTypes.string.isRequired, // The label text for the switch
  isChecked: PropTypes.bool, // Determines if the switch is checked
  onChange: PropTypes.func, // Function to handle the change event of the switch
  desc: PropTypes.string, // Optional description text
  textWidth: PropTypes.string, // The width of the label text (default "75%")
  reversed: PropTypes.bool, // Determines the layout of the switch and label (default false)
  fontSize: PropTypes.string, // Font size of the description (default "md")
};

export default Default;