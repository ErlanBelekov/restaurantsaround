export const fetched = data => ({
    type:"RESULTS_FETCHED",
    payload: data
});

export const refreshFetched = () => ({
    type:"REFRESH_FETCHED"
})

export const fetchErr = err => ({
    type:"RESULTS_FETCH_ERROR",
    payload:err
});
