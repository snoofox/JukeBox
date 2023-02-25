import React, { useContext, useState, useRef } from "react";
import { Box, Icon, Image, useToast } from "@chakra-ui/react";
import { PlayerContext } from "../context/PlayerContext";
import { BsPauseFill, BsFillPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react";

const Player = () => {
    const { songs, userInteracted, setUserInteracted } = useContext(PlayerContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const toast = useToast()
    const audioRef = useRef(null);

    const currentSong = songs[currentSongIndex];

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setUserInteracted(true);
                    setIsPlaying(true);
                }).catch((error) => {
                    console.log(error);
                    toast({
                        title: 'Error Playing Audio',
                        description: "Unable to play this song. Please try again.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
            }
        }
        setIsPlaying(!isPlaying);
    };
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleLoadMetadata = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
        if (userInteracted === true) {
            setIsPlaying(true)
            audioRef.current.play();
        }
    }

    const handleSkipForward = () => {
        const nextSongIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextSongIndex);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleSkipBack = () => {
        const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
        setCurrentSongIndex(prevSongIndex);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleSliderChange = (value) => {
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    if (currentSong) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                position="sticky"
                bottom={0}
                bg="blackAlpha.800"
                p={4}
            >
                <audio
                    src={currentSong?.file}
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadMetadata}
                    autoPlay={false}
                    onEnded={handleEnded}
                />

                <Box display="flex" alignItems="center" gap={8} flexWrap="wrap">
                    <Box display="flex" gap={2} alignItems="center" flexShrink={1} minW="350px">
                        <Image src={currentSong.image} maxH={10} />
                        <Box>
                            <Text fontSize="sm">{currentSong.title}</Text>
                            <Text fontSize="xs" color="gray.400">{currentSong.artist}</Text>
                        </Box>
                    </Box>
                    <Box gap={4} display="flex">
                        <Icon as={AiFillStepBackward} onClick={handleSkipBack} boxSize={6} />
                        <Icon as={isPlaying ? BsPauseFill : BsFillPlayFill} onClick={handlePlayPause} boxSize={6} />
                        <Icon as={AiFillStepForward} onClick={handleSkipForward} boxSize={6} />
                    </Box>
                    <Box display="flex" flexGrow={1} alignItems="center" gap={4}>
                        <Text size="xs">{formatTime(currentTime.toFixed(0))}</Text>
                        <Slider
                            aria-label="slider"
                            defaultValue={0}
                            min={0}
                            max={duration ? duration : 0}
                            value={currentTime ? currentTime : 0}
                            onChange={handleSliderChange}
                            colorScheme="teal"
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text size="xs">{formatTime(duration.toFixed(0))}</Text>
                    </Box>
                </Box>
            </Box>
        )
    }

    return
}

export default Player;