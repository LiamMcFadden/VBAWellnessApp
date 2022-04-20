import React, {createContext, useReducer} from 'react';
import {getCurrentUser, completeActivityForCurrentUser} from '_api/firebase-db';

const actions = {
  COMPLETE_ACTIVITY: 'COMPLETE_ACTIVITY',
  UNDO_ACTIVITY: 'UNDO_ACTIVITY', //TODO:
};

let userReducer = (state, action) => {
  switch (action.type) {
    case actions.COMPLETE_ACTIVITY:
      let activityUid = action.payload;
      completeActivityForCurrentUser(activityUid);
      //Have to deep-clone the object to ensure React knows the user object has changed
      let newState = JSON.parse(JSON.stringify(getCurrentUser()));
      return newState;
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, getCurrentUser());
  const value = {
    state,
    completeActivity: activity => {
      dispatch({type: actions.COMPLETE_ACTIVITY, payload: activity.uid});
    },
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
