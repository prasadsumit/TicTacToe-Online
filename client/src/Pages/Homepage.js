import React from 'react'
import GridComponent from '../Components/GridComponent'
import TextComponent from '../Components/TextComponent'
import { useSelector } from 'react-redux'
import ModalWrapper from '../Components/ModalWrapper'
import BoardComponent from '../Components/BoardComponent'
import PlaceHolderComponent from '../Components/PlaceHolderComponent'


function Homepage() {
    const player = useSelector((state) => {
        return state.player
    })
    const pageTitle = 'tic-tac-toe'

    const pageStyle = {
        padding: '4rem',
    }
    const subPageStyle = {
        'padding': '100px',
        'display': 'flex',
        'justifyContent': 'center',
        'gap': '400px',
        'margin-top': '100px',
    }
    const padding = '1rem'
    const titleSize = '1.25rem'

    return (
        <div style={pageStyle}>
            {/* <GridComponent />*/}
            {/* <TextComponent value={`Player ${player} turn`} />*/}
            {/* <ModalWrapper />*/}

            <TextComponent value={pageTitle} padding={padding} size={titleSize}/>
            <div style={subPageStyle}>
                <BoardComponent />
                <PlaceHolderComponent />
            </div>

        </div>
    )
}

export default Homepage
