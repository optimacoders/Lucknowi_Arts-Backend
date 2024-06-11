const axios = require('axios');

const convert = async (amount, from, to) => {
  const options = {
    method: 'GET',
    url: 'https://currency-converter241.p.rapidapi.com/convert',
    params: { amount, from, to },
    headers: {
      'x-rapidapi-key': '889bf3837dmsh57d912de5b21951p16e2aajsn065c692abb41',
      'x-rapidapi-host': 'currency-converter241.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.total;
  } catch (error) {
    console.error('Currency conversion error:', error);

    // Check if the error is due to a server issue or invalid input
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error status code:', error.response.status);
      console.error('Error response data:', error.response.data);
    } else if (error.request) {
      // No response was received
      console.error('No response received:', error.request);
    } else {
      // Error setting up the request
      console.error('Error setting up request:', error.message);
    }

    // Implement a fallback mechanism or return a default value
    return null; // or some default value or handle as needed
  }
};

module.exports = convert;
