export default (data) => ({
  id: data._id,
  local_id: data.local_id,
  reservation_id: data.reservation_id,
  first_name: data.first_name,
  last_name: data.last_name,
  rating: data.rating,
  review_text: data.review_text,
  date: data.date
});
