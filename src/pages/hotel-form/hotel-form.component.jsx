import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewHotel, editHotel } from "../../slices/hotelSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  changeCategoryLabel,
  removeDuplicates,
  sortList,
} from "../../util/utilFunc";
import { updateCategory } from "../../slices/categoriesSlice";

import CustomInput from "../../components/custom-input/custom-input.component";

import "./hotel-form.style.css";

const COUNTRIES_URL =
  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

const HotelForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const { data, errors, setData, handleChange, resetFormFields, validate } =
    useForm();
  const categories = useSelector((state) => state.category.categoryGroup);
  const hotels = useSelector((state) => state.hotel.hotelList);

  useEffect(() => {
    if (state) {
      setData(state.hotel);
    }
  }, [state, setData]);

  const addHotel = () => {
    let isValid = validate(data);

    if (isValid) {
      const newHotel = { ...data, id: hotels.length + 1 };

      dispatch(addNewHotel(newHotel));

      if (data.category) {
        dispatch(updateCategory({ key: newHotel.category, hotel: newHotel }));
      }
      resetFormFields();
      navigate("/");
    }
  };

  const updateHotel = () => {
    dispatch(editHotel(data));

    if (data.category) {
      dispatch(updateCategory({ key: data.category, hotel: data }));
    }
    resetFormFields();
    navigate("/");
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(COUNTRIES_URL);
      const result = await response.json();

      const newCountryList = removeDuplicates(result);
      const sortedCountryList = sortList(newCountryList);

      setCountries(sortedCountryList);
    };

    fetchCountries();
  }, []);

  return (
    <main className="hotel-form">
      <h2>{state == null ? "Add new hotel" : "Update hotel"}</h2>
      <CustomInput
        labelText="Hotel name"
        idText="hotel-name"
        errorText={errors.hotelName ?? null}
      >
        <input
          type="text"
          id="hotel-name"
          name="hotelName"
          placeholder="Enter hotel name"
          onChange={handleChange}
          value={data.hotelName}
          required
        />
      </CustomInput>
      <CustomInput
        labelText="Countries"
        idText="countries"
        errorText={errors.country ?? null}
      >
        <select
          id="countries"
          name="country"
          placeholder="Select country"
          onChange={handleChange}
          value={data.country}
          required
        >
          <option value="" disabled>
            Choose a country
          </option>
          {countries &&
            countries.map((item, index) => (
              <option key={index} value={item.county}>
                {item.country}
              </option>
            ))}
        </select>
      </CustomInput>
      <CustomInput
        labelText="Address"
        idText="address"
        errorText={errors.address ?? null}
      >
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address"
          onChange={handleChange}
          value={data.address}
          required
        />
      </CustomInput>

      {Object.keys(categories).length > 0 ? (
        <CustomInput labelText="category" idText="category">
          <select
            id="category"
            name="category"
            placeholder="Select country"
            onChange={handleChange}
            value={data.category || ""}
          >
            <option value="" disabled>
              Choose a category
            </option>
            {Object.keys(categories).map((category, index) => (
              <option key={index} value={category}>
                {`${changeCategoryLabel(category)} star`}
              </option>
            ))}
          </select>
        </CustomInput>
      ) : (
        <></>
      )}

      {state !== null ? (
        <button className="hotel-form__btn" onClick={updateHotel}>
          Update hotel
        </button>
      ) : (
        <button className="hotel-form__btn" onClick={addHotel}>
          Add new hotel
        </button>
      )}
    </main>
  );
};

export default HotelForm;
