/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux-immutable";
import { fromJS } from "immutable";
import { LOCATION_CHANGE } from "react-router-redux";
import { CHANGE_USER_RESPONSE_ACTION } from "containers/App/constants";

import languageProviderReducer from "containers/LanguageProvider/reducer";

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

const userInitialState = fromJS({
  user: "agent"
});

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case CHANGE_USER_RESPONSE_ACTION:
      return state.set("user", action.user);
    default:
      return state;
  }
}
// Initial routing state
const routeInitialState = fromJS({
  location: null
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    user: userReducer,
    ...injectedReducers
  });
}