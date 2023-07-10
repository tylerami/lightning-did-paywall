import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import MultilineText from "./MultilineText";

import theme from "../theme.jsx";

const BlogPost = ({ content }) => {

  const styles = theme.styles.global;

  return (
    <Flex
      padding="2em"
      borderRadius="0.2em"
      border="0.5px solid #444"
      width="100%"
      direction={"column"}
    >
      <Heading fontFamily={"IBM Plex Sans"} fontWeight={400} size="xl">
        {content.title}
      </Heading>
      <Box h='1em' />
      <Heading fontFamily={"IBM Plex Sans"} fontWeight={600}  size="sm">{content.subtitle}</Heading>
      <Box h='3em' />
      <MultilineText 
        fontFamily={"IBM Plex Sans"}
        color={styles.body.secondaryFill}
        text={content.body}
      />
     
    </Flex>
  );
};

export default BlogPost;
