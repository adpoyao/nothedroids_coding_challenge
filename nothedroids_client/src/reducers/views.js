import * as types from '../actions/actionType';

const initialState = {
  selectedView: 'login',
};

const viewReducer = (state = initialState, action) => {
  switch (action.type){
    case types.TOGGLE_VIEW:
      return Object.assign({}, state, {
        selectedView: action.selectedView
      });
      default: break;
  }
  return state;
};

export default viewReducer;