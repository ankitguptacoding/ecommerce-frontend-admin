import React, { useEffect, useState } from "react"; 
import { apiBaseUrl, config } from "../configs/config";
import axios from "axios";
import { Input, Card, CardBody, CardHeader, Col, Row, Label, FormGroup, Button, Form } from 'reactstrap';
import {useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../helper";

const Profile = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [mobile ,setMobile] = useState("");
    const [permission ,setPermission] = useState([]);
    const [id, setId] = useState();
    const auth = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate;
    const user = useSelector(state =>state);
    let token = JSON.parse(localStorage.getItem("token"));
    useEffect(()=>{
        checkAuth()
    },[])

    const checkAuth = () => {
        if (!auth) {
            navigate('/logout');
        }else{
            getUser();
        }
    }

    const config = {
        headers:{
            'content-type': 'application/json',
            Authorization: token
        }
      }
        const getUser = async()=>{

            console.log(">>>data", user);
            let userInfo = user.userInfo[0];    
            if(userInfo!== undefined){
                setName(userInfo.name);
                setEmail(userInfo.email);
                setType(userInfo.type);
                setPermission(userInfo.permission);
                setMobile(userInfo.mobile);
                setId(userInfo._id);
            }
        }

        const updateUser = async(id)=>{

            let url =`${apiBaseUrl}api/user/${id}`
            let data = {
                "email": email,
                "name": name,
                "mobile": mobile
            }

            let result = await axios.put(url,data,config);
            let status = result.data.status;
            let sucess = result.data.sucess;
            let msg = result.data.message;
            sweetAlert(msg,status);
            console.log("status profile",status);
            if(sucess == false) {
                localStorage.clear();
                navigate('/login');
                
            }
        }
    

    return(
        
      <div className="animated fadeIn">
        <Row>
            <Col lg={12}>
                <Card>
                    <CardHeader className="card_header">
                        <strong><i className="icon-info pr-1">Profile </i></strong>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" value={name}  onChange={(event)=>{setName(event.target.value)}}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" name="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="mobile">Mobile</Label>
                                <Input type="text" name="mobile" value={mobile} onChange={(event)=>{setMobile(event.target.value)}}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="type">Type</Label><br></br>
                                <Input type="text" name="permission" value={type} ></Input>          
                            </FormGroup>
                            <FormGroup>
                                <Label for="permission">Permission</Label><br></br>
                                <Input type="text" name="permission" value={permission} ></Input>
                            </FormGroup>
                            <div className="card_footer">
                            <Button className="btn" onClick={()=>{
                                updateUser(id)
                            }} >Update Profile</Button>
                            </div>
                            
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
      </div>
    )
}


export default Profile;