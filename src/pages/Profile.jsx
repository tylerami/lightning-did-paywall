import React, { useEffect, useState } from "react";
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

import theme from "../theme";
import { getDid } from "../util/dwnService";
import { ArrowRightIcon, CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { getProfile } from "../util/profileService";
import BlogPost from "../components/BlogPost";

const Profile = ({ profile, openEditProfileModal }) => {
    const styles = theme.styles.global;
    const userDid = getDid();

    const [ contentList, setContentList ] = useState([]);
    const displayName = profile?.username;
    const userDisplayName = displayName || userDid.substring(0, 20) + "...";

  const { hasCopied, onCopy } = useClipboard(getDid());

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <Flex
        padding="3em"
        borderRadius="0.2em"
        width="100%"
        direction={"column"}
      >
        {profile?.displayImage ? (
          <Image src={URL.createObjectURL(profile?.displayImage)} w={32} />
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
        <Heading w="50%" pb="1em" borderBottom="solid 1px" borderColor={styles.brand.yellow}>Blog posts</Heading>
                <Box h="2em"/>

                <Flex p="1em" mb="2em" border="solid 1px" borderColor={styles.brand.yellow} boxShadow="1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19">
                    <Flex flexDirection="column">
                        <Heading size="lg" color={styles.body.primaryFill}>Title</Heading>
                        <Heading size="sm" p="8px 0" color={styles.brand.yellow}>500 sats</Heading>
                        <Text color={styles.body.primaryFill}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ... </Text>
                    </Flex>
                    <ArrowRightIcon color={styles.brand.yellow} alignSelf="center"/>
                </Flex>
                
                <Flex p="1em" mb="2em" border="solid 1px" borderColor={styles.brand.yellow} boxShadow="1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19">
                    <Flex flexDirection="column">
                        <Heading size="lg" color={styles.body.primaryFill}>Title</Heading>
                        <Heading size="sm" p="8px 0" color={styles.brand.yellow}>500 sats</Heading>
                        <Text color={styles.body.primaryFill}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ... </Text>
                    </Flex>
                    <ArrowRightIcon color={styles.brand.yellow} alignSelf="center"/>
                </Flex>
                <Flex p="1em" mb="2em" border="solid 1px" borderColor={styles.brand.yellow} boxShadow="1px 1px 0px 0px #FFEC19, 2px 2px 0px 0px #FFEC19, 3px 3px 0px 0px #FFEC19, 4px 4px 0px 0px #FFEC19, 5px 5px 0px 0px #FFEC19">
                    <Flex flexDirection="column">
                        <Heading size="lg" color={styles.body.primaryFill}>Title</Heading>
                        <Heading size="sm" p="8px 0" color={styles.brand.yellow}>500 sats</Heading>
                        <Text color={styles.body.primaryFill}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ... </Text>
                    </Flex>
                    <ArrowRightIcon color={styles.brand.yellow} alignSelf="center"/>
                </Flex>
                <Button  variant="primary" maxW="max-content">View more</Button>
                
                <Heading>Podcasts</Heading>
                { contentList.length===0 ?
                    <Flex mt="4em" alignItems="center" textAlign="center" direction="column">
                        <Heading size="xl" >{"No content to show."}</Heading>
                        <Box h="2em"/>
                        <Link to="/createPost">
                            <Button  variant="primary" maxW="max-content">Create your first post</Button>
                        </Link>
                    </Flex>
                :
                    contentList.map(post=>
                        <></> )
                }

                <BlogPost content={{body:"hi",title:"hi",subtitle:"hi"}}/>
            </Flex>
        </Flex>
        
    );
};

export default Profile;
