

export const presupReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRESUPUESTO':
            return {
                ...state,
                presupuesto: action.payload
            }
        case 'UPDATE_PRESUPUESTO':
            return {
                ...state,
                presupuesto: {
                    ...state.presupuesto,
                    [action.payload.key]: action.payload.value
                }
            }
        case 'LOAD_PRESUPUESTO':
            return {
                ...state,
                presupuesto: action.payload
            }
        case 'SAVE_PRESUPUESTO':
            return {
                ...state,
                presupuesto: action.payload
            }
        case 'RESET_PRESUPUESTO':
            return {
                ...state,
                presupuesto: action.payload
            }
        case 'SET_CUSTOMER_DATA':
            return {
                ...state,
                presupuesto: {
                    ...state.presupuesto,
                    customer: {
                        ...state.presupuesto.customer,
                        [action.payload.key]: action.payload.value
                    }
                }
            }
        default:
            return state
    }
}