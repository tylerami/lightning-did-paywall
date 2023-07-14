import { Flex, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import ProfileEditModal from "./components/ProfileEditModal";
import { getProfileFromWebNode } from "./util/profileService";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function checkProfile() {
      const existingProfile = await getProfileFromWebNode();
      setProfile(existingProfile);

      if (!existingProfile) {
        onOpen();
      }
    }
    checkProfile();
  }, [onOpen]);

  return (
    <Flex direction={"column"}>
      <NavBar profile={profile} />
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay width="150em" />
        <ProfileEditModal
          profile={profile}
          setProfile={setProfile}
          onClose={onClose}
        />
      </Modal>
      <Routes>
        <Route path="/" element={<Navigate to="/createPost" />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/profile/*"
          element={<Profile profile={profile} openEditProfileModal={onOpen} />}
        ></Route>
        <Route
          path="/profile/:profileDid/*"
          element={<Profile openEditProfileModal={onOpen} />}
        ></Route>
      </Routes>
    </Flex>
  );
}

export default App;
