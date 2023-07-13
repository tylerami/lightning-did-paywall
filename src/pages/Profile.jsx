import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import person from "../assets/person.png";
import locked from "../assets/locked.png";
import lightningLogo from "../assets/lightningLogo.png"

import theme from "../theme";
import { getDid } from "../util/dwnService";
import { ArrowLeftIcon, CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getAllContentMetadataFromWebNode } from "../util/contentService";
import PostMetadataTileList from "../components/PostMetadataTileList";
import PostContentTile from "../components/PostContentTile";
import { getProfileFromWebNode } from "../util/profileService";

const Profile = ({ openEditProfileModal, profile: initialProfile }) => {
  const styles = theme.styles.global;

  console.log("passed profile: ", initialProfile);

  const [profile, setProfile] = useState(initialProfile);

  const params = useParams();

  console.log(params);

  const userDid = params.profileDid ?? getDid();

  const [blogPostsExpanded, setBlogPostsExpanded] = useState(false);
  const [podcastsExpanded, setPodcastsExpanded] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const profileUpdate = await getProfileFromWebNode(userDid);
      setProfile(profileUpdate);
    };

    getProfile();
  }, [userDid]);

  useEffect(() => {
    setProfile(initialProfile);

    console.log("profile updated: ", initialProfile);
  }, [initialProfile]);

  const [contentList, setContentList] = useState([]);
  const displayName = profile?.username;
  const userDisplayName = displayName || userDid.substring(0, 20) + "...";

  const { hasCopied, onCopy } = useClipboard(getDid());


  const tryLoadContent = useCallback(async () => {
    const contentUpdate = await getAllContentMetadataFromWebNode(userDid);
    setContentList(contentUpdate ?? []);
  }, [userDid]);

  // Load content on mount
  useEffect(() => {
    tryLoadContent();
  }, [tryLoadContent, params]);

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <Flex borderRadius="0.2em" width="100%" direction={"column"}>
        {profile?.displayImage ? (
          <Image  borderRadius="100%" src={URL.createObjectURL(profile?.displayImage)} w={32} />
        ) : (
          <Image src={person} w={32} />
        )}
        <Box h="2em" />
        <Flex alignItems={"center"}>
          <Heading size="2xl">{userDisplayName}</Heading>
          <EditIcon
            ml="2em"
            _hover={{ cursor: "pointer" }}
            onClick={openEditProfileModal}
            alignSelf="flex-end"
            w={8}
            h={8}
          />
        </Flex>
        <Box h="1em" />
        <InputGroup size="md">
          <Input
            value={userDid}
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan }}
            color={styles.brand.cyan}
            readOnly
            p="0 2.5em 0 0"
            border="none"
          />
          <InputRightElement>
            <Tooltip
              label={hasCopied ? "Copied" : "Copy to clipboard"}
              placement="top"
            >
              <IconButton
                colorScheme="ghost"
                icon={<CopyIcon />}
                onClick={onCopy}
                aria-label={hasCopied ? "Copied" : "Copy to clipboard"}
                border={"0px"}
                shadow={"none"}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
        <Box h="1em" />
        <Text
          borderBottom="solid 2px"
          pb={"2em"}
          borderBottomColor={styles.brand.yellow}
        >
          {profile?.bio ?? "Bio goes here"}
        </Text>
        <Box h="2em" />

        <Routes>
          <Route
            path="/"
            element={
              contentList.length > 0 ? (
                <>
                  {!podcastsExpanded && (
                    <PostMetadataTileList
                      contentList={contentList}
                      type="text"
                      expanded={blogPostsExpanded}
                      toggleExpanded={setBlogPostsExpanded}
                    />
                  )}

                  {!blogPostsExpanded && (
                    <PostMetadataTileList
                      contentList={contentList}
                      type="audio"
                      expanded={podcastsExpanded}
                      toggleExpanded={setPodcastsExpanded}
                    />
                  )}
                </>
              ) : (
                <Flex
                  mt="4em"
                  alignItems="center"
                  textAlign="center"
                  direction="column"
                >
                  <Heading size="xl">{"No content to show."}</Heading>
                  <Box h="2em" />
                  <Link to="/createPost">
                    { userDid === getDid() ?
                        <Button variant="primary" maxW="max-content">
                            Create your first post
                        </Button>
                        :
                        <></>
                    }
                  </Link>
                </Flex>
              )
            }
          />
          <Route
            path="/:contentId"
            element={<PostContentTile />}
          />
        </Routes>

        <Flex   width="100%" direction={"column"}>
      <Flex>
        <Image w={10} h={10} src={locked}/>
        <Heading size="xl" >
            Title
        </Heading>
        
      </Flex>
      <Box h="1em" />
        <Heading size="sm" color={styles.body.primaryFill}>
          Content description
        </Heading>
        <Box w="100%" borderBottom="solid 1px #fff" m="1em 0" />
      <Box height="2em"></Box>

      
    </Flex>
    <Flex textAlign={"center"} justifyContent={"center"} flexDirection={"column"}>
    <Heading
          _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
          fontWeight={600}
          color={styles.brand.yellow}
          size="lg"
        >
          {"Pay to unlock this content"}
        </Heading>
        <Heading
          _hover={{ cursor: "pointer", filter: "brightness(140%)" }}
          color={styles.brand.cyan}
          size="md"
          m="1em 0"
        >
          {`Price: ? sats`}
        </Heading>
        <Button
          variant="primary"
          size="lg"
          w="max-content"
          alignSelf={"center"}
        >
         Unlock Now
        </Button>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
