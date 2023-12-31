import { Box, Flex, Heading, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import lightningLogo from "../assets/lightningLogo.png";
import person from "../assets/person.png";
import { Link, useLocation } from "react-router-dom";
import theme from "../theme";

const NavBar = ({profile}) => {
  const tabs = [
    {
      text: "Search",
      path: "/search",
    },
    {
      text: "Create Post",
      path: "/createPost",
    },
  ];
  const styles = theme.styles.global;

  return (
    <Flex
      borderBottom={"0.5px solid"}
      borderColor={styles.brand.yellow}
      width={"100%"}
      height="6em"
      alignItems={"center"}
      justifyContent={"start"}
    >
      <PageLogo />
      <Spacer />
      {tabs.map((tab, index) => (
        <NavBarButton key={index} text={tab.text} path={tab.path} />
      ))}
      <Spacer />
      <Box w={"5em"}></Box>
      <Link to="/profile" mr="2em" > {profile?.displayImage ? (
          <Image  borderRadius="100%" mr="2em" src={URL.createObjectURL(profile?.displayImage)} w={12} h={12} />
      ) : (
          <Image borderRadius="100%" mr="2em" src={person} w={12} />
      )}  </Link>
    </Flex>
  );
};

const PageLogo = () => {
  return (
    <Flex m="2em" flexDirection={"row"} display={"flex"}>
      <Image src={lightningLogo} height="2em" />
      <Box width="1em"></Box>
      <Heading size="lg">Lightning Paywall</Heading>
    </Flex>
  );
};

const NavBarButton = ({ text, path }) => {
  const isActive = useLocation().pathname === path;

  return (
    <Box h="100%">
      <Link to={path}>
        <Flex
          justifyContent={"center"}
          ml={"2em"}
          mr={"2em"}
          alignItems="center"
          h="100%"
          borderBottom={
            isActive ? "0.4em solid yellow" : "0.4em solid transparent"
          }
          _hover={{
            borderBottom: "0.4em solid yellow",
            cursor: "pointer",
          }}
          boxSizing="border-box"
        >
          <Heading size="md"> {text}</Heading>
        </Flex>
      </Link>
    </Box>
  );
};

export default NavBar;
