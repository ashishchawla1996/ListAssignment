import * as actionTypes from '../action';

const initialState = {
  response: [],
  currentResponse: [],
  error: '',
  isLoading: false,
  footerStatus: 'show',
};

const getListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        response: [],
        currentResponse: [],
      };
    case actionTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.value,
        currentResponse: action.value.slice(0, 5),
      };
    case actionTypes.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.REMOVE_DATA_ITEM:
      const updatedArray = [...state.currentResponse];
      updatedArray.splice(action.value, 1);
      return {
        ...state,
        isLoading: false,
        //   response: updatedArray,
        currentResponse: updatedArray,
      };
    case actionTypes.APPEND_ALL_ITEMS:
      const getLastFiveElements = state.response.reduce((res, curr) => {
        if (curr.id > 5) {
          res.push(curr);
        }
        return res;
      }, []);
      return {
        ...state,
        currentResponse: [...state.currentResponse, ...getLastFiveElements],
        footerStatus: 'hide',
      };
    default:
      return state;
  }
};
export default getListReducer;
