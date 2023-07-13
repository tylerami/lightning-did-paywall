import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DIDResolver from "../components/DIDResolver";
import PostContentTile from "../components/PostContentTile";
import ContentPaywall from "../components/ContentPaywall";
import PostTile from "../components/PostTile";
import ProfileTile from "../components/ProfileTile";
import { getProfileFromWebNode } from "../util/profileService";
import theme from "../theme";

const ViewPostsPage = () => {

  const styles = theme.styles.global;

  const [metadataList, setMetadataList] = useState([]);
  const [profile, setProfile] = useState({});

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <DIDResolver setProfile={setProfile} setMetadataList={setMetadataList} />
      <Box  mb="2em" />

      <ProfileTile metadataList={metadataList} profile={profile}/>

      <Box mb="2em" borderBottom="solid 1px" borderColor={styles.brand.yellow}/>

      {metadataList.map((content, index) => (
        <PostContentTile key={index} metadata={content} />
        // <PostTile key={index} type={content.type} content={{ id:content.id, title: content.title, subtitle: content.description, price: content.paywall ? content.paywall.satsAmount + " sats" : null }} />
      ))}


    </Flex>
  );
};

export default ViewPostsPage;
