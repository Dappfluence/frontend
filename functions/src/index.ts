import * as functions from "firebase-functions";
import axios from "axios";


export const getTwitterUserInfo = functions.https.onCall(async (data, context) => {
  let raw = await axios.post('https://api.twitter.com/oauth2/token?grant_type=client_credentials', {}, {
    headers: {
      'Authorization': `Basic ${functions.config().twitter.secret}`
    }
  });
  let token = raw.data.access_token;
  let info = await axios.get(`https://api.twitter.com/2/users/${data.id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return info.data;
})
