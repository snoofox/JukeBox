import React, { useContext } from "react";
import { Text, Image, Box, Button } from "@chakra-ui/react";
import { Card, CardBody } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const Queue = () => {
    const { songs: data, setSongs } = useContext(PlayerContext);

    const clearAll = () => {
        setSongs([]);
        localStorage.removeItem('songs');
    }

    return (
        <Card bg='none'>
            <CardBody>
                <Box display="flex" gap={10} alignItems="center" flexWrap="wrap">
                    <Image src={data[0]?.image} boxSize="3xs" borderRadius={10} />
                    <Box display="flex" flexDirection="column">
                        <Text fontSize="2xl" fontWeight="600" textTransform="capitalize">Queue</Text>
                        <Text fontSize="sm" color="gray.500" mt={2}>{data?.length} Tracks</Text>
                        <Text fontSize="sm" color="gray.500" mt={2}>Created by JukeBox</Text>
                        <Button size="sm" mt={4} onClick={clearAll}>Clear All</Button>
                    </Box>
                </Box>
                <Box mt={10} minH="100vh">
                    <Text fontSize="xl" fontWeight="600">Tracks</Text>
                    <Box display="flex" flexDirection="column" mt={4} gap={6}>
                        {
                            data?.map((item, index) => (
                                <Link to={`/track/${item.id}`} key={index}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" gap={4} alignItems="center">
                                            <Image src={item.image} maxH={16} />
                                            <Box display="flex" flexDirection="column">
                                                <Text fontSize="sm">{item.title}</Text>
                                                <Text fontSize="xs" color="gray.400">{item.artist}</Text>
                                            </Box>
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

export default Queue;
