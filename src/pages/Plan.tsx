import React,{ useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import UserServices from "../services/user.service";
import AuthService from "../services/auth.service";

const Plan = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const checkIsAdmin = () => {
      if(user && user.roles != 'ROLE_USER'){
        navigate("/home");
      }
  }

  const [data,setData] = useState([]);

  const listItems = data.map((item: any) =>
    <div className="columns">
      <ul className="price">
        <li className="header">{item.name}</li>
        <li className="grey">Rs.{item.price} / {item.duration} {item.types}</li>
        
        <li>Bollywood Movies {(item.bollywood == true)? <img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
        <li>Hollywood Movies  {(item.hollywood == true)? <img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
        <li>Series  {(item.series == true)? <img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
        <li>LiveTv  {(item.livetv == true)? <img src={'right.png'} className="icon" />:<img src={'wrong.png'} className="icon" /> }</li>
        
        <li className="grey"><button onClick={()=> buyNowClick(item)} className="button">Buy Now</button></li>
      </ul>
    </div>
    
  );

  const buyNowClick = (item: any) => {
    if(user){
        navigate("/billing?id="+item._id);
    }else{
      

      navigate("/signin");
    }
  }

  const getAllData = () => {
    if(user && user.roles != 'ROLE_ADMIN'){
      UserServices.sublist().then(response => {
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
        <h2><img src={'tv.png'} className="icon"  /> Plans and Pricing</h2>
          <p>Jack offers a variety of plans to meet your needs.</p>

          {listItems}
    </div>
  );
};

export  default Plan;