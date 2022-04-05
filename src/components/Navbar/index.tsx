import React,{ useState,useEffect } from 'react';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import UserServices from "../../services/user.service";
const Navbar = () => {

	const navigate = useNavigate();
	const user = AuthService.getCurrentUser();

	const [checkPlan,setCheckPlan] = useState([{
		'name':'',
		'bollywood':'',
		'hollywood':'',
		'series':'',
		'livetv':''
	}]);

	const logoutClick = () => {
		AuthService.logout();
		navigate('/signin');
	}

	const getUserData = () => {
	    if(user && user.roles == 'ROLE_USER'){
	      UserServices.transaction({user_id:user.id}).then(response => {
			  if(response.data.list.length > 0){
				setCheckPlan(response.data.list);
			  }
	          
	        }).catch((error) => {
	           console.log('error ' + error);
	      });
	    }
	  }

	useEffect(() => {
    	getUserData()
    }, []);

	const name = checkPlan[0].name
	const bollywood = checkPlan[0].bollywood
	const hollywood = checkPlan[0].hollywood
	const series = checkPlan[0].series
	const livetv = checkPlan[0].livetv
	
 return (
  <>
	  <ul>
		  <li><a className="active" href="/home">Home</a></li>
		  <li><a href="/plan">Plans and Pricing</a></li>
		

		  {(user && user.roles == 'ROLE_USER' && checkPlan.length > 0)?
		  <li className="dropdown">
		    <a href="javascript:void(0)" className="dropbtn"><img src={'tv.png'} className="icon"  /> Watch </a>
		    <div className="dropdown-content">
			
				{(bollywood)?<a href="/bollywood">Bollywood Movies</a>:null}
				{(hollywood)?<a href="/hollywood">Bollywood Movies</a>:null}
				{(series)?<a href="/series">Bollywood Movies</a>:null}
				{(livetv)?<a href="/livetv">Bollywood Movies</a>:null}

		    </div>
		  </li>
		  :null}

		  
		  
		  {(!user)?
		  <li><a href="/signup">Signup</a></li>
		  :null}

		  {(!user)?
		  <li><a href="/signin">Signin</a></li>
		  :null}


		  {(user && user.roles == 'ROLE_ADMIN')?
		  <li><a href="/transaction">Transaction</a></li>
		  :null}


		  {(user && user.roles == 'ROLE_ADMIN')?
		  <li className="dropdown">
		    <a href="javascript:void(0)" className="dropbtn">Subscription</a>
		    <div className="dropdown-content">
		      <a href="/subscription-add">Add</a>
		      <a href="/subscription-list">List</a>
		    </div>
		  </li>
		  :null}

		  {(user)?
		  <li className="dropdown">
		    <a href="javascript:void(0)" className="dropbtn">{user.username} {(name)?' ( SP : '+name+' ) ':null}</a>
		    <div className="dropdown-content">
		      <a href="/profile">Profile</a>

		      {(user && user.roles == 'ROLE_USER')?
		      <a href="/transaction">Transaction</a>
		      :null}

				
				

		      <a onClick={()=> logoutClick()} >Logout</a>
		    </div>
		  </li>
		  :null}

		</ul>
	</>
  );
};

export default Navbar;