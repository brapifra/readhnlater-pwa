import { ItemProperties } from '../components/Item';
import { OrderedMap } from 'immutable';
import { combineReducers } from 'redux';

export enum Actions {
  SAVE_ITEM = "SAVE_ITEM",
  UNSAVE_ITEM = "UNSAVE_ITEM",
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS"
}

interface Action {
  type: string;
  payload: any;
}

function SavedItemsReducer(state = OrderedMap<string, ItemProperties>(), action: Action): OrderedMap<string, ItemProperties> {
  switch (action.type) {
    case Actions.SAVE_ITEM:
      return state.set(action.payload.id.toString(), action.payload)
    case Actions.UNSAVE_ITEM:
      return state.delete(action.payload.id.toString());
    default:
      return state;
  }
}

function ItemsReducer(state = OrderedMap<string, ItemProperties>(), action: Action): OrderedMap<string, ItemProperties> {
  switch (action.type) {
    case Actions.ADD_ITEM:
      return state.set(action.payload.id.toString(), action.payload)
    case Actions.DELETE_ITEM:
      return state.delete(action.payload.id.toString());
    default:
      return state;
  }
}

function SelectedReducer(state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case Actions.SET_SELECTED_ITEMS:
      return action.payload.map((e: string) => e.toString())
    default:
      return state;
  }
}

export default combineReducers({ saved: SavedItemsReducer, items: ItemsReducer, selected: SelectedReducer });