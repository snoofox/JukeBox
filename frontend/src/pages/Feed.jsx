import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Text, Image, Box, Button } from "@chakra-ui/react";
import { Card, CardBody } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import API_ENDPOINT from "../components/config";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const Track = () => {
    const { page } = useParams();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const isPlaylist = (page === 'playlists' ? true : false);
    const { setSongs } = useContext(PlayerContext);

    useEffect(() => {
        async function fetch() {
            await axios.get(`${API_ENDPOINT}/api/${page}`)
                .then(response => {
                    setCount(response.data.count)
                    setData(response.data.results);
                })
        }
        fetch()
    }, [page])

    return (
        <Card bg='none'>
            <CardBody>
                <Box display="flex" gap={10} alignItems="center" flexWrap="wrap">
                    <Image src={data[0]?.image} boxSize="3xs" borderRadius={10} />
                    <Box display="flex" flexDirection="column">
                        <Text fontSize="2xl" fontWeight="600" textTransform="capitalize">{page}</Text>
                        <Text fontSize="sm" color="gray.500" mt={2}>{count} {isPlaylist ? 'Playlists' : 'Tracks'}</Text>
                        <Text fontSize="sm" color="gray.500" mt={2}>Created by JukeBox</Text>
                        <Button size="sm" mt={4} onClick={() => setSongs(data)}>Play All</Button>
                    </Box>
                </Box>
                <Box mt={10} minH="100vh">
                    <Text fontSize="xl" fontWeight="600">{isPlaylist ? 'Playlists' : 'Tracks'}</Text>
                    <Box display="flex" flexDirection="column" mt={4} gap={6}>
                        {
                            data?.map((item, index) => (
                                <Link to={`/${isPlaylist ? 'playlist' : 'track'}/${item.id}`} key={index}>
                                    <Box display="flex" gap={4} alignItems="center">
                                        <Image src={item.image} maxH={16} />
                                        <Box display="flex" flexDirection="column">
                                            <Text fontSize="sm">{item.title}</Text>
                                            <Text fontSize="xs" color="gray.400">{item.artist}</Text>
                                        </Box>
                                    </Box>
                                </Link>
                            ))
                        }
                    </Box>
                </Box>
            </CardBody>
        </Card>
    )
}

export default Track;
