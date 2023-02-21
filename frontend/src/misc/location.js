export const getLocation = (setLocation) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const API_KEY = "bdc_12eeb6644d5149a9b01b7fab291c1190";
    const locDetails = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    let arr = locDetails.localityInfo.administrative;
    arr = arr.map((item, index) =>
      index !== 3 && index !== 5 ? item.name : null
    );
    arr = arr.filter((item) => item !== null);

    setLocation({
      country: arr[0],
      state: arr[1],
      district: arr[2],
      city: arr[3],
      longitude: longitude,
      latitude: latitude,
    });
  });
};
