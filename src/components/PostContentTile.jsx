/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import MultilineText from "./MultilineText";

import theme from "../theme.jsx";
import {
  deleteContentFromWebNode,
  getContentFromWebNodeIfPaid,
  getContentMetadataFromWebNode,
} from "../util/contentService";
import ContentPaywall from "./ContentPaywall";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDid } from "../util/dwnService";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import AudioPlayer from "./AudioPlayer";
import locked from "../assets/locked.png";

const PostContentTile = ({ metadata: initialMetadata }) => {
  const styles = theme.styles.global;

  const [content, setContent] = useState(null);
  const [metadata, setMetadata] = useState(initialMetadata);
  const [paywall, setPaywall] = useState(null);

  const navigate = useNavigate();

  const { contentId, profileDid } = useParams();

  async function getMetadata() {
    if (metadata) return metadata;

    const metadataUpdate = await getContentMetadataFromWebNode({
      contentId,
      authorDid: profileDid,
    });
    setMetadata(metadataUpdate);
    return metadataUpdate;
  }

  const tryLoadContent = useCallback(async () => {
    const metadata = await getMetadata();
    if (!metadata) return;

    const contentUpdate = await getContentFromWebNodeIfPaid({
      contentId: metadata.parentId,
      authorDid: metadata.did,
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

  if (!metadata) return null;


  return (
    <Flex mt="2em" width="100%" direction="column">
      <Flex w="100%" mb="2em">
        <Link w="100%" to="/profile">
          <ArrowLeftIcon />
        </Link>
      </Flex>

      {content ? (
        <><Flex>
          <Heading size="xl">{content.title}</Heading>
          <Spacer />
              {profileDid === getDid() && (
                <IconButton
                  onClick={async () => {
                    await deleteContentFromWebNode(metadata.parentId);
                    navigate("/profile");
                  }}
                  variant="no-bg"
                  p="0"
                  m="1em 0"
                  h="min-content"
                  w="18px"
                  minW="18px"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </IconButton>
              ) }
              </Flex>
          <Box h="1em" />
          <Heading size="sm" color={styles.body.primaryFill}>
            {content.description}
          </Heading>
          <Box w="80%" borderBottom="solid 1px #fff" m="1em 0" />
          <MultilineText
            color={styles.body.secondaryFill}
            text={content.body}
          />{" "}
          {content.type === "audio" ? <AudioPlayer audio={content.audio}/> : <></>}
        </>
      ) : (
        <>
          <Flex width="100%" direction={"column"}>
            <Flex alignItems={"center"}>
              <Image m={2} w={10} h={10} src={locked} />
              <Heading size="xl">{metadata.title}</Heading>
             
            </Flex>
            <Box h="1em" />
            <Heading size="sm" color={styles.body.primaryFill}>
              <Box h="0.2em" />
              {metadata.description}
            </Heading>
            <Box w="100%" borderBottom="solid 1px #fff" m="1em 0" />
            <Box height="2em"></Box>
            {paywall && (
              <ContentPaywall
                metadata={metadata}
                refreshContent={tryLoadContent}
              />
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PostContentTile;
