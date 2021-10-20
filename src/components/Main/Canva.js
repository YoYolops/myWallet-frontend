import styled from 'styled-components';
import { motion } from 'framer-motion';

import BodyLayout from './BodyLayout';
import Header from './Header';

export default function Canva() {
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