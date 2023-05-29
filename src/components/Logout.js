import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { sweetAlert } from '../helper';
import { useDispatch } from 'react-redux';
import { userInfo } from './redux/slice/User';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    sweetAlert("Thank you for Visit .",true);
    const navigate = useNavigate();
    navigate('/login');
    const dispatch = useDispatch();
    localStorage.clear();
    dispatch(userInfo({ result: [] }));

    useEffect(()=>{
        logout();
    },[])

    const logout = async()=>{
       
        navigate('/login')
    }
    
    return (
        <>
            {/* <div className='logout'>
                <h1>Logged Out </h1>
                <p>You have been successfully logged out of your account.</p>
                <p>
                    <Link to="/login"><i className="fa fa-user"></i> Log in again</Link>
                </p>
            </div> */}
        </>
    )
}

export default Logout;