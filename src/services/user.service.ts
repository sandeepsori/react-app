import axios from 'axios';
import apiRequest from './api-request';
import AuthService from "./auth.service";

const user = AuthService.getCurrentUser();
if(user && user.accessToken){
  var headers = { 'x-access-token': user.accessToken };
}else{
    var headers: {
      'x-access-token': any;
  }
}

const API_URL = apiRequest() + '/api/user/';

class UserServices {
  
  sublist() {
    return axios.get(API_URL + 'allSubscription', { headers: headers });
  }
  subdetail(data : any) {
    return axios.post(API_URL + 'detailSubscription', data,{ headers: headers });
  }

  buySubscription(data : any) {
    return axios.post(API_URL + 'buySubscription', data,{ headers: headers });
  }

  transaction(data : any) {
    return axios.post(API_URL + 'transactionList', data,{ headers: headers });
  }
  
}


export default new UserServices();