import React,{ useEffect,useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./../style.css";
import { Link, useNavigate } from 'react-router-dom';
import AdminServices from "../../services/admin.service";
import AuthService from "../../services/auth.service";

const Bollywood = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const checkIsAdmin = () => {
      if(user && user.roles != 'ROLE_USER'){
        navigate("/home");
      }
  }

  return (
    <div className="content">
      <div>
        <h4> <img src={'tv.png'} className="icon"  /> Bollywood Movies</h4>
      </div>
        
    </div>
  );
};

export  default Bollywood;