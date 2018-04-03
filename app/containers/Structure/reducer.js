/*
 *
 * Structure reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  ADD_FILE_ACTION,
  UPDATE_FIELD_ACTION,
  SUBMIT_FORM_RESPONSE_ACTION,
  GET_TRANSACTIONS_RESPONSE_ACTION,
  TOGGLE_MENU_ACTION
} from "./constants";

const initialState = fromJS({
  fileData: "",
  filename: "",
  fileValidity: "Unoriginal",
  isValid: false,
  transactions: [],
  anchor: null,
  menuChildren: []
});

function structureReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_FIELD_ACTION:
      return state.set(action.field, action.value);
    case ADD_FILE_ACTION:
      return state
        .set("filename", action.file.name)
        .set("fileData", action.fileData)
        .set("isValid", action.fileData ? true : false);
    case SUBMIT_FORM_RESPONSE_ACTION:
      return state
        .set("filename", initialState.get("filename"))
        .set("fileData", initialState.get("fileData"))
        .set("isValid", initialState.get("isValid"));
    case GET_TRANSACTIONS_RESPONSE_ACTION:
      return state.set(
        "transactions",
        Array.isArray(action.transactions)
          ? action.transactions
          : initialState.get("transactions")
      );
    case TOGGLE_MENU_ACTION:
      return state
        .set("anchor", action.anchor || initialState.get("anchor"))
        .set(
          "menuChildren",
          action.menuChildren || initialState.get("menuChildren")
        );
    default:
      return state;
  }
}

export default structureReducer;