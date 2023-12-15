import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { addNewHotel, editHotel } from "../../slices/hotelSlice";
import { useLocation } from "react-router-dom";

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
  const { data, errors, setData, handleChange, validate } = useForm();

  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setData(state.hotel);
    }
  }, [state, setData]);

  const addHotel = () => {
    let isValid = validate(data);

    if (isValid) {
      dispatch(addNewHotel(data));
    }
  };

  console.log(errors);
  console.log(data);

  const updateHotel = () => {
    dispatch(editHotel(data));
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
    <>
      <div>
        <label htmlFor="hotel-name">Hotel Name</label>
        <input
          type="text"
          id="hotel-name"
          name="hotelName"
          placeholder="Enter hotel name"
          onChange={handleChange}
          value={data.hotelName}
          required
        />
      </div>
      <div>
        <label htmlFor="countries">Countries</label>

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
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter address"
          onChange={handleChange}
          value={data.address}
          required
        />
      </div>

      {state !== null ? (
        <button onClick={updateHotel}>Update hotel</button>
      ) : (
        <button onClick={addHotel}>Add new hotel</button>
      )}
    </>
  );
};

export default HotelForm;
