import React,{ useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import AdminServices from "../services/admin.service";
import UserServices from "../services/user.service";
import AuthService from "../services/auth.service";

const Transaction = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const checkIsLogin = () => {
      if(!user){
        navigate("/home");
      }
  }

  const [data,setData] = useState([]);

  const listItems = data.map((item: any,index) =>
    <tr>
      <td>{index+1}</td>
      <td>{item.user_name}</td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.duration} {item.types}</td>
      <td>{item.startFrom}</td>
      <td>{item.endTo}</td>
    </tr>
  );

  const addClick = () => {
    navigate("/subscription-add");
  }
  const editClick = (item: any) => {
    navigate("/subscription-edit?id="+item._id);
  }
  

  const getUserData = () => {
    if(user && user.roles == 'ROLE_USER'){
      UserServices.transaction({user_id:user.id}).then(response => {
          setData(response.data.list);
        }).catch((error) => {
           console.log('error ' + error);
      });
    }
  }

  const getAllData = () => {
    if(user && user.roles == 'ROLE_ADMIN'){
      AdminServices.transaction().then(response => {
          setData(response.data.list);
        }).catch((error) => {
           console.log('error ' + error);
      });
    }
  }

  useEffect(() => {
    
      checkIsLogin()
      getAllData()
      getUserData()
      
  

  }, []);

  

  return (
    <div className="content">
      <div>
        <h4>TRANSACTION PLAN</h4>
      </div>
        <table style={{"width":"100%"}}>
          <tr style={{"background":"rgb(70 75 75)","color":"white"}}>
            <th>S.NO</th>
            <th>USER&nbsp;NAME</th>
            <th>PLAN&nbsp;NAME</th>
            <th>PRICE</th>
            <th>DURATION</th>
            <th>FROM</th>
            <th>TO</th>
          </tr>
          {listItems}
          
        </table>
    </div>
  );
};

export  default Transaction;