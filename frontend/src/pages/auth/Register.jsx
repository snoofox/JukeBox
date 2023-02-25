import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Flex, FormErrorMessage, Input, Button, InputGroup, Stack, InputLeftElement, Box, Link, Avatar, FormControl, InputRightElement } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import API_ENDPOINT from "../../components/config";
import axios from "axios";

const Register = () => {
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [error, setError] = useState([]);
    const isUserNameValid = error && "username" in error;
    
    const register = async (e) => {
        e.preventDefault()

        const payload = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        await axios.post(`${API_ENDPOINT}/auth/register/`, payload)
            .then(response => {
                if (response.status === 201) {
                    window.location.href = '/auth/login';
                }
            })
            .catch(error => {
                if (error && error.response) {
                    console.clear();
                    setError(error.response.data);
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
                        <form onSubmit={register}>
                            <Stack
                                spacing={4}
                                p="1rem"
                            >
                                <FormControl isInvalid={isUserNameValid}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input
                                            isInvalid={isUserNameValid}
                                            type="text"
                                            placeholder="Username"
                                            name="username"
                                            errorBorderColor='red.300'
                                            isRequired={true}
                                        />
                                    </InputGroup>
                                    {isUserNameValid && (<FormErrorMessage>Username is taken.</FormErrorMessage>)}
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<AiFillMail color="gray.300" />}
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
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
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                    mt={4}
                                >
                                    Sign Up!
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    Already have an account?{" "}
                    <Link color="teal.500" href="/auth/login">
                        Log in
                    </Link>
                </Box>
            </Flex>
        </>
    )
}

export default Register;
