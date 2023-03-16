import React from "react";
import Query from "../../components/Query/Query";
import Subscribed from "../../components/Subscribed/Subscribed";
import { User } from "../../models/User";
import "./MainPage.css"

export type MainPageProps = {
    user: User;
}

const MainPage = (props: MainPageProps) => {

    return (
        <div className="main-container">
            <h1>Music Subscription Service</h1>
            <h3>Username: {props.user.username}</h3>
            <div className="content">
            <div className="subscribed-area">
                <Subscribed/>
            </div>
            <div className="query-area">
                <Query/>
            </div>
            </div>
        </div>
    )
}

export default MainPage;