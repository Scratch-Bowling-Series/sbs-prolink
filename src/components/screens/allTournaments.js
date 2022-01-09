import AnalyticsBlock from "../analyticsBlock";
import React from "react";
import SearchBar from "../searchBar";



const defaultStatDataUser = [
    {'title': 'TOTAL COMPLETED', 'value': '1,019', 'format' : '6mo'},
    {'title': 'THIS MONTH', 'value': '319', 'format' : '1mo'},
    {'title': 'avg attending', 'value': '124.2', 'format' : '3mo'},
    {'title': 'scheduled', 'value': '43', 'format' : '1mo'},
];





const AllTournaments = ({userData, userToken}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const searchSubmit = () => {
        if(searchQuery){
            console.log(searchQuery);
        }
    }

    return (
        <div className='page'>
            <AnalyticsBlock data={defaultStatDataUser} />
            <SearchBar placeholder='Search Tournaments...' onTextChange={(query) => setSearchQuery(query)} onSearchSubmit={searchSubmit}/>
        </div>
    );
}

export default AllTournaments;