import React from "react";


const BlockHeader = ({title, viewMoreTitle, onViewMore}) =>{
    return (
        <div className='block-header-wrap'>
            <h1 className='block-header'>{title}</h1>
            {viewMoreTitle?(
                <a className='block-header-view-more' onClick={onViewMore}>{viewMoreTitle}<i className='fa fa-caret-right'></i></a>
            ):null}
        </div>
    );
}


export default BlockHeader;