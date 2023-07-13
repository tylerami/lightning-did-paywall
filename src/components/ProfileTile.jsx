import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

import theme from "../theme.jsx";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import person from "../assets/person.png"

const ProfileTile = ({ profile, metadataList }) => {

    const styles = theme.styles.global;

    const userDid = profile.authorDid;
    const displayName = profile?.username;
    const userDisplayName = displayName || userDid?.substring(0, 20) + "...";
    const postCount = metadataList?.length;

    if(!profile){return null}

    return (
        <Flex p="1em" mb="1em"  >
            <Flex w="100%">
            {profile?.displayImage ? (
                    <Image src={URL.createObjectURL(profile?.displayImage)} h={24} w={24} />
                ) : (
                    <Image src={person} h={24} w={24} />
                )}
            <Box w="2em"/>
            <Flex w="100%" flexDirection="column">
                <Heading size="lg" color={styles.body.primaryFill}>{userDisplayName}</Heading>
                <Heading size="sm" mt="0.5em" mb="0.5em" color={styles.brand.cyan}>{postCount==1? postCount+" post":postCount+" posts"}</Heading>
                <Text mb="2em" color={styles.body.primaryFill}>{profile.bio}</Text>
            </Flex>
            </Flex>
            <Link to={"/profile/:did"}><ArrowRightIcon color={styles.brand.yellow} alignSelf="center" /></Link>
        </Flex>
    );
};

export default ProfileTile;
