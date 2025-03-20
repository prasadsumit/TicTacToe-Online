import React, { useEffect, useState } from 'react'
import TextComponent from '../Components/TextComponent'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import SideBarComponent from '../Components/SidebarComponent'
import RoomAccessWidget from '../Components/RoomAccessWidget'
import InputModal from '../Components/InputModal'
import { useDispatch, useSelector } from 'react-redux'
import { initUserInfo, showInputModal } from '../Actions/Actions'


function Homepage() {
    const pageTitle = 'tic-tac-toe'

    const pageStyle = {
        padding: '4rem',
    }
    const navBarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    }
    const subPageStyle = {
        padding: '100px',
        display: 'flex',
        justifyContent: 'center',
        gap: '400px',
        marginTop: '100px',
    }
    const titleStyle = {
        fontSize: '20px',
        margin: '0',
        padding: '16px 0',
    }
    const navElementsStyle = {
        fontSize: '20px',
        margin: '0',
        padding: '16px',
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUserInfo())
    }, [])

    let userInfo = useSelector((state) => {
        return state.userInfo
    })
    let isInputModalOpen = useSelector((state) => {
        return state.inputModal.showInputModal
    })

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            // Close the modal when clicking the overlay
            dispatch(showInputModal(false, null))
        }
    }

    return (
        <div style={pageStyle}>
            <ModalWrapper />
            <div>
                {
                    isInputModalOpen ?
                        <InputModal modalText={'Enter Username:'} handleOverlayClick={handleOverlayClick}/> : <div></div>
                }
            </div>
            <div style={navBarStyle}>
                <TextComponent value={pageTitle} style={titleStyle}/>
                <div style={{ background:'white', borderRadius:'4px', gap:'10px', display:'flex' }}>
                    <TextComponent id={'username'} value={userInfo.name} style={navElementsStyle}/>
                    <TextComponent id={'player-uuid'} value={userInfo.id} style={navElementsStyle}/>
                </div>
            </div>
            <div style={subPageStyle}>
                <BoardComponent/>
                <RoomAccessWidget />
            </div>
            <SideBarComponent />
        </div>
    )
}

export default Homepage
