import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeCategoryLabel,
  sortHotelBasedonCategory,
} from "../../util/utilFunc";

import hero from "../../assets/hero.jpg";
import filterIcon from "../../assets/filter.svg";
import HotelDetail from "../../components/hotel-detail/hotel-detail.component";

import "./home.style.css";

const Home = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const hotelList = useSelector((state) => state.hotel.hotelList);
  const [currentCategory, setCurrentCategory] = useState("all");
  const category = useSelector((state) => state.category.categoryGroup);

  const filteredHotels =
    currentCategory === "all"
      ? sortHotelBasedonCategory(hotelList)
      : category[currentCategory] || [];

  const headingText =
    currentCategory === "all"
      ? "All hotels"
      : `${changeCategoryLabel(currentCategory)} star hotels`;

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
          <Link to="/hotel-form" className="no-hotels__add-hotel-link">
            Add New Hotel
          </Link>
        </div>
      ) : (
        <>
          <div className="hotel-listing__main-body">
            <div className="hotel-listing__main-body__header">
              <h2 className="hotel-listing__main-body__heading">
                {headingText}
              </h2>
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
            </div>

            <ul className="hotel-listing__list">
              {filteredHotels.map((hotel, index) => {
                const categoryLabel = changeCategoryLabel(hotel.category);

                return (
                  <HotelDetail
                    key={index}
                    categoryLabel={categoryLabel}
                    hotel={hotel}
                  />
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
