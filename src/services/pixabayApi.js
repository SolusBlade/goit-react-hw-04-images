import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '34227694-9569f818613f570b55f9f9223';

// const getSearchedNews = async () => {
//   try {
//     const response = await axios.get("/everything", {
//       params: {
//         q: "bitcoin",
//         apiKey: API_KEY,
//       },
//     });
//     return response.data; // Promise.resolve(response.data)
//   } catch (error) {
//     console.log(error.message);
//     // return undefined; // Promise.resolve(undefined)
//     throw error; // Promise.reject(error)
//   }
// };
export const getSearchedPixabayApi = (q, page = 1) => {
  return axios
    .get('api/', {
      params: {
        q,
        page,
        per_page: 20,
        key: API_KEY,
      },
    })
    .then(res => res.data);
};
