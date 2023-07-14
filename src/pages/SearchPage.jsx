import { Box, Flex, Heading, Image, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DIDResolver from "../components/DIDResolver";
import ProfileTile from "../components/ProfileTile";
import theme from "../theme";
import PostMetadataTile from "../components/PostMetadataTile";
import { getProfileFromWebNode } from "../util/profileService";
import githubIcon from "../assets/github-mark.png";

const featuredDids = [
  "did:ion:EiB0P3BgbT9cYWTN8l81AHVi9i22-25ViNEBMgl0c53YkQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJSckd6RElHQ3dtNU5iTnkyVG16YjdDRldoS2FwdUh4Qm1PVHhQWU9uUURjIiwieSI6IlA0M2ZtZ29fem53THJIMF9OY2ozbk1PTEhGQ0hqXzBBbmVtckJvbTdybTQifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJpb2VxSVBpbDJKMkFndEFDYWFWMzhCSldhZTBqVlFYYTlIVk5wVFVFMWdzIiwieSI6IjM4NmdQUkVYSk8xMERWeGJTWWJtT3BpeWFEVzAxeWVLNFkzYmdUcko0UlkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd242IiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24zIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQURsU2hFQ3VIMDJ5T2hfV1Vkd25wc0QzbTBoRmtrWUU1YXlDN2NwV1FUMncifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUFROHpaR0hseFU1LVRnZFJvNVFETmpUQkZWdmFqaWVEdS1zTUFfbjNtQ0JBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlEVW1oNl9FNVY2TUNWeWp4cnhpZThvZ0UzeUcwQTQtVlFKd012c3RrYUtpZyJ9fQ",
  "did:ion:EiAQci-oDdQdNy098CsMnZ_sGjxk_8EYWG8Tzar3P1VNdQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJtNXM0NDJzUWNGWUZwRTBtTl83T01PZlRDWG9iYWVhNzJ3dUl2eDkwbWhNIiwieSI6IkloOUpGclBDWllWNXFnY2owQjZ1NEkwODEwdXVnWUNPUUN4WkkzUHh5amsifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJoRzFsVUZIYUw0VEdmUWs5bk1jc1Rab3k2M0ZnSkw2MHJaUlFwVks5NEJRIiwieSI6IjRrUU9PU04zMEpoYjV4QWU5Rl9fOE9ZSkVWOGFBanBBQU1PR2NsRVZXOTQifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd240IiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpQ2dyckxPQzRFWWlUR3VrTFYzY0ViUHF2WEVjZXZyU0diSFM4YjFnNEVNSkEifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUNjYkpLdlNsekRXa2NBazlDTERWUlkyamJwVDQ5WHNQaDNGblJsUTREOGVBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlDWkhRa1hjSlZGbTVSZVlNbk13RjI3Nk5mam1EcmVpTU5hTW55a2NHdkE5USJ9fQ",
];

const SearchPage = () => {
  const styles = theme.styles.global;

  const [metadataList, setMetadataList] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadFeaturedProfiles() {
      var profiles = [];

      for (let i = 0; i < featuredDids.length; i++) {
        const profile = await getProfileFromWebNode(featuredDids[i]);
        profiles.push(profile);
      }

      setFeaturedProfile(profiles);
    }

    loadFeaturedProfiles();
  }, []);

  const [featuredProfile, setFeaturedProfile] = useState([]);

  return (
    <Flex
      alignSelf={"center"}
      maxWidth="80em"
      minWidth={"50em"}
      width="70vw"
      direction="column"
      padding={"2em"}
    >
      <Flex alignItems={"center"}>
        <Link href="https://github.com/tylerami/lightning-did-paywall" isExternal>
          <Image
            style={{ filter: "brightness(1000%)" }}
            color="white"
            height="2em"
            mr="1em"
            src={githubIcon}
          />
        </Link>
        <Heading size="sm" color="white">
          An open source proof-of-concept for a content monetization protocol
          using Web5 and Lightning. <br></br> Created as an intern hackweek project at Block.
        </Heading>
      </Flex>

      <DIDResolver setProfile={setProfile} setMetadataList={setMetadataList} />
      <Box mb="2em" />

      {profile ? (
        <>
          {" "}
          <ProfileTile metadataList={metadataList} profile={profile} />
          <Box
            mb="2em"
            borderBottom="solid 1px"
            borderColor={styles.brand.yellow}
          />
          {metadataList.map((content, index) => (
            <PostMetadataTile key={index} metadata={content} />
          ))}
        </>
      ) : (
        <>
          <Heading>Featured Creators</Heading>
          {featuredProfile.map((pro, index) => (
            <ProfileTile key={index} profile={pro} />
          ))}
        </>
      )}
    </Flex>
  );
};

export default SearchPage;
