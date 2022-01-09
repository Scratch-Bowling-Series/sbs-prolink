





const WebSettings = ({userData, userToken}) => {


    return (
        <div className='page'>
            <div className='block'>
                <a href="">{userData?userData.first_name:'Error'}</a>
                <a href="">{userToken}</a>
            </div>
        </div>
    );
}

export default WebSettings;