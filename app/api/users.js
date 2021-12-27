import client from './client';

const register = (userInfo) => {
  // prettier-ignore
  const user = {
    name: userInfo.name,
    email: userInfo.email,
    password: userInfo.password
  };
  return client.post('/users', user);
};
export default {
  register,
};
