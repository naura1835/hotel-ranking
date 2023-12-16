import { createSlice } from "@reduxjs/toolkit";

const addNewHotelToList = (hotels, newHotel) => {
  const hotelExists = hotels.find(
    (item) =>
      item.hotelName == newHotel.hotelName &&
      item.country == newHotel.country &&
      item.address == newHotel.address
  );

  if (hotelExists) {
    return [...hotels];
  }
  return [...hotels, newHotel];
};

const deleteHotelFromList = (hotels, hotelToDelete) => {
  return hotels.filter((hotel) => hotel.id !== hotelToDelete.id);
};

const updateHotelInformation = (hotels, hotelToUpdate) => {
  return hotels.map((hotel) => {
    if (hotel.id == hotelToUpdate.id) {
      return { ...hotelToUpdate };
    }
    return hotel;
  });
};

const removeDeletedCategoryLabel = (hotels, category) => {
  return hotels.map((hotel) => {
    if (hotel.category == category) {
      return { ...hotel, category: "" };
    }
    return hotel;
  });
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotelList: [],
  },
  reducers: {
    addNewHotel: (state, action) => {
      state.hotelList = addNewHotelToList(state.hotelList, action.payload);
    },
    editHotel: (state, action) => {
      state.hotelList = updateHotelInformation(state.hotelList, action.payload);
    },
    deleteHotel: (state, action) => {
      state.hotelList = deleteHotelFromList(state.hotelList, action.payload);
    },
    removeHotelsFromCategrory: (state, action) => {
      //remove deleted category label from hotel info
      state.hotelList = removeDeletedCategoryLabel(
        state.hotelList,
        action.payload
      );
    },
  },
});

export const {
  addNewHotel,
  editHotel,
  deleteHotel,
  removeHotelsFromCategrory,
} = hotelSlice.actions;

export default hotelSlice.reducer;
