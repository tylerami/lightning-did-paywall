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

import theme from "../theme";
import { getDid } from "../util/dwnService";
import { ArrowLeftIcon, CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Route, Routes } from "react-router-dom";
import PostTile from "../components/PostTile";
import { getAllContentMetadataFromWebNode } from "../util/contentService";
import PostTileList from "../components/PostTileList";
import BlogPost from "../components/BlogPost";

const Profile = ({ profile, openEditProfileModal }) => {
    const styles = theme.styles.global;
    const userDid = getDid();

    const [contentList, setContentList] = useState([]);
    const displayName = profile?.username;
    const userDisplayName = displayName || userDid.substring(0, 20) + "...";

    const { hasCopied, onCopy } = useClipboard(getDid());
    const tryLoadContent = useCallback(async () => {
        const contentUpdate = await getAllContentMetadataFromWebNode(userDid);
        setContentList(contentUpdate);
        console.log(contentUpdate);
        console.log(contentUpdate[0]);
      }, []);
    
    // Load content on mount
    useEffect(() => {
        tryLoadContent();
    }, []);
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
                

                <Routes>
                    <Route path="/" element={<PostTileList contentList={contentList} max={3}/>} />
                    <Route path="/blog-posts" element={<PostTileList contentList={contentList} max={null}/>} />
                    <Route path="/:contentId" element={
                        <Flex flexDirection={"column"}>
                            <Link to="/profile"><ArrowLeftIcon/></Link>
                            <BlogPost/>
                        </Flex>
                        
                    } />
                </Routes>
                
            </Flex>
        </Flex>

    );
};

export default Profile;
