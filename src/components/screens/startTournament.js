





const StartTournament = ({userData, userToken}) => {


    return (
        <div className='page'>
            <a href="">{userData?userData.first_name:'Error'}</a>
            <a href="">{userToken}</a>
        </div>
    );
}

export default StartTournament;