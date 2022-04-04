import { createStore } from 'redux';

export interface IStore {
  categories: string[];
}

const initState: IStore = {
  categories: [],
};

const categReducer = (state = initState, action: any) => {
  if (action.type === 'addCategories') {
    return {
      categories: action.categories,
    };
  }

  return state;
};

const store = createStore(categReducer);

export default store;
