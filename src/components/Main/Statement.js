import { useState } from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion';


export default function Statement(props) {
    const [ isClicked, setIsClicked ] = useState(false);


    return (
        <StatementContainer 
            onClick={() => {
                setIsClicked(prevState => setIsClicked(!prevState))
            }}
            initial={{
                opacity: 0
            }}
            animate={isClicked ? "clicked" : "notClicked"}
            variants={variants}
        >

        </StatementContainer>
    )
}

const variants = {
    clicked: {
        height: "calc(100vh - 125px)",
        opacity: 1,
        overflow: "auto"
    },
    notClicked: {
        height: "400px",
        width: "100%",
        innerHeight: "450px",
        opacity: 1,
        overflow: "hidden"
    }
}

const StatementContainer = styled(motion.div)`
    background-color: #fff;
    height: 400px;
    width: 100%;
    border-radius: 5px;
    padding: 20px 10px 10px 10px;
    cursor: pointer;
`