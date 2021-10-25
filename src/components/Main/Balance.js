import { useEffect, useState } from 'react';
import styled from "styled-components"
import { valueColorizer, parseValueToString } from "../../utils/utils";

export default function Balance({ entries, buttonClicked }) {
    const [ value, setValue ] = useState(0);

    useEffect(() => {
        let sum = 0
        for(const entry of entries) {
            sum += entry.value
        }
        setValue(sum)
    }, [setValue, entries])

    return (
        <BalanceContainer textColor={buttonClicked ? "#fff" : "black"}>
            <p>SALDO</p>
            <Value colorize={valueColorizer(value)} buttonClicked={buttonClicked}>
                {parseValueToString(value)}
            </Value>
        </BalanceContainer>
    )
}

const BalanceContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: space-between;
    width: 100%;
    padding: 10px 15px;
    font-weight: bolder;

    p {
        color: ${props => props.textColor};
        font-weight: bolder;
    }
`

const Value = styled.div`
    color: ${ props => (
        props.buttonClicked
            ? "#fff"
            : props.colorize === 'red' ? "#C71900" : "#03AC04")};
    padding: 0px 2px;
`