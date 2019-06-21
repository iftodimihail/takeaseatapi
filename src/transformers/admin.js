export default (data) => ({
  id: data._id,
  name: data.name ? data.name : '-',
  email: data.email,
  local_id: data.local_id,
  created_at: data.created_at ? data.created_at : '-',
  updated_at: data.updated_at ? data.updated_at : '-'
});
