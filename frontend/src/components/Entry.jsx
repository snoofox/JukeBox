import React from "react";
import { Box, Image, Text, Square } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Entry = (props) => {
    return (
        <Link to={`/${props.isPlaylist ? 'playlist' : 'track'}/${props.id}`}>
            <Square
                borderRadius="lg"
                overflow="hidden"
                display="flex"
            >
                <Image
                    src={props.image}
                    alt="Album Art"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    flex={1}
                />
            </Square>
            <Box p={2}>
                <Text fontSize="md" fontWeight="600" color="gray.100" isTruncated>
                    {props.title}
                </Text>
                <Text fontSize="xs" color="gray.300" mt="1" isTruncated>
                    {props.subtitle}
                </Text>
            </Box>
        </Link>
    )
}

export default Entry;
