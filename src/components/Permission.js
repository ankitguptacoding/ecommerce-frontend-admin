import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import { apiBaseUrl } from "../configs/config";
import { sweetAlert } from "../helper";
import axios from "axios";


const RoleAndPermission = (props) => {
    const [name, setName] = useState([]);
    const [user, setUser] = useState([]);
    const [id ,setId] = useState();
    const [permission, setPermission] = useState([]);
    const allComponents = ["Products", "Add Product", "Profile", "Role & Permission"];
    const auth = localStorage.getItem("user");
    let token = JSON.parse(localStorage.getItem("token"));
    let navigate = useNavigate();
    let [result, setResult] = useState([]);
    

    const config = {
        headers:{
            "content-type": 'application/json',
            "Authorization": token
        }
      };
      
    useEffect(()=>{
        if (!auth) {
            navigate('/');
        } else{
            getPermission();
        }

    },[])

    const getPermission = async()=>{
        const url = `${apiBaseUrl}api/users`;
        let res = await axios.get(url,config);
        res = res.data.data;
        console.log("resuot",res);
        if(res!==undefined & res.length>0)
        {
          
            let userEmail = [];
            for await(let user of res){
                userEmail.push(user.email);
            }
            setUser(userEmail);  
            setResult(res);
        }

    }

    const permissionList = async(event)=>{
        setName(event);
        console.log("event",event);
        console.log("res",result);
        let userData = result.find(({ email }) => email == event[0]);
        setPermission(userData.permission);
        setId(userData._id);

    }

    const handlePermission = async() => {
        const userPemission = {  permission };
        console.log("userPermission", userPemission);
        const url = `${apiBaseUrl}api/user/${id}`;
        let result = await axios.put(url,userPemission,config);
        const msg = result.data.message;
        let status = result.data.status;
        sweetAlert(msg,status);
        if(status) {
            navigate("/");
        }

    }
    return (
        <div className="permission">
            <h2>Give Permission For user</h2>
            <Multiselect
                isObject={false}
                onRemove={(event) => { permissionList(event) }}
                onSelect={(event) => { permissionList(event)}}
                options={user}
                placeholder="Select User"
                showArrow
                singleSelect
                className='inputBox'
            />
            <Multiselect
                isObject={false}
                onRemove={(event) => { setPermission(event) }}
                onSelect={(event) => { setPermission(event) }}
                options={allComponents}
                showCheckbox 
                className='inputBox'
                selectedValues={permission}
                placeholder=" "
                showArrow
            />
            <button className='appButton' onClick={handlePermission} type='button' >Save</button>

        </div>


    )
}

export default RoleAndPermission;