import React, { useContext } from "react";
import './styles/App.css';
import Feed from "./pages/Feed";
import Queue from "./pages/Queue";
import Track from "./pages/Track";
import HomePage from './pages/HomePage';
import Playlist from "./pages/Playlist";
import Player from "./components/Player";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SidebarContent from "./components/SidebarContetnt";
import { AuthContext } from "./context/AuthContext";
import { Avatar, Box, Drawer, Button, DrawerContent, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";

function App() {
  const sidebar = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box as="section" display="flex" flexDirection="column" bg="blackAlpha.500" minH="100vh">
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg="blackAlpha.700"
            borderBottomWidth="1px"
            color="inherit"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <SearchBar variant="flushed" width="96" />
            <Flex align="center">
              {user ? (
                <Avatar
                  ml="4"
                  size="sm"
                  name={user?.username}
                />
              ) : (
                <Button variant="ghost" size="sm">Log in</Button>
              )}
            </Flex>
          </Flex>
          <Box p="4" mt={3}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/track/:id" element={<Track />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/page/:page" element={<Feed />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Routes>
          </Box>
          <Player />
        </Box>
      </Box>
    </>
  )
}

export default App;
