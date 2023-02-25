import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Text, Image, Box, Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Card, CardBody } from '@chakra-ui/react';
import API_ENDPOINT from "../components/config";
import { PlayerContext } from "../context/PlayerContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

const Track = () => {
    const { id } = useParams();
    const [track, setTrack] = useState('');
    const [readMore, setReadMore] = useState(false);
    const { songs, setSongs, setUserInteracted } = useContext(PlayerContext);

    useEffect(() => {
        async function fetchSongs() {
            await axios.get(`${API_ENDPOINT}/api/songs/${id}`)
                .then(response => {
                    setTrack(response.data);
                })
        }
        fetchSongs()
    }, [id])

    const setCurrentSong = (track) => {
        setSongs([track]);
        setUserInteracted(true);
        localStorage.setItem('songs', JSON.stringify([track]))
    }

    const addToQueue = () => {
        setSongs([...songs, track]);
        localStorage.setItem('songs', JSON.stringify([track]))
    }

    return (
        <Card bg='none'>
            <CardBody>
                <Box display="flex" gap={10} alignItems="center" flexWrap="wrap">
                    <Image src={track.image} boxSize="3xs" borderRadius={10} />
                    <Box>
                        <Text fontSize="2xl" fontWeight="600">{track.title}</Text>
                        <Text fontSize="sm" color="gray.500">{track.artist}</Text>
                        <Menu>
                            <ButtonGroup mt={6}>
                                <Button size="sm" onClick={() => (setCurrentSong(track))}>Play Song</Button>
                                <MenuButton as={IconButton} aria-label='menu' size="sm" icon={<BsThreeDotsVertical />}></MenuButton>
                            </ButtonGroup>
                            <MenuList>
                                <MenuItem as="a" href={track.file}>Download</MenuItem>
                                <MenuItem onClick={addToQueue}>Add to Queue</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
                <Box mt={10} minH="100vh">
                    <Text fontSize="xl" fontWeight="600">Lyrics</Text>
                    { track.lyrics ? (
                        <Box>
                            <Text whiteSpace="pre-line" fontSize="sm" mt={4} noOfLines={readMore ? 'full' : '6'}>{track.lyrics}</Text>
                            <Button
                                onClick={() => setReadMore(!readMore)}
                                size="xs"
                                mt={3}
                                variant="outline"
                            >
                                Read {readMore ? 'Less' : 'More'}
                            </Button>
                        </Box>
                    ) : (
                        <Text mt={3} color="gray.400">
                                Oh no! It looks like this song is missing its lyrical words.<br />
                                Let's hope they find their way back soon, so we can sing along to the melody once again.
                        </Text>
                    )}
                </Box>
            </CardBody>
        </Card>
    )
}

export default Track;
