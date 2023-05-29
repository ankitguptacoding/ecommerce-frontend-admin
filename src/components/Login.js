import React, { useState, useEffect } from 'react';
import { isEmpty} from 'lodash';
import { apiBaseUrl } from "../configs/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { sweetAlert } from '../helper';
import { useDispatch} from 'react-redux';
import { userInfo } from './redux/slice/User'
import {AiOutlineMail} from 'react-icons/ai'
import {TbPassword} from 'react-icons/tb'
const Login = ()=>{
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate('/');
        }
    },[])
    const handleLoign = async()=>{
        if(!isEmpty(email) && !isEmpty(password)){
        const url = `${apiBaseUrl}api/userLogin`;
        const user = {  email: email,password: password };
        const result = await axios.post(url, user);
        const msg = result.data.message;
        let status = result.data.status;
        let token = result.data.auth;
        
        
        if (status) {
            dispatch(userInfo(result.data.data))
            
            navigate("/profile");
            
            let name = result.data.data.name;
            let userId = result.data.data._id;
            sweetAlert(msg,status);
            let data ={
                "email":email,
                "name":name,
                "userId":userId
            }
            localStorage.setItem("user",JSON.stringify(data));
            localStorage.setItem("token",JSON.stringify(token));

        }else {
            
            sweetAlert(msg,status);
        }
    }else{
        let msg = "Please Fill Email & Password !"
        let status = false;
        sweetAlert(msg,status);
    }
    }
    return(
        
        <div className='login'>
            <div className='left_login'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png" alt="Logo" />
            </div>
            <div className='right_login'>
           
            <h5 className='heading'>Sign In to your account</h5>
            <h6 className='heading'>Welcome back!</h6>
            <div className='input_group'>
            <AiOutlineMail className='icon'/>   
            <input type = "text" className='inputBox' onChange={(e)=>{setEmail(e.target.value)}}  value ={email} placeholder='Enter Email' />
            </div>
            <div className='input_group'>
                <TbPassword className='icon'/>
           <input type = "password" className='inputBox' onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder='Enter Password' />
           </div>
            <div className='login_footer'>
            <Link to="/signup" className='not_member'>Not a member?<spna className="signup_new">Sign up</spna> </Link>
            <button className='appButton ' onClick={handleLoign} type='button' ><span>Login </span></button>
            </div>
          
           </div>
          
        </div>
    )
}

export default Login;