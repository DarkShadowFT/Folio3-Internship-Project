import axios from "axios";

export default function authHelper(obj){
  (async() => {
    try {
      if (obj.currentUser) {
        // const idToken = await currentUser.getIdToken(true)
        // console.log("Passing token: " + IDToken)
        const config = {
          headers: { Authorization: obj.IDToken }
        };
        const response = await axios.get(
          obj.API_URL,
          config
        )
        if (response.status === 200) {
          obj.setAuth(2)
        }
        else {
          obj.setAuth(1)
        }
        obj.setLoading(false)
      }
      else {
        obj.setAuth(0)
        obj.setLoading(false)
      }
    }
    catch (e) {
      obj.setLoading(false)
      obj.setAuth(0)
    }
  })()
}
