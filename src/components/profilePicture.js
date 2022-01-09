import React from "react";


const defaultPictureLocation = '/media/profile-pictures/default.jpg'
const base_url = '';


const ProfilePicture = ({url}) => {
    return (
        <img className='profile-picture' src={base_url+(url?url:defaultPictureLocation)} alt=""/>
    );
}


export default ProfilePicture;
