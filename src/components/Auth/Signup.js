import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AUTH from '../../services/auth';

export default function Signup(props) {
    const [ name, setname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");

    async function signUp() {
        if(password !== passwordConfirmation) {
            alert("Password is not equal to password confirmation")
            setPassword("")
            setPasswordConfirmation("")
        }
        const isRegistered = await AUTH.register(name, email, password);
        if(isRegistered) {
            props.toggle()
            return;
        }
        console.log("Não pude registrar")
    }

    return (
        <SignupContainer
            layout
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 1 }}
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
                type="text"
                placeholder="Name"
                onChange={ e => setname(e.target.value) }
                value={name}
            />
            <input 
                type="text"
                placeholder="E-mail"
                onChange={ e => setEmail(e.target.value) }
                value={email}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={ e => setPassword(e.target.value) }
                value={password}
            />
            <input 
                type="password"
                placeholder="Confirm password"
                onChange={ e => setPasswordConfirmation(e.target.value) }
                value={passwordConfirmation}
            />
            <button className="signer" onClick={signUp}>
                Sign up
            </button>

            <button className="toggler" onClick={props.toggle}>
                {props.btText}
            </button>
        </SignupContainer>
    )
}

const SignupContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;

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