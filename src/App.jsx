import { Flex, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import ViewPostsPage from "./pages/ViewPostsPage";
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
      console.log(existingProfile);
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
        <ProfileEditModal profile={profile} setProfile={setProfile} onClose={onClose} />
      </Modal>
      <Routes>
        <Route path="/" element={<Navigate to="/createPost" />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/viewPosts" element={<ViewPostsPage />} />
        <Route path="/profile/*" element={<Profile openEditProfileModal={onOpen} profile={profile} />} ></Route>
      </Routes>
    </Flex>
  );
}

export default App;
