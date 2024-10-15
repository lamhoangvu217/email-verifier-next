import { selector } from 'recoil';
import axios from 'axios';

export const fetchUserDetailsSelector = selector({
  key: 'fetchUserDetailsSelector',
  get: async ({ get }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BASE}/api/user`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});