import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

import * as types from './actionType';

export const fetchProtectedDataSuccess = data => ({
    type: types.FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const fetchProtectedDataError = error => ({
    type: types.FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};