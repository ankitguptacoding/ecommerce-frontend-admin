import React, { useEffect, useState } from "react";
import {useSelector } from 'react-redux';
import PageNotFound from "./PageNotFound";
import Profile from "./UserProfile";

function Protected(props){
    const Route = props.ProRoute;
    const routeName = props.routeName;
    const [valid ,setVaild] = useState(false);
    const user = useSelector(state =>state);
    let userInfo = user.userInfo[0];
    let permission = userInfo.permission;
    console.log("permission",permission.length);
    console.log("routeName",routeName);
    console.log("component",props);
    

    useEffect(()=>{
        permissionCheck();
    })

    const permissionCheck = ()=>{
        if(permission.length){
            let access = permission.includes(routeName);
            
                setVaild(access); 
        }
    }
   
   
    return(
        <div> { permission.length ?
               valid?<Route />:<Profile /> 
            : <Route />
            }
           
        </div>
    )
}

export default Protected;