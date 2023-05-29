import React, { useState } from 'react'
import './Sidebar.css'
import { sidebarHeading } from '../../../helper'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Nav from '../../Nav'

const Sidebar = (props) =>{
    console.log(props,"---childreen")
    console.log("sidebar",sidebarHeading)
    const user = useSelector(state => state);
    let userDetails = user.userInfo[0];
    
    let userRoute = [];
    if (userDetails != undefined && userDetails.permission != undefined) {
    
        if(((userDetails.permission).length) == 0){
            
            userRoute = sidebarHeading;
            
        }else{

            userRoute = userDetails.permission.map((route) => {
                return sidebarHeading.find(e => e.heading == route)
            })
        }

    }
    
    const SideBarData = (e)=>{
        console.log(e);
    }
    return (
        <>
            <div className={props.data}>
        
                {userRoute.map((item, index)=>{
                    return(
                        <div className='menuItem' onClick={SideBarData} value = {userRoute}  >
                            
                        <li><Link to={item.Link} ><item.icon className="side_icon"/>
                            <span >
                                {item.heading}
                            </span></Link></li>
                       
                        </div>
                    )
                })}

            </div>
        {/* <main>{childern}</main> */}
        </>
        
    )
}

export default Sidebar;