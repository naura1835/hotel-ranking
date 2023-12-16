import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory } from "../../slices/categoriesSlice";

import closeIcon from "../../assets/close-btn.svg";

import "./category-modal.style.css";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const CategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const categoryObj = useSelector((state) => state.category.categoryGroup);
  const categoryArr = Object.keys(categoryObj);

  const [category, setCategory] = useState([
    { title: "1 star", key: "oneStar" },
    { title: "2 star", key: "twoStar" },
    { title: "3 star", key: "threeStar" },
  ]);

  useEffect(() => {
    const updateCategory = category.map((item) => ({
      ...item,
      isChecked: categoryArr.find((arrItem) => arrItem == item.key),
    }));

    setCategory(updateCategory);
    //   const updatedCategories = category.map((item) => {
    //     if (categoryArr.includes(item.key)) {
    //       return { ...item, isChecked: true };
    //     } else {
    //       return item;
    //     }
    //   });

    //   setCategory(updatedCategories);
  }, []);

  const createNewCategory = (event, categoryName) => {
    if (event.target.checked) {
      dispatch(createCategory(categoryName));
    } else {
      dispatch(deleteCategory(categoryName));
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
        <ul>
          {category.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                value={item.key}
                checked={item.isChecked || false}
                onChange={(event) => createNewCategory(event, item.key)}
              />
              <label>{item.title}</label>
            </li>
            // <button key={index} onClick={() => createNewCategory(item.key)}>
            //   {item.title}
            // </button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryModal;
