import { useEffect, useState } from 'react'
import TextComponent from '../Components/TextComponent'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import RoomAccessWidget from '../Components/RoomAccessWidget'
import RoomDetailsWidget from '../Components/RoomDetailsWidget'
import InputModal from '../Components/InputModal'
import { useDispatch, useSelector } from 'react-redux'
import { showInputModal, updateRoom } from '../Actions/Actions'
import { useParams } from 'react-router-dom'
import Alert from '../Components/Alert'


function Homepage(props) {
    const pageTitle = 'tic-tac-toe'
    const pageSubTitle = 'Play with friends in real time.'
    const [ device, setDevice ] = useState('desktop')
    const dispatch = useDispatch()
    const { roomId } = useParams()
    const room = useSelector((state) => {
        return state.room
    })
    const showAlert = useSelector((state) => {
        return state.alertOptions.visible
    })
    // Add resize listener
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth
            if (screenWidth <= 600) {
                setDevice('mobile')
            } else if (screenWidth <= 800) {
                setDevice('tablet')
            } else if (screenWidth <= 1200) {
                setDevice('laptop')
            } else {
                setDevice('desktop')
            }
        }

        // Initial check
        handleResize()

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            return window.removeEventListener('resize', handleResize)
        }
    }, [])


    const pageStyle = {
        padding: '1rem',
        boxSizing: 'border-box'
    }

    const navBarStyle = {
        gap: device === 'mobile' ? '1rem' : '0',
        alignItems: 'center',
    }

    const subPageStyle = {
        padding: device === 'mobile' ? '1rem 0' :
            device === 'tablet' ? '2rem 0' :
                '100px',
        display: 'flex',
        flexDirection: device === 'desktop' ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: device === 'mobile' ? '0.5rem' :
            device === 'tablet' ? '1rem' :
                '4rem',
        width: '100%',
        boxSizing: 'border-box',
    }

    const subPageElement = {
        transform: device === 'mobile' ? 'scale(0.60)' :
            device === 'tablet' ? 'scale(0.75)' : 'scale(0.8)'
    }

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: 0,
        padding: '16px 0',
        textAlign: 'center'
    }
    const subTitleStyle = {
        fontSize: '1rem',
        margin: 0,
        textAlign: 'center'
    }

    let userInfo = sessionStorage.getItem('userInfo')
    useEffect(() => {
        if(userInfo) {
            dispatch(updateRoom(roomId))
        }
    }, [ userInfo ])

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
            <ModalWrapper/>
            <div>
                {isInputModalOpen &&
                    <InputModal modalText={'Enter Username:'} handleOverlayClick={handleOverlayClick}/>}
            </div>
            <div>
                {showAlert &&
                    <Alert />
                }
            </div>
            <div style={navBarStyle}>
                <TextComponent value={pageTitle} style={titleStyle}/>
                <TextComponent value={pageSubTitle} style={subTitleStyle}/>
            </div>
            <div style={subPageStyle}>
                <BoardComponent style={subPageElement}/>
                {userInfo && room ? <RoomDetailsWidget room={room} userInfo={userInfo}/> :
                    <RoomAccessWidget/>
                }
            </div>
        </div>
    )
}

export default Homepage
