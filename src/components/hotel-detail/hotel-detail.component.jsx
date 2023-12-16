/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteHotel } from "../../slices/hotelSlice";
import { deleteItemFromCategory } from "../../slices/categoriesSlice";

import deleteIcon from "../../assets/delete.svg";

import "./hotel-detail.style.css";

const HotelDetail = ({ hotel, categoryLabel }) => {
  const dispatch = useDispatch();
  const deleteHotelFromList = (hotel) => {
    dispatch(deleteHotel(hotel));
    if (hotel.category) {
      dispatch(deleteItemFromCategory({ key: hotel.category, hotel: hotel }));
    }
  };
  return (
    <li className="hotel-listing__list__item">
      <div className="list__item__header">
        <Link
          to="/hotel-form"
          state={{ hotel: hotel }}
          className="list__item__header__hotel-name"
        >
          <h2>{hotel.hotelName}</h2>
        </Link>
        <button onClick={() => deleteHotelFromList(hotel)}>
          <img src={deleteIcon} alt="trash icon" />
        </button>
      </div>
      <Link to="/hotel-form" state={{ hotel: hotel }}>
        <p>{hotel.country}</p>
      </Link>

      <Link to="/hotel-form" state={{ hotel: hotel }}>
        <p>{hotel.address}</p>
      </Link>

      {categoryLabel && <span className="category">{categoryLabel} star</span>}
    </li>
  );
};

export default HotelDetail;
