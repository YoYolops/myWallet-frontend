import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import { login } from '../../services/auth'
import AppContext from '../context/AppContext';
import Spinner from '../Spinner';

export default function Login(props) {
    const history = useHistory();
    const { setUserData, storeUserDataLocally } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(false);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    async function signIn() {
        setIsLoading(true);
        const response = await login(email, password);
        if(!response) alert("Wrong email or password")
        if(response) {
            storeUserDataLocally(response);
            setUserData(response);
            history.push("/main");
            return;
        }
        setPassword("");
        setIsLoading(false)
    }

    return (
        <LoginContainer
            layout
            initial={{ x: 300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 1 }}
            transition={{
                x: {
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                }
            }}
        >
            <Title>MyWallet</Title>
            <input 
                type="email"
                placeholder="E-mail"
                onChange={ e => setEmail(e.target.value) }
                disabled={isLoading}
                value={email}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={ e => setPassword(e.target.value) }
                disabled={isLoading}
                value={password}
            />
            <button className="signer" onClick={signIn}>{
                isLoading
                    ? <Spinner color="#fff"/>
                    : "Sign in"
            }</button>

            <button className="toggler" onClick={props.toggle}>
                {props.btText}
            </button>
        </LoginContainer>
    )
}

const LoginContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    overflow: hidden;

    input {
        height: 58px;
        width: 100%;
        border-radius: 5px;
        border: none;
        outline: none;
        margin: 7px 0px;
        padding: 15px;
        font-size: 20px;
        max-width: 350px;
    }

    .signer {
        border: none;
        outline: none;
        height: 46px;
        width: 100%;
        max-width: 350px;
        font-family: 'Raleway', sans-serif;
        border-radius: 5px;
        background-color: #A328D6;
        font-size: 17px;
        color: #fff;
        font-weight: bolder;
        margin: 5px 0px;
        cursor: pointer;
    }

    .toggler {
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        margin-top: 20px;
        cursor: pointer;
        background-color: inherit;
        border: none;
        outline: none;
    }
`

const Title = styled.h1`
    color: #fff;
    font-size: 32px;
    width: 100%;
    text-align: center;
    font-family: 'Saira Stencil One', cursive;
    margin-bottom: 20px;
`