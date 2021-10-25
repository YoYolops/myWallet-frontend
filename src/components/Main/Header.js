import { useContext, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { BiExit } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { logout } from '../../services/auth';
import AppContext from "../context/AppContext";

export default function Header() {
    const [ showExitBanner, setShowExitBanner ] = useState(false);
    const { userData, resetApp } = useContext(AppContext);

    function toggleExitBanner() {
        setShowExitBanner(prevState => !prevState)
    }

   function signOut() {
        logout(userData.token);
        resetApp();
    }

    return (
        <HeaderContainer>
            <AnimateSharedLayout>{
                showExitBanner
                    ? (
                        <Head layout
                            variants={variants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={true}
                        >
                            <motion.button
                                whileTap={{ scale: .95 }}
                                onClick={signOut}
                            >
                                Exit
                            </motion.button>
                            <IoIosCloseCircleOutline size={25} color="#fff" onClick={toggleExitBanner}/>
                        </Head>)
                    : (
                        <Head layout
                            variants={variants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={false}
                        >
                            <p>Hi, Fulano</p>
                            <BiExit size={25} color="#fff"onClick={toggleExitBanner}/>
                        </Head>)
            }</AnimateSharedLayout>
        </HeaderContainer>
    )
}

const variants = {
    initial: {
        y: -100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: 30,
        opacity: 0,
    }
}

const HeaderContainer = styled(motion.header)`
    display: flex;
    color: #fff;
    width: 100%;
    max-width: 1000px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 25px;

    p {
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 200px;
    }
`

const Head = styled(motion.div)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        border: none;
        outline: none;
        width: 80px;
        border-radius: 3px;
        height: 25px;
        background-color: #E02828;
        color: #fff;
        font-weight: 700;
        font-size: 18px;
    }

    svg {
        cursor: pointer;
    }
`