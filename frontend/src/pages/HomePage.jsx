import React, { useState, useEffect } from "react";
import { Box, Square, SimpleGrid, Text, Flex, Spinner, Button, useMediaQuery } from "@chakra-ui/react";
import Entry from "../components/Entry";
import API_ENDPOINT from "../components/config";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [isSmallDevice] = useMediaQuery("(max-width: 48em)")

    useEffect(() => {
        async function fetchSongs() {
            await axios.get(`${API_ENDPOINT}/api/songs?limit=5`)
                .then(response => {
                    setSongs(response.data.results);
                    setLoading(false)
                })
        }
        async function fetchPopular() {
            await axios.get(`${API_ENDPOINT}/api/popular?limit=4`)
                .then(response => {
                    setPopularPosts(response.data.results);
                })
        }
        async function fetchPlaylists() {
            await axios.get(`${API_ENDPOINT}/api/playlists?limit=5`)
                .then(response => {
                    setPlaylists(response.data.results);
                })
        }

        fetchSongs()
        fetchPopular()
        fetchPlaylists()
    }, [])

    return loading ? (
        <Flex justifyContent="center" alignItems="center" h="100vh">
            <Spinner size='xl' />
        </Flex>) : (
        <Box as="main" p="4">
            { isSmallDevice && (
                <Box display="flex" flexDirection="column">
                    <Text fontSize="sm" fontWeight="500">Welcome</Text>
                    <Text as="h3" mt={1} fontSize="md" fontWeight="600" color="teal.300">Enjoy your favorite music</Text>
                    <Box my={4}>
                        <SearchBar show="true" />
                    </Box>
                </Box>
            )}
            <Box p={4}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="xl" fontWeight="600">Explore new</Text>
                    <Button as="a" href="/page/songs" size="xs" variant="outline">See All</Button>
                </Flex>
                <SimpleGrid columns={[2, 4, 5]} spacing={8} mt={4}>
                    {songs.map((song, index) => {
                        return (
                            <Entry
                                key={index}
                                id={song.id}
                                title={song.title}
                                subtitle={song.artist}
                                image={song.image}
                            />
                        )
                    })}
                </SimpleGrid>
            </Box>
            <Box display="flex" m={4} mt={6} flexWrap="wrap" gap={14}>
                <Box flex={1} minW="60%">
                    <Text fontSize="xl" fontWeight="600">Popular</Text>
                    <SimpleGrid mt={4} columns={[2, 3, 4]} spacing={4}>
                        {popularPosts.map((item, index) => {
                            return (
                                <Entry
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    subtitle={item.artist}
                                    image={item.image}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Box>
                <Box flexGrow={1}>
                    <Text fontSize="xl" fontWeight="600">Mood</Text>
                    <SimpleGrid columns={2} spacing={2} py={4}>
                        <Link to="/page/popular"><Square borderWidth={2} p={8} _hover={{bg: "gray.900"}}>Top Hits</Square></Link>
                        <Link to="/page/songs"><Square borderWidth={2} p={8} _hover={{ bg: "gray.900" }}>Recent</Square></Link>
                        <Link to="/playlist/2"><Square borderWidth={2} p={8} _hover={{ bg: "gray.900" }}>Favorites</Square></Link>
                        <Link to="/playlist/1"><Square borderWidth={2} p={8} _hover={{ bg: "gray.900" }}>Aesthetics</Square></Link>
                    </SimpleGrid>
                </Box>
            </Box>
            <Box p={4}>
                <Text fontSize="xl" fontWeight="600">Playlists</Text>
                <SimpleGrid columns={[2, 4, 5]} spacing={8} mt={4}>
                    {playlists.map((playlist, index) => {
                        return (
                            <Entry
                                key={index}
                                id={playlist.id}
                                title={playlist.title}
                                subtitle={playlist.author}
                                image={playlist.image}
                                isPlaylist={true}
                            />
                        )
                    })}
                </SimpleGrid>
            </Box>
        </Box>
    );
};
