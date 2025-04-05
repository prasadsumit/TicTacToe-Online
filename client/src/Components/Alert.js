import React, { useEffect, useState } from 'react'
import '../Css/Alert.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert } from '../Actions/Actions'

const Alert = () => {
    const [ exiting, setExiting ] = useState(false)
    const dispatch = useDispatch()
    const alertOptions = useSelector((state) => {
        return state.alertOptions
    })
    const message = alertOptions.message
    const dismissAfter = alertOptions.dismissAfter
    const isInteractive = alertOptions.interactive
    const okAction = alertOptions.action

    // Auto-dismiss if dismissAfter is provided
    useEffect(() => {
        if (!isInteractive && dismissAfter) {
            const timer = setTimeout(() => {
                setExiting(true)
                dispatch(closeAlert())
                setTimeout(() => {
                    okAction && okAction()
                }, 300) // match exit animation
            }, dismissAfter)
            return () => {
                return clearTimeout(timer)
            }
        }
        return () => {}
    }, [ dismissAfter, okAction ])

    const handleClose = (action) => {
        setExiting(true)
        setTimeout(() => {
            action && action()
        }, 300)
    }
    const onCancel = () => {
        console.log('Cancel clicked')
        dispatch(closeAlert())
    }


    return (
        <div className={`alert-box ${exiting ? 'alert-exit' : 'alert-enter'}`}>
            <p className="alert-message">{message}</p>

            {!dismissAfter &&
				<div className="alert-buttons">
				    <button className="alert-button ok" onClick={() => {
				        return handleClose(okAction)
				    }}>
						OK
				    </button>
				    <button className="alert-button cancel" onClick={() => {
				        return handleClose(onCancel)
				    }}>
						Cancel
				    </button>
				</div>
            }
        </div>
    )
}

export default Alert
