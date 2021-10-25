import { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { getEntries } from '../../services/entries';
import AppContext from '../context/AppContext';
import Spinner from '../Spinner';
import Entry from './Entry';
import { registerEntry } from '../../services/entries';
import Balance from './Balance';


export default function BodyLayout(props) {
    const { userData, setEntries, entries } = useContext(AppContext)
    const [ isClicked, setIsClicked ] = useState(false);
    const [ buttonClicked, setButtonClicked ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ buttonSelected, setButtonSelected ] = useState(false);
    const [ rerender, setRerender ] = useState(false);

    const [ value, setValue ] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        let unmounted = false;

        if(userData) {
            if(!unmounted) setIsLoading(true);
            getEntries(userData.token)
                .then(resp => {
                    if(!unmounted) {
                        setEntries(resp)
                        setIsLoading(false)
                    }
                })
        }
        return () => unmounted = true;
    }, [userData, setEntries, rerender])

    async function submitEntry(type) {
        if(value === "" || description.trim() === "") {
            alert("Insira valores válidos")
            return;
        }

        if(type) {
            const body = {
                value: value*100,
                description
            }
            console.log(body)
            await registerEntry(userData.token, body)
        } else {
            const body = {
                value: ((100*value)*-1),
                description
            }

            console.log(body)
            await registerEntry(userData.token, body)
        }
        setRerender(prevState => !prevState)
        setValue("")
        setDescription("")
        setButtonClicked(false)
    }

    return (
        <BodyLayoutContainer>
            <FormContainer
                initial="unactive"
                animate={buttonClicked ? "active" : "unactive"}
                variants={FormVariants}
            >
                <p>{buttonSelected ? "New Credit" : "New Debit"}</p>
                <input 
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Value"
                    value={value}
                    onChange={e => {
                        setValue(Number(e.target.value))
                    }}
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    onClick={() => {submitEntry(buttonSelected)}}
                >Save</button>

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
                entries={entries}
                positioning={buttonClicked ? 'unset' : "relative"}
            >{
                isLoading
                    ? <Spinner />
                    : !entries.length
                        ? <p className="warning">There is no entries registered yet, register some to get started</p>
                        : entries.map(entry => {
                            return <Entry key={entry.id} entry={entry} />
                        })
            }
                <Balance entries={entries} buttonClicked={buttonClicked} />
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
        height: "100vh",
        opacity: 1,
        padding: "40px 30px"
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    p {
        color: #fff;
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 60px;
        height: 20px;
        width: 100%;
        text-align: left;
    }

    input {
        width: 100%;
        max-width: 400px;
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
        width: 100%;
        max-width: 400px;
        font-family: 'Raleway', sans-serif;
        border-radius: 5px;
        background-color: #A328D6;
        font-size: 17px;
        color: #fff;
        font-weight: bolder;
        margin: 5px 0px;
        cursor: pointer;
    }

    .ico-container {
        width: 100%;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #7700b2;
        bottom: 60px;
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
    padding: 30px 10px 10px 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.entries.length ? 'flex-start' : 'center'};
    align-items: center;
    position: ${props => props.positioning};

    .warning {
        color: #868686;
        font-size: 20px;
        text-align: center;
    }
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