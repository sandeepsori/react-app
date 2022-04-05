import React from 'react';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Profile = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const logoutClick = () => {
    AuthService.logout();
    navigate('/signin');

  }
  return (
    <div className="content">
      <div>
        <h4>MY PROFILE <button onClick={()=> logoutClick()} >LOGOUT</button></h4>
      </div>
      <table style={{"width":"100%"}}>
        <tr>
          <th>USERNAME</th>
          <td>{user.username}</td>
        </tr>
        <tr>
          <th>EMAIL</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>ROLE</th>
          <td>{user.roles}</td>
        </tr>
        
      </table>
    </div>
  );
};
  
export default Profile;