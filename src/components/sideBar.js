import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/main.css'
import '../css/all.css'
import packageJson from '../../package.json';

const SideBar = ({pageTitle}) => {
    const [appVersion, setAppVersion] = React.useState(null);
    const [appSubVersion, setAppSubVersion] = React.useState(null);

    let navigate = useNavigate();

    React.useEffect(()=>{
        setAppVersion(packageJson.version);
        setAppSubVersion('.0.0');
    }, []);


    return (
        <div className="sidebar">
            <div className='sidebar-inner'>
                <div className={'sidebar-item ' + (pageTitle === 'Dashboard' ? 'active' : '')} onClick={() => {navigate('/')}}>
                    <i className='fa fa-chart-line sidebar-icon'></i>
                    <a className='sidebar-title'>DASHBOARD</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Create Tournament' ? 'active' : '')} onClick={() => {navigate('/create')}}>
                    <i className='fa fa-clock sidebar-icon'></i>
                    <a className='sidebar-title'>CREATE TOURNAMENT</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Start Tournament' ? 'active' : '')} onClick={() => {navigate('/start')}}>
                    <i className='fa fa-play sidebar-icon'></i>
                    <a className='sidebar-title'>START TOURNAMENT</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Active Tournaments' ? 'active' : '')} onClick={() => {navigate('/active')}}>
                    <i className='fa fa-window-restore sidebar-icon'></i>
                    <a className='sidebar-title'>ACTIVE TOURNAMENTS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'All Tournaments' ? 'active' : '')} onClick={() => {navigate('/tournaments')}}>
                    <i className='fa fa-list sidebar-icon'></i>
                    <a className='sidebar-title'>ALL TOURNAMENTS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'View Bowlers' ? 'active' : '')} onClick={() => {navigate('/bowlers')}}>
                    <i className='fa fa-user sidebar-icon'></i>
                    <a className='sidebar-title'>VIEW BOWLERS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'View Centers' ? 'active' : '')} onClick={() => {navigate('/centers')}}>
                    <i className='fa fa-building sidebar-icon'></i>
                    <a className='sidebar-title'>VIEW CENTERS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Banking' ? 'active' : '')} onClick={() => {navigate('/banking')}}>
                    <i className='fa fa-dollar-sign sidebar-icon'></i>
                    <a className='sidebar-title'>BANKING</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Program Settings' ? 'active' : '')} onClick={() => {navigate('/program-settings')}}>
                    <i className='fa fa-cog sidebar-icon'></i>
                    <a className='sidebar-title'>PROGRAM SETTINGS</a>
                </div>
                <a className={'sidebar-divider'}>ADMIN<span>ISTRATOR</span></a>
                <div className={'sidebar-item ' + (pageTitle === 'Permissions' ? 'active' : '')} onClick={() => {navigate('/permissions')}}>
                    <i className='fa fa-key sidebar-icon'></i>
                    <a className='sidebar-title'>PERMISSIONS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Drawers' ? 'active' : '')} onClick={() => {navigate('/manage-drawers')}}>
                    <i className='fa fa-cash-register sidebar-icon'></i>
                    <a className='sidebar-title'>DRAWERS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'Website Settings' ? 'active' : '')} onClick={() => {navigate('/web-settings')}}>
                    <i className='fa fa-globe sidebar-icon'></i>
                    <a className='sidebar-title'>WEBSITE SETTINGS</a>
                </div>
                <div className={'sidebar-item ' + (pageTitle === 'App Settings' ? 'active' : '')} onClick={() => {navigate('/app-settings')}}>
                    <i className='fa fa-mobile-alt sidebar-icon'></i>
                    <a className='sidebar-title'>APP SETTINGS</a>
                </div>

                <div className={'sidebar-bottom'}>
                    <a className='version'>v{appVersion?appVersion:'1.2' +
                        '.1'}<span className='version-suffix'>{appSubVersion}</span><span className='session'>SBS PROLINK</span></a>
                </div>
            </div>
        </div>
    );
}



export default SideBar;