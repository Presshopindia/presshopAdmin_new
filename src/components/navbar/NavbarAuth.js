import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import IconBox from "components/icons/IconBox";
import { HorizonLogo } from "components/icons/Icons";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";

// Assets
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import routes from "routes.js";

function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();
  // Menu States
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  const {
    isOpen: isOpenMain,
    onOpen: onOpenMain,
    onClose: onCloseMain,
  } = useDisclosure();
  const {
    isOpen: isOpenNft,
    onOpen: onOpenNft,
    onClose: onCloseNft,
  } = useDisclosure();
  // Menus
  function getLinks(routeName) {
    let foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    return foundRoute[0].items;
  }
  function getLinksCollapse(routeName) {
    let foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });

    let foundLinks = foundRoute[0].items.filter(function (link) {
      return link.collapse === true;
    });

    return foundLinks;
  }
  let authObject = getLinksCollapse("Authentication");
  let mainObject = getLinksCollapse("Main Pages");
  let dashboardsObject = getLinks("Dashboards");
  let nftsObject = getLinks("NFTs");
  let logoColor = useColorModeValue("white", "white");
  // Chakra color mode

  const textColor = useColorModeValue("navy.700", "white");
  let menuBg = useColorModeValue("white", "navy.900");
  let mainText = "#fff";
  let navbarBg = "none";
  let navbarShadow = "initial";
  let bgButton = "white";
  let colorButton = "brand.500";
  let navbarPosition = "absolute";

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Stack direction='row' spacing='12px' align='center' justify='center'>
        <HorizonLogo h='26px' w='175px' color={logoColor} />
      </Stack>
      <Text fontsize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW='175px'
        href={`${process.env.PUBLIC_URL}/#/`}
        target='_blank'
        display='flex'
        lineHeight='100%'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        color={mainText}>
        <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />
      </Link>
    );
  }
  const createNftsLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink
          key={link.path}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content", marginLeft: "40px" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='normal'>
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const createDashboardsLinks = (routes) => {
    return routes.map((link) => {
      return (
        <NavLink
          key={link.path}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content", marginLeft: "40px" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='normal'>
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const createMainLinks = (routes) => {
    return routes.map((link) => {
      if (link.collapse === true) {
        return (
          <Stack key={link.path} direction='column' maxW='max-content'>
            <Stack
              direction='row'
              spacing='0px'
              align='center'
              cursor='default'>
              <IconBox bg='brand.500' h='30px' w='30px' me='10px'>
                {link.icon}
              </IconBox>
              <Text fontWeight='bold' fontSize='md' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon
                as={GoChevronRight}
                color={mainText}
                w='14px'
                h='14px'
                fontWeight='2000'
              />
            </Stack>
            <Stack direction='column' bg={menuBg}>
              {createMainLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={link.path}
            to={link.layout + link.path}
            style={{ maxWidth: "max-content", marginLeft: "40px" }}>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });
  };
  const createAuthLinks = (routes) => {
    return routes.map((link) => {
      if (link.collapse === true) {
        return (
          <Stack key={link.path} direction='column' my='auto' maxW='max-content'>
            <Stack
              direction='row'
              spacing='0px'
              align='center'
              cursor='default'
              w='max-content'>
              <IconBox bg='brand.500' h='30px' w='30px' me='10px'>
                {link.icon}
              </IconBox>
              <Text fontWeight='bold' fontSize='md' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon
                as={GoChevronRight}
                color={mainText}
                w='14px'
                h='14px'
                fontWeight='2000'
              />
            </Stack>
            <Stack direction='column' bg={menuBg}>
              {createAuthLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={link.path}
            to={link.layout + link.path}
            style={{ maxWidth: "max-content", marginLeft: "40px" }}>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });
  };
  const linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }} spacing='12px'>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenDashboards}
        onMouseLeave={onCloseDashboards}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Dashboards
        </Text>
        <Box>
          <Icon
            mt='8px'
            as={GoChevronDown}
            color={mainText}
            w='14px'
            h='14px'
            fontWeight='2000'
          />
        </Box>
        <Menu isOpen={isOpenDashboards}>
          <MenuList
            bg={menuBg}
            p='22px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Flex flexWrap='wrap' w='300px' gap='16px'>
              {createDashboardsLinks(dashboardsObject)}
            </Flex>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Authentications
        </Text>
        <Box>
          <Icon
            mt='8px'
            as={GoChevronDown}
            color={mainText}
            w='14px'
            h='14px'
            fontWeight='2000'
          />
        </Box>
        <Menu isOpen={isOpenAuth}>
          <MenuList
            bg={menuBg}
            p='22px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Flex>
              <SimpleGrid columns='3' gap='10px' minW='500px' me='20px'>
                {createAuthLinks(authObject)}
              </SimpleGrid>
            </Flex>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenMain}
        onMouseLeave={onCloseMain}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          Main Pages
        </Text>
        <Box>
          <Icon
            mt='8px'
            as={GoChevronDown}
            color={mainText}
            w='14px'
            h='14px'
            fontWeight='2000'
          />
        </Box>
        <Menu isOpen={isOpenMain}>
          <MenuList
            bg={menuBg}
            p='22px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Flex flexWrap='wrap' align='start' w='500px' gap='16px'>
              {createMainLinks(mainObject)}
            </Flex>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction='row'
        spacing='4px'
        align='center'
        color='#fff'
        fontWeight='bold'
        onMouseEnter={onOpenNft}
        onMouseLeave={onCloseNft}
        cursor='pointer'
        position='relative'>
        <Text fontSize='sm' color={mainText}>
          NFTs
        </Text>
        <Box>
          <Icon
            mt='8px'
            as={GoChevronDown}
            color={mainText}
            w='14px'
            h='14px'
            fontWeight='2000'
          />
        </Box>
        <Menu isOpen={isOpenNft}>
          <MenuList
            bg={menuBg}
            p='22px'
            minW='350px'
            cursor='default'
            borderRadius='15px'
            position='absolute'
            top='30px'
            left='-10px'>
            <Grid templateColumns='repeat(2, 1fr)' gap='16px'>
              {createNftsLinks(nftsObject)}
            </Grid>
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );

  return (
    <SidebarContext.Provider value={useMemo(() => ({ sidebarWidth }), [sidebarWidth])}>
      <Flex
        position={navbarPosition}
        top='16px'
        left='50%'
        transform='translate(-50%, 0px)'
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius='15px'
        px='16px'
        py='22px'
        mx='auto'
        width='1044px'
        maxW='90%'
        alignItems='center'
        zIndex='3'>
        <Flex w='100%' justifyContent={{ sm: "start", lg: "space-between" }}>
          {brand}
          <Box
            ms={{ base: "auto", lg: "0px" }}
            display={{ base: "flex", lg: "none" }}
            justifyContent='center'
            alignItems='center'>
            <SidebarResponsive
              logo={
                <Stack
                  direction='row'
                  spacing='12px'
                  align='center'
                  justify='center'>
                  <Box
                    w='1px'
                    h='20px'
                    bg={colorMode === "dark" ? "white" : "gray.700"}
                  />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </Box>
          {linksAuth}
          <Link href='https://www.horizon-ui.com/pro'>
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize='xs'
              variant='no-effects'
              borderRadius='50px'
              px='45px'
              display={{
                sm: "none",
                lg: "flex",
              }}>
              Buy Now
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  logo: PropTypes.element,          // Assuming logo is a React element like a JSX logo
  logoText: PropTypes.string,       // The text for the logo
  secondary: PropTypes.bool,        // A boolean indicating if it's a secondary navbar
  sidebarWidth: PropTypes.oneOfType([ // sidebarWidth can either be a number or a string
    PropTypes.string,
    PropTypes.number
  ]),
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]), // Color prop for navbar
  brandText: PropTypes.string,      // Text to be displayed as brand text (optional)
};

export default AuthNavbar