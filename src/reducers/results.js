const initialState = {
    results: [],
    fetched: false,
    city:''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "RESULTS_FETCHED":
            return {
                ...state,
                results:action.payload,
                fetched:true
            };
        case "REFRESH_FETCHED":
            return {
                ...state,
                results:[],
                fetched:false
            }
        case "RESULTS_FETCH_ERROR":
            return {
                ...state
            };
        default:
            return state;
    }
}
