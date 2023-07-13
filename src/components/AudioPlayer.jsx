import { Box, Flex, IconButton, Progress, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import theme from "../theme";
import audio from "../assets/test.mp3"

const AudioPlayer = ({/* audio */}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMute, setIsMuse] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    
    const styles = theme.styles.global;

    let testAudio = useRef(null);
    const playPause = () => {
        setIsPlaying(!isPlaying)
    }
    const muteUnmute = () => {
        setIsMuse(!isMute)
    }

    useEffect(() => {
        testAudio.current = new Audio(audio);
        testAudio.current.addEventListener("timeupdate", () => {
            setCurrentTime((testAudio.current.currentTime/100).toFixed(2));
            const durationSeconds = testAudio.current.duration;
            setDuration((durationSeconds/100).toFixed(2));
            if (durationSeconds > 0) {
                setProgress((testAudio.current.currentTime / testAudio.current.duration) * 100);
            }
        });
        testAudio.current.load();

        return () => {
            testAudio.current.removeEventListener("timeupdate", () => {});
        }
    }, []);

    useEffect(() => {
        if (isPlaying) {
            const playPromise = testAudio.current.play();
            if (playPromise !== undefined) {
                playPromise.then(()=> {
                    console.log("Automatic playback started")
                }).catch((e)=> {
                    console.log(e)
                });
              }
        } else {
            testAudio.current.pause();
        }
        if (isMute) {
            testAudio.current.volume = 0;
        } else {
            testAudio.current.volume = 1;
        }
    }, [isPlaying,isMute])

    return (
        <Box>
            <Flex >
                <Box mr="1em" w="32px" color={styles.body.primaryFill}>
                    <IconButton 
                        variant="no-bg"
                        onClick={playPause}
                        icon={isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                    />
                </Box>
                
                <Text color={styles.body.primaryFill} alignSelf="center">{currentTime?currentTime:"--:--"}/{duration?duration:"--:--"}</Text>

                <Box ml="1em" mr="1em" alignSelf={"center"} minW="60%">
                    <Progress width="100%" size='xs' value={progress} />
                </Box>

                <Box color={styles.body.primaryFill} w="32px">
                    <IconButton 
                        variant="no-bg"
                        onClick={muteUnmute}
                        icon={isMute ? <AudioMuteIcon size={32} /> : <AudioIcon size={32} />}
                    />
                    
                </Box>
            </Flex>
        </Box>
    );
}

const PlayIcon = ({size}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
    );
}

const PauseIcon = ({size}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
        </svg>
    );
}

const AudioIcon = ({size}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-volume-up-fill" viewBox="0 0 16 16">
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
            <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
        </svg>
    );
}

const AudioMuteIcon = ({size}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-volume-mute-fill" viewBox="0 0 16 16">
            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
        </svg>
    );
}

export default AudioPlayer;