import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { db, auth } from "./firebase";
import Input from '@material-ui/core/Input';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    // user has logged in.. Welcome Genius
                    console.log(authUser);
                    setUser(authUser);

                    // if (authUser.displayName) {
                    //     //dont update username
                    // } else {
                    //     return authUser.updateProfile({
                    //         displayName: username,
                    //     });
                    // }
                } else {
                    //user has logged out...! Fuck off
                    setUser(null);
                }

                return () => {
                    //performs cleanup actions
                    unsubscribe();
                }
            })
        }, [user, username]);

    useEffect(() => {
        //this is where the code runs
        db.collection("posts").onSnapshot((snapshot) => {
            //every time a new post is added, this code is fired...
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data(),
                }))
            );
        });
    }, []);

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));

        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false);
    }

    return (
        <div className="app" >
            <Modal open={open}
                onClose={() => setOpen(false)}>

                <div style={modalStyle}
                    className={classes.paper}>
                    <form className="app_signup">
                        <center>
                            <img
                                className="app_headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                                alt=""
                            />
                        </center>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={
                                (s) => setUsername(s.target.value)
                            } />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={
                                (s) => setPassword(s.target.value)
                            } />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={
                                (s) => setEmail(s.target.value)
                            } />
                        <Button type="submit"
                            onClick={signUp} > Sign Up </Button>
                    </form >
                    <h2> @ Subash Private Limited </h2>
                </div >
            </Modal >

            <Modal
                open={openSignIn}
                onClose={() => setOpen(false)}>

                <div style={modalStyle} className={classes.paper}>
                    <form className="app_signup">
                        <center>
                            <img
                                className="app_headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                                alt=""
                            />
                        </center>
                        <Input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(s) => setPassword(s.target.value)} />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(s) => setEmail(s.target.value)} />
                        <Button type="submit" onClick={signIn}> Sign In </Button>
                    </form >
                    <h2> @ Subash Private Limited </h2>
                </div >
            </Modal>===-


            <div className="app_header" >
                <img
                    className="app_headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
                    alt=""
                />
            </div >

            {user ? (
                <Button onClick={() => auth.signOut()}> Logout </Button>
            ) :
                (
                    <div className="app_loginContainer" >
                        <Button type="submit" onClick={setOpenSignIn}> Sign In </Button>
                        <Button type="submit" onClick={signUp}> Sign Up </Button>
                    </div>
                )
            }

            <h1> Hello Subash_Vishal!!!Welcome to Instagram clone </h1>

            {
                posts.map(({ id, post }) => (<
                    Post key={id}
                    caption={post.caption}
                    username={post.username}
                    imageUrl={post.imageUrl}
                />
                ))
            }
        </div>
    );
}

export default App;