import { baseUrl } from './App'
import { getCsrf } from './utils'

export {userReducer}

const userReducer = (state, action) => {
    let stateWrapper = {}
    switch(action.type) {
        case 'fetchCurrentUser':
            stateWrapper.context = [
                `${baseUrl}/api/auth/current_user/`,{
                    method: 'GET'
                }
            ]
            break
        case 'login':
            stateWrapper.context = [
                `${baseUrl}/api/auth/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
            break
        case 'register':
            stateWrapper.context = [
                `${baseUrl}/api/auth/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
            break
        case 'activate':
            console.log(action)
            stateWrapper.context = [
                `${baseUrl}/api/auth/activate/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
            stateWrapper.timestamp = new Date
            break
    }
    if ('perform' in action) stateWrapper.perform = action.perform
    if ('performError' in action) stateWrapper.performError = action.performError

    return stateWrapper
}

