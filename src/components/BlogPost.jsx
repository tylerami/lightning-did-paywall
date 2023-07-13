/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import MultilineText from "./MultilineText";

import theme from "../theme.jsx";
import { getContentFromWebNodeIfPaid } from "../util/contentService";
import ContentPaywall from "./ContentPaywall";

const BlogPost = ({ metadata }) => {
  const styles = theme.styles.global;

  const [content, setContent] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const tryLoadContent = useCallback(async () => {
    
    if (!metadata) return;

    const contentUpdate = await getContentFromWebNodeIfPaid({
      contentId: metadata.parentId,
      authorDid: metadata.authorDid,
    });
    //setContent(contentUpdate);
  }, [metadata]);

  // Load content on mount if paid
  useEffect(() => {
    tryLoadContent();
  }, []);


  if (!metadata) return null;
  console.log(metadata);

  return (
    <Flex
      padding="2em"
      borderRadius="0.2em"
      border="0.5px solid #444"
      width="100%"
      direction={"column"}
    >
      {content ? (
        <>
          <Heading fontFamily={"IBM Plex Sans"} fontWeight={400} size="xl">
            {content.title}
          </Heading>
          <Box h="1em" />
          <Heading fontFamily={"IBM Plex Sans"} fontWeight={600} size="sm">
            {content.description}
          </Heading>
          <Box h="3em" />
          <MultilineText
            fontFamily={"IBM Plex Sans"}
            color={styles.body.secondaryFill}
            text={content.body}
          />{" "}
        </>
      ) : (
        <>
          <Heading fontFamily={"IBM Plex Sans"} fontWeight={400} size="xl">
            {metadata.title}
          </Heading>
          <Box h="1em" />
          <Heading fontFamily={"IBM Plex Sans"} fontWeight={600} size="sm">
            {metadata.description}
          </Heading>
          <Box h="3em" /> <ContentPaywall metadata={metadata}  refreshContent={tryLoadContent}/>{" "}
        </>
      )}
    </Flex>
  );
};

export default BlogPost;
