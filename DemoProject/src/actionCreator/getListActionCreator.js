import * as actionTypes from '../action';
import {hitGetAPI} from '../network/server';

export const getListRequest = () => {
  return {
    type: actionTypes.GET_DATA_REQUEST,
  };
};

export const getListSuccess = (json) => {
  return {
    type: actionTypes.GET_DATA_SUCCESS,
    value: json,
  };
};

export const getListFailure = (_err) => {
  return {
    type: actionTypes.GET_DATA_FAILURE,
  };
};

export const getListApiIntegrationMethod = (URL) => {
  return (dispatch, _getState) => {
    dispatch(getListRequest());
    hitGetAPI(URL)
      .then(([response, json]) => {
        dispatch(getListSuccess(json));
      })
      .catch((_error) => dispatch(getListFailure()));
  };
};
