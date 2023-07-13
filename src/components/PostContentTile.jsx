/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import MultilineText from "./MultilineText";

import theme from "../theme.jsx";
import {
  deleteContentFromWebNode,
  getContentFromWebNodeIfPaid,
  getContentMetadataFromWebNode,
} from "../util/contentService";
import ContentPaywall from "./ContentPaywall";
import { useNavigate, useParams } from "react-router-dom";
import { getDid } from "../util/dwnService";

const PostContentTile = ({ metadata: initialMetadata }) => {
  const styles = theme.styles.global;

  const [content, setContent] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [metadata, setMetadata] = useState(initialMetadata);
  const [paywall, setPaywall] = useState(null);

  const navigate = useNavigate();

  const { contentId, authorDid} = useParams();

  async function getMetadata() {
    if (metadata) return metadata;
    const metadataUpdate = await getContentMetadataFromWebNode({ contentId, authorDid});
    setMetadata(metadataUpdate);
    return metadataUpdate;
  }


  const tryLoadContent = useCallback(async () => {
    const metadata = await getMetadata();
    const contentUpdate = await getContentFromWebNodeIfPaid({
      contentId: metadata.parentId,
      authorDid: metadata.authorDid,
    });
    setContent(contentUpdate);
    if (!contentUpdate) {
      setPaywall(metadata.paywall);
    }
  }, [metadata]);

  // Load content on mount if paid
  useEffect(() => {
    tryLoadContent();
  }, []);

  // Load content on mount if paid
  useEffect(() => {
    tryLoadContent();
  }, []);

  if (!metadata) return null;

  return (
    <Flex
      mt="2em"
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
          <Box h="3em" />{" "}
          {paywall && (
            <ContentPaywall
              metadata={metadata}
              refreshContent={tryLoadContent}
            />
          )}
        </>
      )}
      {  (
      
        <IconButton
          onClick={async () => {
            await deleteContentFromWebNode(metadata.parentId);
            navigate("/profile");
          }}
          variant="outline"
          _hover={{ bg: "gray.900" }}
          colorScheme="red"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </IconButton>
     
      )}
    </Flex>
  );
};

export default PostContentTile;
