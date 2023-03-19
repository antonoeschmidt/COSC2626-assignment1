import React, { useCallback, useEffect, useState } from "react";
import { Music } from "../../models/Music";
import { User } from "../../models/User";
import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";

export type SubscribedType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const Subscribed = (props: SubscribedType) => {
    const [music, setMusic] = useState<Array<Music>>();

    const fetchData = useCallback(async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/music`);
        const data = await res.json();

        let result = data.Items.filter((m: Music) => {
            if (props.user.subs?.includes(m.id.S)) {
                return m;
            }
            return null;
        });

        setMusic(result as Music[]);
    }, [props.user.subs]);

    const handleUnsubscribe = async (unsubMusic: Music) => {
        let musicState: any[] = music.filter((m: any) => {
            if (m.id.S !== unsubMusic.id.S) {
                return m.id.S;
            }
            return null;
        });
        let result = []
        for (let index = 0; index < music.length; index++) {
            if (music[index].id.S !== unsubMusic.id.S) {
                result.push(music[index].id.S)
            }            
        }
        console.log(result)
        
        props.setUser({
            ...props.user,
            subs: result as string[],
        });

        setMusic(musicState)

        const res = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: props.user.email,
                subs: result,
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h2>Your subscribed music</h2>
            <List sx={{ maxHeight: "600px", overflow: "auto" }}>
                {music?.length > 0 &&
                    music.map((m) => (
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
                                color="error"
                                onClick={() => handleUnsubscribe(m)}
                            >
                                Unsubscribe
                            </Button>
                        </div>
                    ))}
            </List>
        </div>
    );
};

export default Subscribed;
