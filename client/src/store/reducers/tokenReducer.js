const initialState = { token: '' }

export const tokenReducer = (state = initialState, action) => {
    const { token, type } = action
    switch (type) {
        case "SET_TOKEN":
            return { token: token }
        default:
            return state
    }
}