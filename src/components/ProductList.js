import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from "../configs/config";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { sweetAlert } from "../helper";
import _ from 'lodash';
import ProductDetails from './ProductDetails';
import Nav from './Nav';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [data, setSingleData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const config = {
        headers:{
            'content-type': 'application/json',
            Authorization: token
        }
      };
    
    useEffect(() => {
     getProducts();
    },[])

    
    const getProducts = async () => {
        const url = `${apiBaseUrl}api/products`;
        let result = await axios.get(url,config);
        let status = result.data.sucess;
        result = result.data.data;
        if(result !== undefined) {
            setProducts(result);
        }else {
            setProducts([]);
            
        }
        if(status == false) {
            localStorage.clear();
            navigate('/login');
            
        }
       
    }

  const deleteProduct= async(_id)=>{
        const url = `${apiBaseUrl}api/product/${_id}`;
        let result = await axios.delete(url,config);
        let status = result.data.status;
        let msg = result.data.message;
      
        if (status) {
            
            getProducts();
        }
        sweetAlert(msg,status);
    }

    const productSearch = async (e)=>{
        let url = `${apiBaseUrl}api/search/?key=${e}`;
        let result ;
        if(_.isEmpty(e)) {

             url = `${apiBaseUrl}api/search`;
            
        }
        
        result = await axios.get(url,config);
        result = result.data.data;
       
        setProducts(result);
        }

    const viewModal = (e)=>{
        let data = JSON.parse(e)
        setSingleData(data)
        setShowModal(true);
    }

    return (
        
        <div className='product-list'>
            <h3>Product List</h3>
            <input type="text" placeholder="Search.." onChange={(event)=>{productSearch(event.target.value)}} className="search" />
            <table className='product-table'>
            <thead>
					<tr>
						<th>S.No</th>
						<th>Name</th>
						<th>Price</th>
                        <th>Category</th>
						<th>Company</th>
						<th>Operation</th>
					</tr>
				</thead>
            
            <tbody>
            { products.length>0 ? 
                products.map((data,index) => 
                <tr key={index}>
                <td>{index+1}</td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.category}</td>
                <td>{data.company}</td>
                <td>
                    <button onClick={()=>deleteProduct(data._id)} style={{marginRight:"5px"}}>Delete</button>
                    <Link to={"/update/"+data._id} ><button style={{marginRight:"5px"}} >Update</button></Link>
                    <button style={{marginRight:"5px"}} value={JSON.stringify(data)} onClick={(e)=>{viewModal(e.target.value)}} >View </button>
                </td>
            </tr>
                ) :  <tr>
                <td colspan="6"><h3 className='no-records'>No Records Founds</h3></td>
              </tr>
            }
            <ProductDetails showModal={showModal} setShowModal={setShowModal} data={data}/>
                
            </tbody>
            </table>
            
        </div>
        
    )
}

export default ProductList;