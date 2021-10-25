import { useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AppContext from '../context/AppContext';
import { useHistory } from 'react-router';

import BodyLayout from './BodyLayout';
import Header from './Header';

export default function Canva() {
    const history = useHistory();
    const { userData } = useContext(AppContext);

    useLayoutEffect(() => {
        if(!userData) history.push("/")
    }, [history, userData])

    return (
        <CanvaContainer>
            <Header />
            <BodyLayout />
        </CanvaContainer>
    )
}

const CanvaContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    min-height: 100vh;
`