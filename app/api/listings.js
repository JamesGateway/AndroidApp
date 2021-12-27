import client from './client'

const endPoint = '/texts'

const getListings = () => client.get(endPoint)
// prettier-ignore
const addListing = (listing) => {
  const data = {
    title: listing.title,
    http: listing.http,
    message: listing.message,
    author: listing.author,
    email: listing.email
  };
  return client.post(endPoint, data);
};

const getMyListings = (user) => client.get(endPoint + '/' + user.email)
const deleteMyListings = (id) => client.delete(endPoint + '/' + id)
const updateMyText = (text) => {
  // prettier-ignore
  const update = {
    title: text.title,
    http: text.http,
    message: text.message,
    author: text.author,
    email: text.email
  }
  return client.put(endPoint + '/' + text._id, update)
}

export default {
  addListing,
  getListings,
  getMyListings,
  deleteMyListings,
  updateMyText,
}
