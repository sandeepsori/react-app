import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('Username is required'),
      password: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('Password is required'),
    }),
    onSubmit: values => {
      //alert(JSON.stringify(values, null, 2));
      AuthService.signin(values).then(response => {
         toast.success(response.data.message);
         setTimeout(() => { navigate("/home")}, 1000);
      }).catch((error) => {
         toast.error(error.message);
         console.log('error ' + error);
      });
    },
  });
  return (
    <div className="content">
    <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={formik.handleSubmit}>
        <div className="imgcontainer">
          <img src={'img_avatar.png'} className="avatar" />
          <h4>Sign In</h4>
        </div>

        <div className="container">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            id="username"
            name="username"
            type="text"
            placeholder="Enter Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}

          <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
              
          <button type="submit" className="button2">Login</button>

          <span className="psw">If you are not registered <a href="signup">Sign Up?</a> here</span>
        </div>
        <div className="container">
        </div>

      </form>
    </div>
  );
};

export  default Signin;