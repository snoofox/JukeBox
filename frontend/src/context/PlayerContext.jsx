import React, { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerProvider = ({children}) => {
    const getSongs = localStorage.getItem('songs');
    const [songs, setSongs] = useState(getSongs ? JSON.parse(getSongs) : []);
    const [userInteracted, setUserInteracted] = useState(false);

    const context = {
        songs: songs,
        setSongs: setSongs,
        userInteracted: userInteracted,
        setUserInteracted: setUserInteracted,
    }

    return (
        <PlayerContext.Provider value={context}>
            {children}
        </PlayerContext.Provider>
    )
}

export { PlayerContext, PlayerProvider };
