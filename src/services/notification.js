const axios = require('axios');

module.exports = (payload) => {
    const data = {
        to: process.env.FCM_KEY,
        data: payload
    };
    return axios({
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        data,
        headers: {
            Authorization: `key=${process.env.SERVER_KEY}`
        }
      })
      .then(response => response.data)
}