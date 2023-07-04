import { Flex } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import ViewPostsPage from "./pages/ViewPostsPage";

function App() {
  return (
    <Flex direction={"column"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/createPost" />} />
        <Route path="/createPost"  element={<CreatePostPage/>}/>
        <Route path="/viewPosts" element={<ViewPostsPage/>}/>
      </Routes>
    </Flex>
  );
}

export default App;
