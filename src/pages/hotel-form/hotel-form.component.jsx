import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addNewHotel, editHotel } from "../../slices/hotelSlice";
import { useLocation } from "react-router-dom";

import "./hotel-form.style.css";
import CustomInput from "../../components/custom-input/custom-input.component";
import { updateCategory } from "../../slices/categoriesSlice";

const COUNTRIES_URL =
  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

const removeDuplicates = (arr) => {
  return arr.reduce((accum, currentObj) => {
    if (!accum.some((obj) => obj.country == currentObj.country)) {
      accum.push(currentObj);
    }
    return accum;
  }, []);
};

const sortList = (arr) => {
  return arr.sort((a, b) => {
    const firstCountry = a.country.toUpperCase();
    const secondCountry = b.country.toUpperCase();

    if (firstCountry < secondCountry) {
      return -1;
    }
    if (firstCountry > secondCountry) {
      return 1;
    }
    return 0;
  });
};

const HotelForm = () => {
  const [countries, setCountries] = useState([]);
  const { data, errors, setData, handleChange, resetFormFields, validate } =
    useForm();
  const dispatch = useDispatch();
  const { state } = useLocation();
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
      setData((prev) => ({ ...prev, id: hotels.length + 1 }));
      dispatch(addNewHotel(data));
      dispatch(updateCategory({ key: data.category, hotel: data }));
      resetFormFields();
    }
  };

  const updateHotel = () => {
    dispatch(editHotel(data));
    dispatch(updateCategory({ key: data.category, hotel: data }));
    resetFormFields();
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
          <option value="choose a country">Choose a country</option>
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
            value={data.category || "Choose a category"}
          >
            <option value="Choose a category">Choose a category</option>
            {Object.keys(categories).map((category, index) => (
              <option key={index} value={category}>
                {category}
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
