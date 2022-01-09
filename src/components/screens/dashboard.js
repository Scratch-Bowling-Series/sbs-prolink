import React from "react";
import '../../css/main.css';
import {LineChart, Line, Tooltip, ResponsiveContainer} from "recharts";
import BlockHeader from "../blockHeader";
import AnalyticsBlock from "../analyticsBlock";

const defaultStatDataWebsite = [
    {'title': 'PAGE VIEWS', 'value': '12,495,192', 'format' : '24h'},
    {'title': 'VISITS THIS MONTH', 'value': '159,095', 'format' : '3mo'},
    {'title': 'VISITS TODAY', 'value': '5,585', 'format' : '24h'},
    {'title': 'ONLINE NOW', 'value': '288', 'format' : '24h'},
];
const defaultStatDataBowler = [
    {'title': 'APP INSTALLS', 'value': '32,018', 'format' : '24h'},
    {'title': 'OPENS THIS MONTH', 'value': '621,982', 'format' : '3mo'},
    {'title': 'OPENS TODAY', 'value': '15,291', 'format' : '24h'},
    {'title': 'online now', 'value': '288', 'format' : '24h'},
];
const defaultStatDataBroadcast = [
    {'title': 'chat sends', 'value': '59,257,631', 'format' : '24h'},
    {'title': 'stream views', 'value': '321,209,105', 'format' : '3mo'},
    {'title': 'vod views', 'value': '249,102,211', 'format' : '24h'},
    {'title': 'watching now', 'value': '319', 'format' : '24h'},
];
const defaultStatDataUser = [
    {'title': 'USERS', 'value': '176,252', 'format' : '24h'},
    {'title': 'JOINED THIS MONTH', 'value': '13,401', 'format' : '3mo'},
    {'title': 'LOGINS TODAY', 'value': '9,219', 'format' : '24h'},
    {'title': 'online now', 'value': '676', 'format' : '24h'},
];



const Dashboard = ({userData, userToken}) => {
    return (
        <div className='page'>
            <AnalyticsBlock title='website analytics' data={defaultStatDataWebsite} />
            <AnalyticsBlock title='sbs bowler analytics' data={defaultStatDataBowler} />
            <AnalyticsBlock title='broadcast analytics' data={defaultStatDataBroadcast} />
            <AnalyticsBlock title='user analytics' data={defaultStatDataUser} />
        </div>
    );
}

export default Dashboard;