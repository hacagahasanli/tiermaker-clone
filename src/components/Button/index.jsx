import styled, { css } from "styled-components"

export const MainButton = ({ value }) => {
    return <MButton>{value}</MButton>
}

export const Button = ({ value }) => {
    return <SButton>{value}</SButton>
}

const sameStyles = css`
    text-align: center;
    border-radius: 5px;
    padding:10px 0;
    cursor: pointer;
    transition: opacity 0.5s;
`

const SButton = styled.button`
    max-width: 250px;
    width: 100%;
    ${sameStyles}
    border: none;
    outline: none;
    background-color: #ffffff;
    &:hover{
        opacity: 0.8;
    }
`

const MButton = styled.button`
    border: 1px solid #ffffff;
    background:#314A7E;
    color: #ffffff;
    max-width: 280px;
    width: 100%;
    ${sameStyles}
`