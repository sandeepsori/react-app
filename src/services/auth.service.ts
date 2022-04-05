import axios from "axios";
import apiRequest from './api-request';

const API_URL = apiRequest() + '/api/auth/';

class AuthService {
  signin(data : any) {
    return axios
      .post(API_URL + "signin",data)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      });
  }

  signup(data : any) {
    return axios
      .post(API_URL + "signup",data)
      .then(response => {
        return response;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }


  getCurrentUser() {
    const vals = localStorage.getItem('user');
    if(vals){
      return JSON.parse(vals);
    }
    
  }

}

export default new AuthService();