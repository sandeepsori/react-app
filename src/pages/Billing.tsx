import React,{ useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import UserServices from "../services/user.service";
import AuthService from "../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';

const Billing = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const ids = params.get('id');

  const checkIsAdmin = () => {
      if(user && user.roles != 'ROLE_USER'){
        navigate("/home");
      }
  }

  const [data,setData] = useState({
      'name':'',
      'price':'',
      'duration':'',
      'types':'',
      'bollywood':'',
      'hollywood':'',
      'series':'',
      'livetv':'',
      '_id':''
    });

 

  const buyNowClick = (item: any) => {
    if(user){
        UserServices.buySubscription({user_id:user.id,subscription_id:item._id}).then(response => {
           //alert(JSON.stringify(response.data, null, 2));
           toast.success(response.data.message);
            setTimeout(() => { navigate("/transaction")}, 1000);
          }).catch((error) => {
             toast.error(error.message);
             console.log('error ' + error);
        });
          
    }else{
      navigate("/signin");
    }
  }

  const getAllData = () => {
    if(user && user.roles != 'ROLE_ADMIN'){
      UserServices.subdetail({id:ids}).then(response => {
          if(response.data.status == true){
            setData(response.data.data);

          }
        }).catch((error) => {
           console.log('error ' + error);
      });
    }
  }

  useEffect(() => {
    
      getAllData()
      checkIsAdmin()

  }, []);

  

  return (
    <div className="content">
    <Toaster position="top-right" reverseOrder={false} />

        <h2><img src={'tv.png'} className="icon"  /> Plans and Pricing</h2>
          <div className="columns">
            <ul className="price">
              <li className="header">{data.name}</li>
              <li className="grey">Rs.{data.price} / {data.duration} {data.types}</li>
              
              <li>Bollywood Movies {(data.bollywood)?<img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
              <li>Hollywood Movies  {(data.hollywood)?<img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
              <li>Series  {(data.series)?<img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
              <li>LiveTv  {(data.livetv)?<img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
              
              
            </ul>
          </div>
          <div className="columns" style={{"width":"50%"}}>
            <table style={{"width":"70%"}}>
              <tr>
                <th>Name</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>Rs.{data.price}.00</td>
              </tr>
              <tr>
                <th>GST</th>
                <td>Rs.0.00</td>
              </tr>

              <tr>
                <th>Discount</th>
                <td>Rs.0.00</td>
              </tr>

              <tr>
                <th>Grand Total</th>
                <td>Rs.{data.price}.00</td>
              </tr>
              <tr>
                <td></td>
                <td><button onClick={()=> buyNowClick(data)} className="button">Place Order</button></td>
              </tr>

              
            </table>
            
          </div>
      
    </div>
  );
};

export  default Billing;