let initialState = null

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'auth/login': {
            return action.payload;
        }
        case 'auth/logout': {
            return null;
        }
        default: {
            return state;
        }
    }
}