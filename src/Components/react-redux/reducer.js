
const initialState={
    showDetails:null,
    }
export const showDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SHOW_DETAILS_SUCCESS':
        return {
          ...state,
          showDetails: action.payload,
          error: null,
        }
        default:return state
    }
    
}