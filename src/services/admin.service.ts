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

const API_URL = apiRequest() + '/api/admin/';

class AdminServices {
  
  sublist() {
    return axios.get(API_URL + 'allSubscription', { headers: headers });
  }
  subcreate(data : any) {
    return axios.post(API_URL + "createSubscription", data, { headers: headers });
  }
  subdetail(data : any) {
    return axios.post(API_URL + 'detailSubscription', data,{ headers: headers });
  }
  subupdate(data : any) {
    return axios.post(API_URL + "updateSubscription", data, { headers: headers });
  }
  subdelete(data : any) {
    return axios.post(API_URL + "deleteSubscription", data, { headers: headers });
  }
  transaction() {
    return axios.get(API_URL + "transactionList", { headers: headers });
  }
  
}


export default new AdminServices();