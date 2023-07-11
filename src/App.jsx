import { Flex, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import ViewPostsPage from "./pages/ViewPostsPage";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import ProfileEditModal from "./components/ProfileEditModal";

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO(ailany): change to getProfile(did);
  const profile = null; 

  useEffect(() => {
    if(!profile){
      onOpen();
    }
  },[profile]);
  
  return (
    <Flex direction={"column"}>
      <NavBar />
      <Modal size="xl"  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay  width="150em"/>
        <ProfileEditModal onClose={onClose} />
        </Modal>
      <Routes>
        <Route path="/" element={<Navigate to="/createPost" />} />
        <Route path="/createPost"  element={<CreatePostPage/>}/>
        <Route path="/viewPosts" element={<ViewPostsPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Flex>
  );
}

export default App;
