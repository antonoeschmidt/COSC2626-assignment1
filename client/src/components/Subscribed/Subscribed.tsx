import { List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Music } from "../../models/Music";


const Subscribed = () => {
    const [music, setMusic] = useState<Array<Music>>();

    const fetchData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/music`);
        const data = await res.json();
        setMusic(data.Items as Music[]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Your subscribed music</h2>
            <List sx={{maxHeight: '600px', overflow: 'auto'}}>
                {music?.length > 0 &&
                    music.map((m) => (
                        <ListItem key={m.id.S}>
                            <ListItemText
                                primary={m.title.S}
                                secondary={`${m.artist?.S} - ${m.year?.N}`}
                            />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

export default Subscribed