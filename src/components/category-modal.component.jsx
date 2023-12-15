import { useDispatch } from "react-redux";
import { createCategory } from "../slices/categoriesSlice";

const CATEGORY = [
  { title: "1 star", key: "oneStar" },
  { title: "2 star", key: "twoStar" },
  { title: "3 star", key: "threeStar" },
];

// eslint-disable-next-line react/prop-types
const CategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const createNewCategory = (categoryName) => {
    dispatch(createCategory(categoryName));
  };
  return (
    <>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>close Modal</button>
        <div>
          {CATEGORY.map((item, index) => (
            <button key={index} onClick={() => createNewCategory(item.key)}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
