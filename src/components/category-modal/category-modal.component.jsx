import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory } from "../../slices/categoriesSlice";
import { removeHotelsFromCategrory } from "../../slices/hotelSlice";

import closeIcon from "../../assets/close-btn.svg";

import "./category-modal.style.css";

const CATEGORY = [
  { title: "1 star", key: "oneStar" },
  { title: "2 star", key: "twoStar" },
  { title: "3 star", key: "threeStar" },
];

// eslint-disable-next-line react/prop-types
const CategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const categoryObj = useSelector((state) => state.category.categoryGroup);
  const categoryArr = Object.keys(categoryObj) || [];
  const [selectedCategories, setSelectedCategories] = useState(categoryArr);

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((item) => item != categoryName)
        : [...prev, categoryName]
    );

    if (!selectedCategories.includes(categoryName)) {
      dispatch(createCategory(categoryName));
    } else {
      dispatch(deleteCategory(categoryName));
      dispatch(removeHotelsFromCategrory(categoryName));
    }
  };

  return (
    <>
      <div role="dialog" className="modal">
        <button className="modal__close-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src={closeIcon} alt="X indicating close icon" />
        </button>

        <h3 className="modal__heading">CATEGORY</h3>
        <p className="modal__desc">Choose category to create a new category</p>
        <ul className="modal__category-list">
          {CATEGORY.map((item, index) => (
            <li key={index}>
              <label
                className={`category-btn ${
                  selectedCategories.includes(item.key)
                    ? "category-btn--active"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={item.key}
                  checked={selectedCategories.includes(item.key)}
                  onChange={() => handleCheckboxChange(item.key)}
                />
                {item.title}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryModal;
