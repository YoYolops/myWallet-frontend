import styled from "styled-components";
import { valueColorizer, parseValueToString } from "../../utils/utils";

export default function Entry(props) {
    const {
        date,
        description,
        value
    } = props.entry

    function formatDate(date) {
        const splitted = date.split("-");
        const newDate = splitted[2] + "/" + splitted[1];
        return newDate
    }

    return (
        <EntryContainer>
            <Date>{formatDate(date)}</Date>
            <Description>{description}</Description>
            <Value colorize={valueColorizer(value)}>
                {parseValueToString(value)}
            </Value>
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
    width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 20px;
`

const Value = styled.div`
    color: ${ props => props.colorize === 'red' ? "#C71900" : "#03AC04"};
    padding: 0px 2px;
`