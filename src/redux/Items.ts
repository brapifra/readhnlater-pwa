import { ItemProperties } from '../components/ItemHeader';
import { OrderedMap, List } from 'immutable';
import { combineReducers } from 'redux';

export enum Actions {
  SAVE_ITEM = "SAVE_ITEM",
  UNSAVE_ITEM = "UNSAVE_ITEM",
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS",
  SET_LOADING = "SET_LOADING",
  LOAD_SAVED_ITEMS = "LOAD_SAVED_ITEMS"
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
    case Actions.LOAD_SAVED_ITEMS:
      return action.payload.items.reduce((newState: OrderedMap<string, ItemProperties>, item: ItemProperties) => (
        newState.set(item.id.toString(), item)
      ), OrderedMap<string, ItemProperties>());
    default:
      return state;
  }
}

function ItemsReducer(state = OrderedMap<string, ItemProperties>(), action: Action): OrderedMap<string, ItemProperties> {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case Actions.ADD_ITEM:
      return state.set(action.payload.id.toString(), action.payload)
    case Actions.DELETE_ITEM:
      return state.delete(action.payload.id.toString());
    default:
      return state;
  }
}

function SelectedReducer(state: List<string> = List(), action: Action): List<string> {
  switch (action.type) {
    case Actions.SET_SELECTED_ITEMS:
      return List(action.payload.map((e: number) => e.toString()));
    default:
      return state;
  }
}

function LoadingReducer(state: boolean = true, action: Action): boolean {
  switch (action.type) {
    case Actions.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  saved: SavedItemsReducer,
  items: ItemsReducer,
  selected: SelectedReducer,
  loading: LoadingReducer
});