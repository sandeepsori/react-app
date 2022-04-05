import React,{ useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./../style.css";
import { Link, useNavigate } from 'react-router-dom';
import AdminServices from "../../services/admin.service";
import AuthService from "../../services/auth.service";

const Hollywood = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const checkIsAdmin = () => {
      if(user && user.roles != 'ROLE_USER'){
        navigate("/home");
      }
  }

  const [data,setData] = useState([]);

  const listItems = data.map((item: any) =>
    <tr>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.duration} {item.types}</td>
      <td>{item.status}</td>
      <td>
          <button onClick={()=> editClick(item)} >Edit</button>
          <button onClick={()=> deleteClick(item)} >Delete</button>
      </td>
    </tr>
  );

  const addClick = () => {
    navigate("/subscription-add");
  }
  const editClick = (item: any) => {
    navigate("/subscription-edit?id="+item._id);
  }
  const deleteClick = (item: any) => {
      
      AdminServices.subdelete({id:item._id}).then(response => {
          if(response.data.status == true){
              getAllData()
          }
        }).catch((error) => {
           console.log('error ' + error);
      });
  }

  const getAllData = () => {
      AdminServices.sublist().then(response => {
          if(response.data.status == true){
            setData(response.data.data);
          }
        }).catch((error) => {
           console.log('error ' + error);
      });
  }

  useEffect(() => {
    
      getAllData()
      checkIsAdmin()

  }, []);

  

  return (
    <div className="content">
      <div>
        <h4> <img src={'tv.png'} className="icon"  /> Hollywood Movies</h4>
      </div>
        
    </div>
  );
};

export  default Hollywood;