import React from "react";
import AnalyticsBlock from "../analyticsBlock";
import SearchBar from "../searchBar";


const defaultStatDataUser = [
    {'title': 'TOTAL COMPLETED', 'value': '1,019', 'format' : '6mo'},
    {'title': 'THIS MONTH', 'value': '319', 'format' : '1mo'},
    {'title': 'avg attending', 'value': '124.2', 'format' : '3mo'},
    {'title': 'scheduled', 'value': '43', 'format' : '1mo'},
];


const ViewCenters = ({userData, userToken}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const searchSubmit = () => {
        if(searchQuery){
            console.log(searchQuery);
        }
    }

    return (
        <div className='page'>
            <SearchBar placeholder='Search Centers...' onTextChange={(query) => setSearchQuery(query)} onSearchSubmit={searchSubmit}/>
        </div>
    );
}

export default ViewCenters;