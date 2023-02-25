import React, { useContext } from "react";
import NavItem from "./NavItem";
import { AuthContext } from "../context/AuthContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRss, FaGithub } from "react-icons/fa";
import { MdHome, MdQueueMusic, MdLogin, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { HiCollection, HiUserAdd } from "react-icons/hi";

const SidebarContent = (props) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="blackAlpha.700"
            border
            color="inherit"
            borderRightWidth="1px"
            w="60"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <Link to="/">
                    <Text
                        fontSize="2xl"
                        ml="2"
                        color="teal.500"
                        _dark={{ color: "white" }}
                        fontWeight="semibold"
                    >
                        JukeBox
                    </Text>
                </Link>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                aria-label="Main Navigation"
            >
                <Link to='/'><NavItem icon={MdHome}>Home</NavItem></Link>
                <Link to='/page/popular'><NavItem icon={FaRss}>Popular</NavItem></Link>
                <Link to='/page/playlists'><NavItem icon={HiCollection}>Playlists</NavItem></Link>
                <Link to='/queue'><NavItem icon={MdQueueMusic}>Queue</NavItem></Link>
                <Link to='https://github.com/snoofox/JukeBox'><NavItem icon={FaGithub}>Repository</NavItem></Link>
                {user ? (
                    <NavItem onClick={logout} icon={MdLogout}>Logout</NavItem>
                ) : (
                    <Box>
                        <Link to='/auth/login'><NavItem icon={MdLogin}>Login</NavItem></Link>
                        <Link to='/auth/register'><NavItem icon={HiUserAdd}>Sign Up</NavItem></Link>
                    </Box>
                )}
            </Flex>
        </Box>
    );
}

export default SidebarContent;