import React from "react";
import Query from "../../components/Query/Query";
import Subscribed from "../../components/Subscribed/Subscribed";
import { User } from "../../models/User";
import "./MainPage.css"

export type MainPageProps = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>
}

const MainPage = (props: MainPageProps) => {

    return (
        <div className="main-container">
            <h1>Music Subscription Service</h1>
            <h3>Username: {props.user.username}</h3>
            <div className="content">
            <div className="subscribed-area">
                <Subscribed user={props.user} setUser={props.setUser}/>
            </div>
            <div className="query-area">
                <Query user={props.user} setUser={props.setUser}/>
            </div>
            </div>
        </div>
    )
}

export default MainPage;