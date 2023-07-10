import { Flex } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage";
import ViewPostsPage from "./pages/ViewPostsPage";
import Profile from "./pages/Profile";

function App() {
  //TODO(ailany): change to getProfile(did);
  const profile = null; 
  return (
    <Flex direction={"column"}>
      <NavBar />
      {()=>{
        if (!profile) {
          return(
            <>hi</>
          );
        }
      }
      }
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
