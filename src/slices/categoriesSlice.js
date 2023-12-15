import { createSlice } from "@reduxjs/toolkit";

const deleteFromCategoryGroup = (categories, categoryToDelete) => {
  Object.keys(categories).map((key) => {
    if (key == categoryToDelete) {
      delete categories[key];
    }
  });
  return categories;
};

const removeItemFromArray = (array, itemToRemove) => {
  return array.filter((item) => item.id !== itemToRemove.id);
};

const removeItemFromObjectArrays = (obj, itemToRemove) => {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && Array.isArray(obj[key])) {
      obj[key] = removeItemFromArray(obj[key], itemToRemove);
    }
  }
  return obj;
};

const updateCategoryGroup = (categories, key, hotel) => {
  removeItemFromObjectArrays(categories, hotel);
  categories[key].push(hotel);

  return categories;
};

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryGroup: {},
  },
  reducers: {
    createCategory: (state, action) => {
      const { payload } = action;
      const categoryGroupArr = Object.keys(state.categoryGroup);
      const categoryExists = categoryGroupArr.find(
        (category) => category === payload
      );

      if (!categoryExists) {
        state.categoryGroup[payload] = [];
      } else {
        state.categoryGroup = { ...state.categoryGroup };
      }
    },
    deleteCategory: (state, action) => {
      const newObj = deleteFromCategoryGroup(
        state.categoryGroup,
        action.payload
      );
      state.categoryGroup = newObj;
    },
    updateCategory: (state, action) => {
      const { payload } = action;

      updateCategoryGroup(state.categoryGroup, payload.key, payload.hotel);
    },
  },
});

export const { createCategory, deleteCategory, updateCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
