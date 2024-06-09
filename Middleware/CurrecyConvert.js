const axios = require('axios');
const convert = async (amount, from, to) => {

    const options = {
        method: 'GET',
        url: 'https://currency-converter241.p.rapidapi.com/convert',
        params: {
            amount: amount,
            from: from,
            to: to
        },
        headers: {
            'x-rapidapi-key': '889bf3837dmsh57d912de5b21951p16e2aajsn065c692abb41',
            'x-rapidapi-host': 'currency-converter241.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        return (response.data.total);
    } catch (error) {
        console.error(error);
    }
}

module.exports = convert;