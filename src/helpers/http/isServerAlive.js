import axios from 'axios';

const {API_ENDPOINT} = process.env;

export const isServerAlive = async () => {
  try {
    const url = `${API_ENDPOINT}/versions`;
    await axios({
      method: 'get',
      url,
      timeout: 5000,
    });
  } catch (error) {
    throw error;
  }
};
