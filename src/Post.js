import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
    return ( <
        center >
        <
        div className = "post" >
        <
        div className = "post_header" >
        <
        Avatar className = "post_avatar"
        alt = 'Subash'
        src = "/static/images/avatar/1.jpg" / > <
        h3 > { username } < /h3>  < /
        div > <
        img className = "post_image"
        src = { imageUrl }
        alt = "" /
        >
        <
        h4 className = "post_text" >
        <
        strong > { username } < /strong> {caption}  < /
        h4 > <
        /div > <
        /center>
    )
}

export default Post