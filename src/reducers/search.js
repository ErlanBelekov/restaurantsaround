const initialState = {
    searching:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_BEGIN":
            return {
                ...state,
                searching:true
            };
        case "SEARCH_END":
            return {
                ...state,
                searching:false
            };
        default:
            return state;
    }
}
