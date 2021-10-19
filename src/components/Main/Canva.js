import styled from 'styled-components';
import { motion } from 'framer-motion';

import Statement from './Statement';
import Header from './Header';

export default function Canva() {
    return (
        <CanvaContainer>
            <Header />
            <Statement />

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