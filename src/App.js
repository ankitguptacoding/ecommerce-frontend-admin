
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import ProductDetails from './components/ProductDetails';
import PageNotFound from './components/PageNotFound';
import Permission from './components/Permission';
import Profile from './components/UserProfile';
import Protected from './components/Protected';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Sidebar from './components/dashboard/sidebar/Sidebar';

// import { AuthProvider} from "./context"


function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<Protected ProRoute = {Dashboard} routeName = "Dashboard" />}/>
        <Route path='/product_list' element={<Protected ProRoute = {ProductList} routeName = "Product"/>}/>
        <Route path='/add_product' element={<Protected ProRoute = {AddProduct} routeName = "Add Product"/>}/>
        <Route path='/update/:id' element={<Protected ProRoute = {UpdateProduct} routeName = "Update"/>}/>
        <Route path='/role' element={<Protected ProRoute = {Permission} routeName = "Role & Permission"/>}/>
        <Route path='/profile' element={<Protected ProRoute = {Profile} routeName = "Profile"/>}/>
        
        <Route path='/details/:id' element={<Protected ProRoute = {ProductDetails} routeName = "Details"/>}/>

        </Route>
        <Route path="*" element={<PageNotFound />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
