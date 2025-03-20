import ActionTypes from '../Actions/ActionTypes'
import initialState from '../Store/initialState'
import { v4 as uuidv4 } from 'uuid'


const intitialUserInfo = initialState.userInfo

const userInfoReducer = (state = intitialUserInfo, action) => {
    switch (action.type) {
    case ActionTypes.UPDATE_USERINFO: {
        if(state.name === '') {
            let uuid = uuidv4()
            sessionStorage.setItem('userInfo', JSON.stringify({ name: action.payload.userName, id: uuid }))
            return {
                name: action.payload.userName,
                id: uuid
            }
        }
        return state
    }
    case ActionTypes.INIT_USERINFO: {
        let userInfo = sessionStorage.getItem('userInfo')
        if(state.name === '' && userInfo !== null) {
            sessionStorage.setItem('userInfo', userInfo)
            return JSON.parse(userInfo)
        }
        return state
    }

    default:
        return state
    }
}

export default userInfoReducer
