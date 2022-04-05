import React,{ useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./../style.css";
import { Link, useNavigate } from 'react-router-dom';
import AdminServices from "../../services/admin.service";
import AuthService from "../../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';

const AddSub = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const checkIsAdmin = () => {
      if(user && user.roles != 'ROLE_ADMIN'){
        navigate("/home");
      }
  }

  useEffect(() => {
      checkIsAdmin()

  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      duration:'',
      types:'',
      bollywood:'',
      hollywood:'',
      series:'',
      livetv:'',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, 'Must be 25 characters or less')
        .required('Name is required'),
      price: Yup.number()
        .required('Price is Required'),
      duration: Yup.number()
        .required('Duration id required'),
      types: Yup.string()
        .required('Types is required'),
      bollywood: Yup.string()
        .required('Bollywood is required'),
      hollywood: Yup.string()
        .required('Hollywood is required'),
      series: Yup.string()
        .required('Series is required'),
      livetv: Yup.string()
        .required('LiveTv is required'),
    }),
    onSubmit: values => {
      //alert(JSON.stringify(values, null, 2));
      AdminServices.subcreate(values).then(response => {
         //console.log(response.data);
        //alert(JSON.stringify(response.data, null, 2));
        toast.success(response.data.message);
         setTimeout(() => { navigate("/subscription-list")}, 1000);
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
          <h4>Add Subscription</h4>
        </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="description">Description</label>
                <input
                  className="form-control"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="price">Price</label>
                <input
                  className="form-control"
                  id="price"
                  name="price"
                  type="number"
                  step="any"
                  placeholder="Enter Price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="error">{formik.errors.price}</div>
                ) : null}
              
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="duration">Duration :&nbsp;
                  <select name="types" id="types" className="form-control" required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.types}
                    >
                      <option value="">----</option>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>

                    {formik.touched.types && formik.errors.types ? (
                      <div className="error">{formik.errors.types}</div>
                    ) : null}

            </label>
                <input
                  className="form-control"
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Enter Duration Ex. 10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />

                {formik.touched.duration && formik.errors.duration ? (
                  <div className="error">{formik.errors.duration}</div>
                ) : null}

                
              
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
              <label htmlFor="features">Features : </label>
              <select name="bollywood" id="bollywood" className="form-control" required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bollywood}
                >
                <option value="">--Bollywood--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select name="hollywood" id="hollywood" className="form-control" required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hollywood}
                >
                <option value="">--Hollywood--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select name="series" id="series" className="form-control" required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.series}
                >
                <option value="">--Series--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select name="livetv" id="livetv" className="form-control" required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.livetv}
                >
                <option value="">--LiveTv--</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

          </div>
        </div>
        
        <button type="submit" className="button2">Submit</button>
      </div>
    </form>

    </div>
  );
};

export  default AddSub;