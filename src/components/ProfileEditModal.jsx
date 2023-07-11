import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import person from "../assets/person.png";
import theme from "../theme";
import { getDid } from "../util/dwnService";
import { setProfileInWebNode } from "../util/profileService";

const ProfileEditModal = ({ onClose, profile, setProfile }) => {
  const styles = theme.styles.global;
  const [displayName, setDisplayName] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [lightningAddress, setLightningAddress] = useState(
    profile?.lightningAddress || ""
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const hiddenFileInput = React.useRef(null);
  const handleEditPFP = (e) => {
    hiddenFileInput.current.click();
  };

  const handleCreateProfile = () => {
    const profileUpdate = {
      username: displayName,
      bio,
      lightningAddress,
      displayImage: selectedImage,
    };
<<<<<<< HEAD
    setProfileInWebNode(profileUpdate);
    setProfile(profileUpdate);
    onClose();
  };
||||||| parent of 97b2911 (Add content preview to profile)
    
    return(
        <ModalContent 
          width="125em" 
          background={"black"}
          border="solid 1.5px #fff"
          borderRadius="0"
          boxShadow= "1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF"
        >
          <ModalHeader>Get started</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0 1.5em" display={"flex"} flexDirection={"column"} justifyContent={"center"}>
          <Flex w="100%" mt="1em" mb="2em">
            <Image _hover={{filter:"brightness(150%)",cursor:"pointer"}} onClick={handleEditPFP} borderRadius="100%" h={20} w={20} src={person}/> 
            <EditIcon _hover={{filter:"brightness(150%)",cursor:"pointer"}} onClick={handleEditPFP} alignSelf={"flex-end"} w={6} h={6}/>
            <Input 
                display="none"
                ref={hiddenFileInput}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    console.log(e.target.files[0]);
                    setSelectedImage(e.target.files[0]);
                }}
            />
          </Flex>
          <Text w="100%" mb="8px">Display name</Text>
            <InputGroup w="100%" size="md">
                <Input
                    value={displayName}
                    placeHolder={getDid()}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setDisplayName(e.target.value)}
                    p="0 1em 0"
                />
            </InputGroup>
            <Text w="100%" mt="1em" mb="8px">Bio</Text>
            <InputGroup w="100%" size="md">
                <Textarea
                    value={bio}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setBio(e.target.value)}
                    p="0.5em 1em"
                />
            </InputGroup>
            <Text w="100%" mt="1em" mb="8px">Lightning Address</Text>
            <InputGroup w="100%" size="md">
                <Input
                    value={lightningAddress}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setLightningAddress(e.target.value)}
                    p="0 1em"
                />
            </InputGroup>
          </ModalBody>
          <ModalFooter display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Button variant="primary" mb="2em" size="lg" mr={3} onClick={handleCreateProfile}>
              Create profile
            </Button>
          </ModalFooter>
        </ModalContent>
    );
}
=======
    
    return(
        <ModalContent 
          width="125em" 
          background={"black"}
          border="solid 1.5px #fff"
          borderRadius="0"
          boxShadow= "1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF"
        >
          <ModalHeader>Get started</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0 1.5em" display={"flex"} flexDirection={"column"} justifyContent={"center"}>
          <Flex w="100%" mt="1em" mb="2em">
            <Image _hover={{filter:"brightness(150%)",cursor:"pointer"}} onClick={handleEditPFP} borderRadius="100%" h={20} w={20} src={person}/> 
            <EditIcon _hover={{filter:"brightness(150%)",cursor:"pointer"}} onClick={handleEditPFP} alignSelf={"flex-end"} w={6} h={6}/>
            <Input 
                display="none"
                ref={hiddenFileInput}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    console.log(e.target.files[0]);
                    setSelectedImage(e.target.files[0]);
                }}
            />
          </Flex>
          <Text w="100%" mb="8px">Display name</Text>
            <InputGroup w="100%" size="md">
                <Input
                    value={displayName}
                    placeholder={getDid()}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setDisplayName(e.target.value)}
                    p="0 1em 0"
                />
            </InputGroup>
            <Text w="100%" mt="1em" mb="8px">Bio</Text>
            <InputGroup w="100%" size="md">
                <Textarea
                    value={bio}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setBio(e.target.value)}
                    p="0.5em 1em"
                />
            </InputGroup>
            <Text w="100%" mt="1em" mb="8px">Lightning Address</Text>
            <InputGroup w="100%" size="md">
                <Input
                    value={lightningAddress}
                    fontFamily={"IBM Plex Mono"}
                    _focus={{ borderColor: styles.brand.cyan}}
                    color={styles.brand.cyan}
                    onChange={(e) => setLightningAddress(e.target.value)}
                    p="0 1em"
                />
            </InputGroup>
          </ModalBody>
          <ModalFooter display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <Button variant="primary" mb="2em" size="lg" mr={3} onClick={handleCreateProfile}>
              Create profile
            </Button>
          </ModalFooter>
        </ModalContent>
    );
}
>>>>>>> 97b2911 (Add content preview to profile)

  return (
    <ModalContent
      width="125em"
      background={"black"}
      border="solid 1.5px #fff"
      borderRadius="0"
      boxShadow="1px 1px 0px 0px #FFFFFF, 2px 2px 0px 0px #FFFFFF, 3px 3px 0px 0px #FFFFFF, 4px 4px 0px 0px #FFFFFF, 5px 5px 0px 0px #FFFFFF"
    >
      <ModalHeader>{profile ? "Update profile" : "Get started"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody
        p="0 1.5em"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Flex w="100%" mt="1em" mb="2em">
          <Image
            _hover={{ filter: "brightness(150%)", cursor: "pointer" }}
            onClick={handleEditPFP}
            borderRadius="100%"
            h={20}
            w={20}
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : profile?.displayImage
                ? URL.createObjectURL(profile?.displayImage)
                : person
            }
          />
          <EditIcon
            _hover={{ filter: "brightness(150%)", cursor: "pointer" }}
            onClick={handleEditPFP}
            alignSelf={"flex-end"}
            w={6}
            h={6}
          />
          <Input
            display="none"
            ref={hiddenFileInput}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setSelectedImage(e.target.files[0]);
            }}
          />
        </Flex>
        <Text w="100%" mb="8px">
          Display name
        </Text>
        <InputGroup w="100%" size="md">
          <Input
            value={displayName}
            placeholder={getDid()}
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan }}
            color={styles.brand.cyan}
            onChange={(e) => setDisplayName(e.target.value)}
            p="0 1em 0"
          />
        </InputGroup>
        <Text w="100%" mt="1em" mb="8px">
          Bio
        </Text>
        <InputGroup w="100%" size="md">
          <Textarea
            value={bio}
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan }}
            color={styles.brand.cyan}
            onChange={(e) => setBio(e.target.value)}
            p="0.5em 1em"
          />
        </InputGroup>
        <Text w="100%" mt="1em" mb="8px">
          Lightning Address
        </Text>
        <InputGroup w="100%" size="md">
          <Input
            value={lightningAddress}
            fontFamily={"IBM Plex Mono"}
            _focus={{ borderColor: styles.brand.cyan }}
            color={styles.brand.cyan}
            onChange={(e) => setLightningAddress(e.target.value)}
            p="0 1em"
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Button
          variant="primary"
          mb="2em"
          size="lg"
          mr={3}
          onClick={handleCreateProfile}
        >
          {profile ? "Update profile " : "Create profile"}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ProfileEditModal;
