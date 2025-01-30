import React, { useState, useEffect } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [searchInput, setSearchInput] = useState("")
  const history = useHistory();

  useEffect(() => {

    const debounce = setTimeout(() => {
      history.push(`/admin/searched-content-list/${searchInput}/Searched content`)
      // getHastags(searchInput)
    }, [500])

    return () => {
      clearTimeout(debounce)
    }
  }, [searchInput])

  return (

    <InputGroup position={"relative"} w={{ base: "100%", md: "200px" }} {...rest}>
      <InputLeftElement>
        <IconButton
          bg='inherit'
          borderRadius='inherit'
          _hover='none'
          _active={{
            bg: "inherit",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          icon={
            <SearchIcon color={searchIconColor} w='15px' h='15px' />
          } />
      </InputLeftElement>
      <Input
        variant='search'
        fontSize='sm'
        bg={background || inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius || "30px"}
        placeholder={placeholder || "Search content"}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </InputGroup>
  );
}

SearchBar.propTypes = {
  variant: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  borderRadius: PropTypes.string,
};