import { useState } from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';


export default function BodyLayout(props) {
    const [ isClicked, setIsClicked ] = useState(false);
    const [ buttonClicked, setButtonClicked ] = useState(false);
    const [ buttonSelected, setButtonSelected ] = useState();

    const [ value, setValue ] = useState();
    const [ description, setDescription ] = useState("");

    return (
        <BodyLayoutContainer>
            <FormContainer
                whileHover={{ backgroundColor: "rgba(140, 37, 190, 0.9)" }}
                whileFocus={{ backgroundColor: "rgba(140, 37, 190, 0.9)" }}
                initial="unactive"
                animate={buttonClicked ? "active" : "unactive"}
                variants={FormVariants}
            >
                <p>{buttonSelected ? "New Credit" : "New Debit"}</p>
                <input 
                    type="text"
                    placeholder="Value"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button>Save</button>

                <div className="ico-container" onClick={() => {
                    setButtonClicked(false)
                }}>
                    <MdKeyboardArrowDown size={40} color="#fff"/>
                </div>
            </FormContainer>
            <StatementContainer
                onClick={() => {
                    if(!buttonClicked) {
                        setIsClicked(prevState => setIsClicked(!prevState))
                    }
                }}
                initial={{
                    opacity: 0
                }}
                animate={isClicked ? "clicked" : "notClicked"}
                variants={variants}
            >

            </StatementContainer>

            <StatementButtonContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
            <Button
                onClick={() => {
                    setButtonClicked(prevState => !prevState)
                    setButtonSelected(1)
                }}
            >
                <FiPlusCircle size={20} color="#fff"/>
                <p>New Credit</p>
            </Button>
            <Button
                onClick={() => {
                    setButtonClicked(prevState => !prevState)
                    setButtonSelected(0)
                }}
            >
                <FiMinusCircle size={20} color="#fff"/>
                <p>New Debit</p>
            </Button>
            </StatementButtonContainer>
        </BodyLayoutContainer>
    )
}

const FormVariants = {
    active: {
        height: "80vh",
        opacity: 1,
        padding: "20px"
    },
    unactive: {
        height: "0px",
        opacity: 0,
        padding: 0,
    }
}

const variants = {
    clicked: {
        height: "calc(100vh - 125px)",
        opacity: 1,
        overflow: "auto",
    },
    notClicked: {
        height: "400px",
        width: "100%",
        innerHeight: "450px",
        opacity: 1,
        overflow: "hidden",
        marginBottom: "110px"
    }
}

const FormContainer = styled(motion.div)`
    width: 100%;
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    background-color: rgba(140, 37, 190);
    background-color: rgba(140, 37, 190, 0.85);
    border-radius: 20px 20px 0px 0px;
    border-top: 3px solid #7700b2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    p {
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 80px;
        height: 20px;
        border-top: 4px solid #fff;
        padding-top: 20px;
    }

    input {
        width: 330px;
        height: 55px;
        border: none;
        outline: none;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 5px;
        font-size: 18px;
    }

    button {
        border: none;
        outline: none;
        height: 46px;
        width: 330px;
        max-width: 350px;
        font-family: 'Raleway', sans-serif;
        border-radius: 5px;
        background-color: #8C25BE;
        font-size: 17px;
        color: #fff;
        font-weight: bolder;
        margin: 5px 0px;
        cursor: pointer;
        border: 1px solid #fff;
    }

    .ico-container {
        width: 100%;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #7700b2;
        bottom: 40px;
        left: 40px;
        cursor: pointer;
    }
`

const BodyLayoutContainer = styled.div`
    width: calc(100vw - 40px);
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StatementContainer = styled(motion.div)`
    background-color: #fff;
    height: 400px;
    width: 100%;
    border-radius: 5px;
    padding: 20px 10px 10px 10px;
    cursor: pointer;
`

const StatementButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;
`

const Button = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 48%;
    height: 115px;
    background-color: #A32BD6;
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;

    p {
        color: #fff;
        max-width: 45px;
        word-wrap: nowrap;
        font-weight: 700;
        line-height: 20px;
    }
`