import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteHotel } from "../../slices/hotelSlice";
import { useState } from "react";
import CategoryModal from "../../components/category-modal.component";
import { updateCategory } from "../../slices/categoriesSlice";

const Home = () => {
  const hotelList = useSelector((state) => state.hotel.hotelList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const categoryGroup = useSelector((state) => state.category.categoryGroup);

  const [isOpen, setIsOpen] = useState(false);

  // console.log(categoryGroup);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Create category</button>

      {isOpen && <CategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {hotelList.length <= 0 ? (
        <h2>no hotels, add</h2>
      ) : (
        hotelList.map((hotel, index) => (
          <div key={index} style={{ height: "150px" }}>
            <h2>{hotel.hotelName}</h2>
            <p>{hotel.country}</p>
            <p>{hotel.address}</p>
            <button
              onClick={() =>
                navigate("/hotel-form", { state: { hotel: hotel } })
              }
            >
              Edit
            </button>
            {/* delete should delete from two lists */}
            <button onClick={() => dispatch(deleteHotel(hotel))}>Delete</button>
            {/* use radio btn so that only one can be selected for the category */}
            <button
              onClick={() =>
                dispatch(updateCategory({ key: "threeStar", hotel: hotel }))
              }
            >
              Add to Category
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
