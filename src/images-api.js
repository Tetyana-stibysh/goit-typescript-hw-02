import axios from 'axios';
const URL = 'https://api.unsplash.com/';
const myApiKey = '_CzWG99Cp4iCC288vORCNwKwzB_TUsGfwnJjHmh1v2M';
axios.defaults.headers.common['Authorization'] = `Client-ID ${myApiKey}`;
axios.defaults.headers.common['Accept-Version'] = 'v1';
axios.defaults.baseURL = URL;
export const fetchData = async (query, nextPage) => {
  const response = await axios.get('search/photos', {
    params: {
      query: query,
      per_page: '12',
      orientation: 'portrait',
      page: nextPage,
    },
  });
  return response.data;
};
// const doStuff = async () => {
//   try {
//     const users = await fetchData('cat', 2);
//     console.log(users.results);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// doStuff();
