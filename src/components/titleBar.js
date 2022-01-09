import React from "react";



const TitleBar = ({userData, pageTitle}) => {
    const onMinimizePress = () => {
        window.minimize();
    }
    const onMaximizePress = () => {
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }
    const onClosePress = () => {
        window.close();
    }

    return (
        <div className="titlebar">
            <a className="titlebar-title">SBS <span>PROLINK</span></a>
            <a className="titlebar-main">{pageTitle ? pageTitle : 'Unknown Page'}</a>
            <div className="titlebar-drag"></div>
            <div className="titlebar-login">
                Logged in as <a href="{% url 'prolink:account' %}">{ userData ? userData.first_name : 'Error' }</a>
                <i id="con-ping-icon" className="fas fa-circle titlebar-connection-icon"></i><i
                className="titlebar-connection" id="con-ping">SYNC</i>
            </div>
            <div className="titlebar-buttons">
                <a id="t-btn-min" className="titlebar-button" onClick={onMinimizePress}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
                    </svg>
                </a>

                <a id="t-btn-max" className="titlebar-button" onClick={onMaximizePress}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect>
                    </svg>
                </a>
                <a id="t-btn-close" className="titlebar-button titlebar-button-close" onClick={onClosePress}>
                    <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
                        <polygon fill="currentColor" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
                    </svg>
                </a>
            </div>
        </div>
    );
}



export default TitleBar;