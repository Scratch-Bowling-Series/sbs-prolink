import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


import TitleBar from "./components/titleBar";
import Dashboard from "./components/screens/dashboard";
import CreateTournament from "./components/screens/createTournament";
import StartTournament from "./components/screens/startTournament";
import ActiveTournaments from "./components/screens/activeTournaments";
import AllTournaments from "./components/screens/allTournaments";
import ViewBowlers from "./components/screens/viewBowlers";
import ViewCenters from "./components/screens/viewCenters";
import Banking from "./components/screens/banking";
import Permissions from "./components/screens/permissions";
import ManageDrawers from "./components/screens/manageDrawers";
import WebSettings from "./components/screens/webSettings";
import ProgramSettings from "./components/screens/programSettings";
import AppSettings from "./components/screens/appSettings";
import SideBar from "./components/sideBar";

const Store = window.require('electron-store');
const store = new Store();

const Page = ({pageTitle, component, userData, userToken}) => {
    const PageComponent = component;
    return (
        <div className='page-wrap'>
            <TitleBar userData={userData} pageTitle={pageTitle}/>
            <div className='page-inner'>
                <SideBar pageTitle={pageTitle}/>
                <PageComponent userData={userData} userToken={userToken} />
            </div>
        </div>
    );
}

const Main = () => {
    const [userData, setUserData] = React.useState(null);
    const [userToken, setUserToken] = React.useState(null);

    React.useEffect(()=>{
        const token = store.get('userToken');
        const data = store.get('userData');
        if(token && data) {
            setUserData(data);
            setUserToken(token);
            console.log(data);
        }else{
            window.close();
        }
    }, []);

    if(!userData){
        return (
            <div>
                <a href="#">Do something</a>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Page pageTitle='Dashboard' component={Dashboard} userData={userData} userToken={userToken} />}/>
                <Route path='/create' element={<Page pageTitle='Create Tournament' component={CreateTournament} userData={userData} userToken={userToken} />}/>
                <Route path='/start' element={<Page pageTitle='Start Tournament' component={StartTournament} userData={userData} userToken={userToken} />}/>
                <Route path='/active' element={<Page pageTitle='Active Tournaments' component={ActiveTournaments} userData={userData} userToken={userToken} />}/>
                <Route path='/tournaments' element={<Page pageTitle='All Tournaments' component={AllTournaments} userData={userData} userToken={userToken} />}/>
                <Route path='/bowlers' element={<Page pageTitle='View Bowlers' component={ViewBowlers} userData={userData} userToken={userToken} />}/>
                <Route path='/centers' element={<Page pageTitle='View Centers' component={ViewCenters} userData={userData} userToken={userToken} />}/>
                <Route path='/banking' element={<Page pageTitle='Banking' component={Banking} userData={userData} userToken={userToken} />}/>
                <Route path='/manage-drawers' element={<Page pageTitle='Drawers' component={ManageDrawers} userData={userData} userToken={userToken} />}/>
                <Route path='/permissions' element={<Page pageTitle='Permissions' component={Permissions} userData={userData} userToken={userToken} />}/>
                <Route path='/web-settings' element={<Page pageTitle='Website Settings' component={WebSettings} userData={userData} userToken={userToken} />}/>
                <Route path='/program-settings' element={<Page pageTitle='Program Settings' component={ProgramSettings} userData={userData} userToken={userToken} />}/>
                <Route path='/app-settings' element={<Page pageTitle='App Settings' component={AppSettings} userData={userData} userToken={userToken} />}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Main />, document.getElementById('root'));

reportWebVitals();
