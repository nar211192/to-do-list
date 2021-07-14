import { createSlice } from "@reduxjs/toolkit";

export const rootReducer = createSlice({
  name: "counter",
  initialState: {
    lists: [],
    inputForm: {},
  },

  reducers: {
    showFetchedLists: (state, action) => {
      state.lists = action.payload;
    },

    addList: (state, action) => {
      state.lists = [...state.lists, action.payload];
    },

    removeList: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },

    checkedList: (state, action) => {
      state.lists = state.lists.filter((list) => {
        if (list.id === action.payload) {
          list.checked = !list.checked;
        }
        return list;
      });
    },

    updateList: (state, action) => {
      state.lists = state.lists.filter((list) => {
        if (list.id === action.payload.list.id) {
          list.title = action.payload.title;
        }
        return list;
      });
    },
  },
});

export const {
  showFetchedLists,
  addList,
  removeList,
  checkedList,
  updateList,
} = rootReducer.actions;

export default rootReducer.reducer;
