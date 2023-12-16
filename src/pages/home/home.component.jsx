import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteHotel } from "../../slices/hotelSlice";
// import { updateCategory } from "../../slices/categoriesSlice";

import hero from "../../assets/hero.jpg";
import filterIcon from "../../assets/filter.svg";
import deleteIcon from "../../assets/delete.svg";

import "./home.style.css";
import { deleteItemFromCategory } from "../../slices/categoriesSlice";
import { useState } from "react";

const Home = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const hotelList = useSelector((state) => state.hotel.hotelList);

  // const [filteredList, setFilteredList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const category = useSelector((state) => state.category.categoryGroup);
  const dispatch = useDispatch();

  const deleteHotelFromList = (hotel) => {
    dispatch(deleteHotel(hotel));
    dispatch(deleteItemFromCategory({ key: hotel.category, hotel: hotel }));
  };

  const filteredHotels =
    currentCategory === "all" ? hotelList : category[currentCategory] || [];

  const changeCategoryLabel = (label) => {
    return label == "oneStar"
      ? "1 star"
      : label == "twoStar"
      ? "2 star"
      : "3 star";
  };

  return (
    <main className="hotel-listing">
      <img
        className="hotel-listing__img"
        src={hero}
        alt="high skyrise in the night time"
      />
      {hotelList.length <= 0 ? (
        <div className="no-hotels">
          <p>No hotels, care to add hotels to list...</p>
          <Link to="/hotel-form" className="add-hotel-link">
            Add New Hotel
          </Link>
        </div>
      ) : (
        <>
          <div className="hotel-listing__main-body">
            <div className="hotel-listing__main-body__header">
              <h2 className="hotel-listing__main-body__heading">ALL HOTELS</h2>
              <button
                className={
                  isFilterModalOpen
                    ? "hotel-listing__main-body__filter-btn filter-btn--active"
                    : "hotel-listing__main-body__filter-btn"
                }
                onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              >
                <span>Filter</span>
                <img src={filterIcon} alt="fllter icon" />
              </button>
            </div>
            {isFilterModalOpen && (
              <ul className="filter-modal">
                <li
                  className="filter-modal__list-item"
                  onClick={() => {
                    setCurrentCategory("all");
                    setIsFilterModalOpen(false);
                  }}
                >
                  All hotels
                </li>
                {Object.keys(category).map((item, index) => {
                  const labelText = changeCategoryLabel(item);

                  return (
                    <li
                      className="filter-modal__list-item"
                      key={index}
                      onClick={() => {
                        setCurrentCategory(item);
                        setIsFilterModalOpen(false);
                      }}
                    >
                      {labelText} hotels
                    </li>
                  );
                })}
              </ul>
            )}
            <ul className="hotel-listing__list">
              {filteredHotels.map((hotel, index) => {
                const categoryLabel = changeCategoryLabel(hotel.category);

                return (
                  <li key={index} className="hotel-listing__list__item">
                    <div className="list__item__header">
                      <Link to="/hotel-form" state={{ hotel: hotel }}>
                        <h2>{hotel.hotelName}</h2>
                      </Link>
                      {/* delete should delete from two lists */}
                      <button onClick={() => deleteHotelFromList(hotel)}>
                        <img src={deleteIcon} alt="trash icon" />
                      </button>
                    </div>
                    <p>{hotel.country}</p>
                    <p>{hotel.address}</p>

                    <span className="category">{categoryLabel}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
