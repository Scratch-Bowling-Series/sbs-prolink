import React from "react";
import AnalyticsBlock from "../analyticsBlock";
import SearchBar from "../searchBar";


const defaultStatDataUser = [
    {'title': 'USERS', 'value': '176,252', 'format' : '24h'},
    {'title': 'JOINED THIS MONTH', 'value': '13,401', 'format' : '3mo'},
    {'title': 'LOGINS TODAY', 'value': '9,219', 'format' : '24h'},
    {'title': 'online now', 'value': '676', 'format' : '24h'},
];




const ViewBowlers = ({userData, userToken}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const searchSubmit = () => {
        if(searchQuery){
            console.log(searchQuery);
        }
    }

    return (
        <div className='page'>
            <AnalyticsBlock data={defaultStatDataUser} />
            <SearchBar placeholder='Search Bowlers...' onTextChange={(query) => setSearchQuery(query)} onSearchSubmit={searchSubmit}/>
        </div>
    );
}

export default ViewBowlers;