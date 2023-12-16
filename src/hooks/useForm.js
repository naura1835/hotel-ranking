import { useState } from "react";

const useForm = () => {
  const [data, setData] = useState({
    hotelName: "",
    country: "",
    address: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (obj) => {
    let valid = false;
    let newErrors = {};

    for (let key in obj) {
      switch (key) {
        case "hotelName":
          if (!obj.hotelName) {
            newErrors.hotelName = "Hotel name is required";
          } else if (obj.hotelName.length <= 4) {
            newErrors.hotelName = "Hotel name should be atleast have 5 letters";
          }
          break;
        case "country":
          if (obj.country.length <= 0) {
            newErrors.country = "Please choose a country";
          }
          break;
        case "address":
          if (!obj.address) {
            newErrors.address = "Address is required";
          }
          break;
        default:
          break;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      valid = false;
      setErrors((prev) => ({ ...prev, ...newErrors }));
    } else {
      valid = true;
    }

    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData((prev) => ({ ...prev, [name]: value }));

    // eslint-disable-next-line no-unused-vars
    const { [name]: remove, ...other } = errors;
    setErrors({ ...other });
  };

  const resetFormFields = () => {
    setData({ hotelName: "", country: "", address: "", category: "" });
  };

  return { data, errors, setData, handleChange, resetFormFields, validate };
};

export default useForm;
