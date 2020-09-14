const initialState = { token: '', user: '', isLoggedIn: false }

export const tokenReducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case "SET_TOKEN":
            return { token: payload.token, user: payload.user, isLoggedIn: true }
        default:
            return state
    }
}