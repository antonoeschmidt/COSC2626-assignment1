import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
} from "@mui/material";
import { Music } from "../../models/Music";
import { User } from "../../models/User";

export type QueryProps = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const Query = (props: QueryProps) => {
    const [music, setMusic] = useState<Array<Music>>();
    const [filteredMusic, setFilteredMusic] = useState<Array<Music>>();
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [dirty, setDirty] = useState(false);

    const fetchData = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/music`);
        const data = await res.json();
        setMusic(data.Items as Music[]);
    };

    const handleSearch = () => {
        let result = music.filter((m) => {
            if (
                m.artist.S.toLowerCase().includes(artist.toLowerCase()) &&
                m.title.S.toLowerCase().includes(title.toLowerCase()) &&
                m.year.N.includes(year)
            ) {
                return m;
            }
            return null;
        });

        console.log(result);
        setFilteredMusic(result as Music[]);
        setDirty(true);
    };

    const handleSubscribe = async (music: Music) => {
        props.setUser({
            ...props.user,
            subs: props.user.subs
                ? [...props.user.subs, music.id.S]
                : [music.id.S],
        });

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: props.user.email,
                subs: props.user.subs
                    ? [...props.user.subs, music.id.S]
                    : [music.id.S],
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Find new music</h2>
            <div style={{ display: "flex" }}>
                <TextField
                    sx={{ marginRight: "0.5em" }}
                    label="Title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    sx={{ marginRight: "0.5em" }}
                    label="Year"
                    variant="outlined"
                    onChange={(e) => setYear(e.target.value)}
                />
                <TextField
                    sx={{ marginRight: "0.5em" }}
                    label="Artist"
                    variant="outlined"
                    onChange={(e) => setArtist(e.target.value)}
                />
                <Button variant="contained" onClick={() => handleSearch()}>
                    Search
                </Button>
            </div>

            <List sx={{ maxHeight: "600px", overflow: "auto" }}>
                {filteredMusic?.length > 0 &&
                    filteredMusic.map((m) => (
                        <div
                            key={m.id.S}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={m.img_url.S}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={m.title.S}
                                    secondary={`${m.artist?.S} - ${m.year?.N}`}
                                />
                            </ListItem>
                            <Button
                                sx={{ height: "100%" }}
                                variant="contained"
                                color="success"
                                onClick={() => handleSubscribe(m)}
                                disabled={props.user.subs?.includes(m.id.S)}
                            >
                                Subscribe
                            </Button>
                        </div>
                    ))}
                {filteredMusic?.length === 0 && dirty && (
                    <p>No result is retrieved. Please query again</p>
                )}
            </List>
        </div>
    );
};

export default Query;
