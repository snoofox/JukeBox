import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Text, Box, Image, Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";
import { Card, CardBody } from '@chakra-ui/react';
import { PlayerContext } from "../context/PlayerContext";
import Entry from "../components/Entry";
import API_ENDPOINT from "../components/config";
import axios from "axios";

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState('');
    const { setSongs } = useContext(PlayerContext);

    useEffect(() => {
        async function fetchSongs() {
            await axios.get(`${API_ENDPOINT}/api/playlists/${id}`)
                .then(response => {
                    setPlaylist(response.data);
                })
        }
        fetchSongs()
    }, [id])

    return (
        <Card bg='none' minH="100vh">
            <CardBody>
                <Box display="flex" gap={10} alignItems="center" flexWrap="wrap">
                    <Image src={playlist.image} boxSize="3xs" borderRadius={10} />
                    <Box>
                        <Text fontSize="2xl" fontWeight="600">{playlist.title}</Text>
                        <Text fontSize="sm" color="gray.500">{playlist.author}</Text>
                        <Text fontSize="sm" mt={3} color="gray.500" noOfLines={3} maxW={400}>{playlist.description}</Text>
                        <ButtonGroup mt={6}>
                            <Button size="sm" onClick={() => setSongs(playlist?.songs)}>Play All</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Box mt={10}>
                    <Text fontSize="xl" fontWeight="600">Tracks</Text>
                    <SimpleGrid columns={[2, 5, 6]} spacing={8} mt={4}>
                        {playlist?.songs?.map((song, index) => {
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
            </CardBody>
        </Card>
    )
}

export default Playlist;
