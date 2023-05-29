import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../configs/config";
import { sweetAlert } from "../helper";
import { useParams } from "react-router-dom";

const UpdateProduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category ,setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    let token = JSON.parse(localStorage.getItem("token"));
    let id = params.id;
    useEffect(() => {
        if (!auth) {
            navigate('/');
        }else{
            
            getProduct(id);
        }
    }, [])


    const config = {
        headers:{
            "content-type": 'application/json',
            "Authorization": token
        }
      };
      
    const getProduct = async(id)=>{
        const url = `${apiBaseUrl}api/product/${id}`;
        const result = await axios.get(url,config);
        setName(result.data.data.name);
        setPrice(result.data.data.price);
        setCategory(result.data.data.category);
        setCompany(result.data.data.company);
        console.log(result);

    }


    const updateProduct = async(e)=>{

        if(!name || !price || !category || !company ) {
            setError(true);
            return false;
        }
        e.preventDefault();
        console.log("user",auth);
        let userId = JSON.parse(auth).userId;
        console.log(auth);
        const url = `${apiBaseUrl}api/product/${id}`
        console.log(name,price,category,company);
        const Product = { name: name, price: price, category: category, company: company,userId: userId};
        const result = await axios.put(url, Product,config);
        const msg = result.data.message;
        let status = result.data.status;
        sweetAlert(msg,status);
        if (status) {
            navigate("/");
        }

    }

    return(
        <div className="product">
        <h1>Update Product</h1>
        <input type= "text" placeholder="Enter Product Name"  className="inputBox" onChange={(e)=>{setName(e.target.value)}} value={name}/>
        {error && !name && <span className="invalid-input">Enter vaild name</span>}
        <input type= "text" placeholder="Enter Product Price"  className="inputBox" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
        {error && !price && <span className="invalid-input">Enter vaild price</span>}
        <input type= "text" placeholder="Enter Product Category"  className="inputBox" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
        {error && !category && <span className="invalid-input">Enter vaild category</span>}
        <input type= "text" placeholder="Enter Product Company" className="inputBox" onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
        {error && !company && <span className="invalid-input">Enter vaild company</span>}
        <button type="button" onClick={updateProduct} className="appButton">Update Product</button>
    </div>
    )
}
export default UpdateProduct;