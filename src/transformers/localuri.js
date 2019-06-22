export default (data) => ({
  id: data._id,
  name: data.name,
  img: data.img,
  address: data.address,
  priceType: data.priceType,
  placeType: data.placeType,
  kitchenType: data.kitchenType,
  uniqueLink: data.uniqueLink,
  rating: data.rating,
  totalReviews: data.totalReviews,
  lat: data.lat,
  lng: data.lng
});
