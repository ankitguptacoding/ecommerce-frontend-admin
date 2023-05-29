import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../configs/config";
import { sweetAlert } from "../helper";
import { useDispatch} from 'react-redux';
import { userInfo } from './redux/slice/User';
import {BsFillPersonFill } from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai'
import {TbPassword} from 'react-icons/tb'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, [])

    const colleData = async (e) => {
        e.preventDefault()
       
        const url = `${apiBaseUrl}api/signup`
        const user = {  name,  email,  password, permission:["Profile"] };
        await axios.post(url, user).
        then(result => {
            console.log("result",result);
            const msg = result.data.message;
            let status = result.data.status;
            let token = result.data.auth;
            console.log("restest",result.data);
            dispatch(userInfo(result.data.result));
            if (status) {
                navigate("/profile");
                sweetAlert(msg,status);
                let data ={
                    "email":email,
                    "name":name,
                    "userId":result.data.result._id
                }
                localStorage.setItem("user", JSON.stringify(data));
                localStorage.setItem("token",JSON.stringify(token));
                
    
            } else {
                
                sweetAlert(msg,status);
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 409) {
                sweetAlert(error.response.data.message,false);
              console.log(error.response.data.message);
            } else {
                sweetAlert(error.message,false);
              console.log('An error occurred:', error.message);
            }
          });;
       

    }
    return (
        <div className='register'>
           <h5 >Create your account</h5>
            <div className="signup">
                <BsFillPersonFill className='icon'/>
            <input type="text" placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }} className='inputBox' />
            </div>
            <div className="signup">
            <AiOutlineMail className='icon'/>  
            <input type="text" placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='inputBox' />
            </div>
            <div className="signup">
            <TbPassword className='icon'/>
            <input type="password" placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} className='inputBox' />
            </div>
            <button type='button' onClick={colleData} className='signupbtn'><span>Create acount</span></button>
            <div className="exist_user">

            <Link to = "/login" className='not_member'>Already Have a account ? <span className="signup_new"> Login</span></Link>
            </div>
            <div></div>
        </div>
    )
}

export default SignUp;