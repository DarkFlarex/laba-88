import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/login";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Posts from "./features/posts/Posts";
import NewPost from "./features/posts/NewPost";
import Comments from "./features/comments/Comments";

const  App = () => {

  return (
      <>
          <header>
              <AppToolbar/>
          </header>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/comments/:id" element={<Comments/>}/>
                  <Route path="/" element={<Posts/>}/>
                  <Route path="/posts/new" element={<NewPost/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
              </Routes>
          </Container>
      </>
  )
}

export default App
