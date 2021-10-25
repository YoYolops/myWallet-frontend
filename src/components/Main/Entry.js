import styled from "styled-components"

export default function Entry(props) {
    const {
        date,
        description,
        value
    } = props.entry

    function parseValueToString(priceInt) {
        const stringedInt = priceInt.toString();
        let centsSlice = ""; // two last numbers represent the cents
        let intSlice = ""; // the other numbers represents the interger part of the value
    
        for(let i = 0; i < stringedInt.length; i++) {
            if(i >= stringedInt.length - 2) {
                centsSlice += stringedInt[i]
            } else {
                intSlice += stringedInt[i]
            }
        }
    
        return intSlice + "," + centsSlice;
    }

    function valueColorizer() {
        if(value < 0) {
            return 'red'
        }
        return "green"
    }

    function formatDate(date) {
        const splitted = date.split("-");
        const newDate = splitted[2] + "/" + splitted[1];
        return newDate
    }

    return (
        <EntryContainer>
            <Date>{formatDate(date)}</Date>
            <Description>{description}</Description>
            <Value colorize={valueColorizer()}>{parseValueToString(value)}</Value>
        </EntryContainer>
    )
}

const EntryContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font: 16px;
    margin-bottom: 15px;
`

const Date = styled.p`
    color: #C6C6C6;
    padding: 0px 2px;
`

const Description = styled.p`
    color: black;
    padding: 0px 2px;
    width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 20px;
`

const Value = styled.div`
    color: ${ props => props.colorize === 'red' ? "#C71900" : "#03AC04"};
    padding: 0px 2px;
`