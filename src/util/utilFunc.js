export const changeCategoryLabel = (label) => {
  if (label == undefined) return false;
  if (label == "oneStar") return 1;
  if (label == "twoStar") return 2;
  if (label == "threeStar") return 3;
};

export const removeDuplicates = (arr) => {
  return arr.reduce((accum, currentObj) => {
    if (!accum.some((obj) => obj.country == currentObj.country)) {
      accum.push(currentObj);
    }
    return accum;
  }, []);
};

export const sortList = (arr) => {
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

export const sortHotelBasedonCategory = (arr) => {
  const categoryOrder = {
    oneStar: 1,
    twoStar: 2,
    threeStar: 3,
  };

  return arr.slice().sort((a, b) => {
    const categoryA = a.category || "";
    const categoryB = b.category || "";

    const orderA = categoryOrder[categoryA] || Infinity;
    const orderB = categoryOrder[categoryB] || Infinity;

    return orderA - orderB;
  });
};
