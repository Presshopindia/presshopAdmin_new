/* eslint-disable */
import React, { useContext, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
// chakra imports
import { useAuth } from "../../../auth-context/auth.context";
import { Logout } from "../../../routes";
import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import dataContext from "views/admin/ContextFolder/Createcontext";

// importing sidebar context to send pending msg data to sidebar
import { useMsgContext } from "contexts/PendindMsgContext";
import PropTypes from "prop-types";

export function SidebarLinks(props) {

  let { pendingChats, pendingNotifications } = useMsgContext()

  const { profile } = useContext(dataContext);

  const history = useHistory();
  const { setUser } = useAuth();
  const handleLogout = async () => {
    await setUser(null);
    localStorage.removeItem("user");
    return history.push("/auth/signin");
  };
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("#000", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };


  const UseCreateLinks = (routes) => {
    const routesar = routes?.filter((curr) => {
      if (!curr.hide) {
        if (
          (curr.name === "New employee registration" &&
            (profile?.subadmin_rights?.onboardEmployess === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage content" &&
            (profile?.subadmin_rights?.controlContent === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage publications" &&
            (profile?.subadmin_rights?.controlPublication === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Manage hoppers" &&
            (profile?.subadmin_rights?.controlHopper === true ||
              profile?.subadmin_rights?.viewRightOnly === true)) ||
          (curr.name === "Chat" &&
            (profile?.subadmin_rights?.allow_publication_chat === true ||
              profile?.subadmin_rights?.allow_hopper_chat === true))
        ) {
          return curr.name;
        } else if (
          (curr.name === "New employee registration" && curr.name === "") ||
          (curr.name === "Manage content" && curr.name === "") ||
          (curr.name === "Manage publications" && curr.name === "") ||
          (curr.name === "Manage hoppers" && curr.name === "")
        ) {
          return curr.name && curr?.hide;
        }
      }
      if (
        curr?.name === "Avatars" ||
        curr?.name === "Edit app" ||
        curr?.name === "Dashboard" ||
        curr?.name === "Notifications" ||
        curr?.name === "Payment process" ||
        curr?.name === "Rating & reviews" ||
        curr?.name === "Invoicing & payments" ||
        curr?.name === "Manage tabs / categories" ||
        curr?.name === "Admin controls" && profile.role === "admin"
      ) {
        return true;
      }
    });

    useEffect(() => {
      return routesar;
    }, [window.location.pathname]);

    return routesar.map((route) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt="18px"
              pb="12px"
              key={route.name}
            >
              {route.name}
            </Text>
            {UseCreateLinks(route.items)}
          </>
        );
      } else if (route.path == "/app-cms") {
        return (
          <div key={route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="start" justifyContent="start">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                      mt="2px"
                    >
                      {route.icon}
                    </Box>
                    <Accordion
                      allowToggle
                      w="100%"
                      className="edit_sidebr_link"
                    >
                      <AccordionItem border="unset">
                        <h2>
                          <AccordionButton p="0" border="unset">
                            <Box
                              flex="1"
                              textAlign="left"
                              p="0px"
                              color={
                                activeRoute(route.path.toLowerCase())
                                  ? activeColor
                                  : textColor
                              }
                              fontFamily={
                                activeRoute(route.path.toLowerCase())
                                  ? "AirbnbBold"
                                  : "AirbnbMedium"
                              }
                            >
                              Edit
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="sidebar_ul sidebar_edit_accr">
                            <li>
                              <button
                                style={{background:"none", border: "none"}}
                                onClick={() => {
                                  history.push("/admin/app-cms");
                                }}
                              >
                                App
                              </button>
                            </li>
                            <li>
                              <button
                                style={{background:"none", border: "none"}}
                                onClick={() => {
                                  history.push("/admin/edit-marketplace");
                                }}
                              >
                                Marketplace
                              </button>
                            </li>
                          </ul>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </div>
          // </NavLink>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        return (
          <NavLink key={route.path} to={route.layout + route.path}>
            {route.icon ? (
              <Box position="relative">
                {(route.name === "Notifications" || route.name === "Chat")
                  &&
                  <Box
                    position="absolute"
                    top="12px"
                    right="10px"
                    bgColor="#10AF0C"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="#FFFFFF"
                    p="0px 6px"
                    borderRadius="50%"
                    width="20px"
                    height="20px"
                    zIndex="1"
                    fontSize="10px"
                    fontWeight="bold"
                  >
                    {route.name === "Notifications" ? pendingNotifications : pendingChats}
                  </Box>
                }

                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={
                      activeRoute(route.path.toLowerCase())
                        ? brandColor
                        : "transparent"
                    }
                    borderRadius="5px"
                  />
                </HStack>

              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };
  const createLogout = (routes) => {
    return routes.map((route) => {
      return (
        <NavLink
          to={route.layout + route.path}
          key={route.name}
          onClick={handleLogout}
        >
          {route.icon ? (
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              ps="17px"
              mb="0px"
            >
              <HStack
                mb="6px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : inactiveColor
                    }
                    me="12px"
                    mt="6px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : "secondaryGray.600"
                    }
                    fontWeight="500"
                  >
                    {route.name}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          ) : (
            <ListItem ms={null}>
              <Flex ps="34px" alignItems="center" mb="8px">
                <Text
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight="500"
                  fontSize="sm"
                >
                  {route.name}
                </Text>
              </Flex>
            </ListItem>
          )}
        </NavLink>
      );
    });
  };
  //  BRAND
  return (
    <>
      {UseCreateLinks(routes)}
      {createLogout(Logout)}
    </>
  );
}

SidebarLinks.propTypes = {
  routes: PropTypes.isRequired
}

export default SidebarLinks;
