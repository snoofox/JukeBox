import jwt_decode from "jwt-decode";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Flex, chakra, Input, Button, InputGroup, Stack, InputLeftElement, Box, Link, Avatar, FormControl, InputRightElement } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import API_ENDPOINT from "../../components/config";
import axios from "axios";

const Login = () => {
    const { user, setAuthTokens, setUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [error, setError] = useState([]);
   
    const login = async (e) => {
        e.preventDefault()

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        await axios.post(`${API_ENDPOINT}/auth/token/`, payload)
            .then(response => {
                if (response.status === 200) {
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));
                    localStorage.setItem('auth', JSON.stringify(response.data));
                    Navigate('/');
                }
            })
            .catch(error => {
                if (error && error.response) {
                    console.clear();
                    setError(error.response.data.detail);
                }
            })
    }  

    return (
        <>
            {user && <Navigate to="/" />}
            <Flex
                flexDirection="column"
                width="100wh"
                height="82vh"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    boxShadow="md"
                >
                    <Avatar size="lg" colorScheme="brand" />
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form onSubmit={login}>
                            <Stack
                                spacing={4}
                                p="1rem"
                            >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            isRequired={true}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<FaLock color="gray.300" />}
                                        />
                                        <Input
                                            type={show ? "text" : "password"}
                                            placeholder="Password"
                                            name="password"
                                            isRequired={true}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                                {show ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                {error && <chakra.p my={6} color="red" _dark={{ color: "red.200" }}>{error}</chakra.p>}
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    New to us?{" "}
                    <Link color="teal.500" href="/auth/register">
                        Sign Up
                    </Link>
                </Box>
            </Flex>
        </>
    )
}

export default Login;
