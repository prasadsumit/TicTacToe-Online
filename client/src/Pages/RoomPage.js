import React, { useEffect } from 'react'
import TextComponent from '../Components/TextComponent'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import SideBarComponent from '../Components/SidebarComponent'
import Lobby from '../Components/Lobby'
import JoinRoomComponent from '../Components/JoinRoomComponent'
import InputModal from '../Components/InputModal'
import { useDispatch, useSelector } from 'react-redux'
import { initUserInfo } from '../Actions/Actions'


function RoomPage() {
    const pageTitle = 'tic-tac-toe'

    const pageStyle = {
        padding: '4rem',
    }
    const subPageStyle = {
        padding: '100px',
        display: 'flex',
        justifyContent: 'center',
        gap: '400px',
        marginTop: '100px',
    }
    const navBarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
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

    const players = [
        { name: 'radioMAN', wins: 3, draws: 0, losses: 1, selected: false },
        { name: 'divinE', wins: 1, draws: 0, losses: 3, selected: true },
    ]

    const invitePlayersConfig = {
        info: 'Invite a friend to this room: ',
        placeholder: '#fghajdjh',
        buttonText: 'Copy',
        onClick: () => {
            alert('Copied to clipboard!')
        },
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUserInfo())
    }, [])

    let userInfo = useSelector((state) => {
        return state.userInfo
    })
    let isInputModalOpen = useSelector((state) => {
        return state.showInputModal
    })

    return (
        <div style={pageStyle}>
            <ModalWrapper />
            <div style={navBarStyle}>
                <TextComponent value={pageTitle} style={titleStyle}/>
                <div style={{ background: 'white', borderRadius: '4px', gap: '10px', display: 'flex' }}>
                    <TextComponent id={'username'} value={userInfo.name} style={navElementsStyle}/>
                    <TextComponent id={'player-uuid'} value={userInfo.id} style={navElementsStyle}/>
                </div>
            </div>
            <div style={subPageStyle}>
                <BoardComponent/>
                <div>
                    <Lobby lobbyNumber={1} players={players}/>
                    <JoinRoomComponent config={invitePlayersConfig}/>
                </div>
            </div>
            <SideBarComponent/>
        </div>
    )
}

export default RoomPage
