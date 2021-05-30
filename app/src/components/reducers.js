import { baseUrl } from './App'
import { getCsrf } from './utils'

export {userReducer}

const userReducer = (context, action) => {
    switch(action.type) {
        case 'fetchCurrentUser':
            return [
                `${baseUrl}/api/auth/current_user/`,{
                    method: 'GET'
                }
            ]
        case 'login':
            return [
                `${baseUrl}/api/auth/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
        case 'register':
            return [
                `${baseUrl}/api/auth/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
        case 'activate':
            return [
                `${baseUrl}/api/auth/activate/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrf()
                    },
                    body: JSON.stringify(action.data)
                }
            ]
    }  
}