import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import DIDResolver from "../components/DIDResolver";
import ProfileTile from "../components/ProfileTile";
import theme from "../theme";
import PostMetadataTile from "../components/PostMetadataTile";

const SearchPage = () => {

  const styles = theme.styles.global;

  const [metadataList, setMetadataList] = useState([]);
  const [profile, setProfile] = useState(null);

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
        <PostMetadataTile key={index} metadata={content} />
      ))}


    </Flex>
  );
};

export default SearchPage;
