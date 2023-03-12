import { Palatte } from "components/Palattes"
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setModalVisible } from "store/slices/images-slice"
import styled from "styled-components"
import { colourPalattes } from "constants/index"
import { Button } from ".."
import { close_icon_svg } from "assets/index"
import { BoardsContext } from "context/index"

const palattes = Object.fromEntries(
    Object.entries(colourPalattes).filter(([key]) => key !== "A1")
)

export const SettingModal = () => {
    const [active, setActive] = useState()
    const { boards, setBoards } = useContext(BoardsContext)
    const { modalVisibility, columnDetail } = useSelector(state => state.images)

    const dispatch = useDispatch();
    const ref = useRef()

    useEffect(() => {
        const defaultValue = async () => {
            ref.current.value = columnDetail.value
        }
        defaultValue()
    }, [modalVisibility])

    const handleClose = (e) => {
        const id = e.target.id
        if (id === "container" || id === "close_icon") {
            dispatch(setModalVisible(false))

        }
    }

    const columnColourHandler = (colour) => {
        setActive(colour)
        setBoards(boards.map((item) => {
            if (item.id === columnDetail?.id)
                return { ...columnDetail, bgColor: colour }
            return item
        }))
    }

    return (
        <>
            <ModalContainer id="container" show={modalVisibility} onClick={(e) => handleClose(e)}>
                <Modal onClick={handleClose}>
                    <img src={close_icon_svg} alt="close_icon_svg" id="close_icon" onClick={(e) => handleClose(e)} />
                    <PalatteContainer>
                        <span>Choose a Label Background Color:</span>
                        <div>
                            <Palatte func={columnColourHandler} active={active} isBlack={"#000000"} palattes={palattes ?? {}} />
                        </div>
                        <h3>Edit Label Text Below:</h3>
                        <textarea name="board_name" id="board_name" cols="30" rows="2" ref={ref}></textarea>
                        <ButtonsContainer>
                            <Button value="Delete Row" isGray />
                            <Button value="Clear Row Images" isGray />
                            <Button value="Add a Row Above" isGray />
                            <Button value="Add a Row Below" isGray />
                        </ButtonsContainer>
                    </PalatteContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    button{
        margin-bottom: .6rem;
        max-width: 300px;
        font-size: .9rem;
    }

`
const PalatteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:1.2rem;

    span:first-child{
        font-size: 1.25rem;
        font-weight: 700;
    }

    div{
        display: flex;
        gap:0.6rem;
        margin-bottom: .2rem;
    }

    h3{
        margin-top: 0.5rem;
        font-size: 1.25rem;
    }

    textarea{
        margin-top: -1.5rem;
        width: 100%;
        max-height: 45px;
        border: 1px solid #f1f1f1;
        font-size: 1rem;
        padding: .3rem;
    }

`
const Modal = styled.div`
    position: fixed;
    margin: 0 auto;
    min-height: 325px;
    max-height: 325px;
    left: 50%;
    transform: translateX(-50%);
    width: 713px;
    background: #ffffff;
    color: #333333;
    padding: 1.4rem 1.7rem;

    img{
        position: absolute;
        right: 1rem;
        top: 1rem;
        width: 17px;
        cursor: pointer;
    }
`
const ModalContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    z-index: 4;
    background-color: #000000c8;
    position: absolute;
    transition: all .35s;
    left: 0;
    top: 0;
    opacity: ${({ show }) => show ? "1" : "0"};
    visibility: ${({ show }) => show ? "visible" : "hidden"};
    
`