import { SIGN_UP } from '../types';

const authReducerDefaultState = {
  auth: {
    uid: null,
    token: null,
    refToken: null
  }
};

export default function(state = authReducerDefaultState, action) {
  switch (action.type) {
    // case SIGN_UP:
    //   return {
    //     ...state,
    //     auth: {
    //       uid: action.payload.localId || false,
    //       token: action.payload.idToken || false,
    //       refToken: action.payload.refreshToken || false
    //     }
    //   };
    default:
      return state;
  }
}
