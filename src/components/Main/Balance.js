import { useEffect, useState } from 'react';
import styled from "styled-components"
import { valueColorizer, parseValueToString } from "../../utils/utils";

export default function Balance({ entries, entriesLength }) {
    const [ value, setValue ] = useState(0);

    useEffect(() => {
        let sum = 0
        for(const entry of entries) {
            sum += entry.value
        }
        setValue(sum)
    }, [setValue, entries])

    return (
        <BalanceContainer shouldRender={entriesLength}>
            <p>BALANCE:</p>
            <Value colorize={valueColorizer(value)} >{parseValueToString(value)}</Value>
        </BalanceContainer>
    )
}

const BalanceContainer = styled.div`
    display: ${props => props.shouldRender ? "flex" : 'none'};
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    padding: 7px 0px 7px 0px;
    border-bottom: 2px solid #8C11BE;

    p {
        color: black;
        font-weight: bolder;
    }
`

const Value = styled.div`
    color: ${ props => props.colorize === 'red' ? "#C71900" : "#03AC04"};
    padding: 0px 2px;
`