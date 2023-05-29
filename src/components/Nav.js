import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userInfo } from './redux/slice/User'
import { useSelector } from 'react-redux';
import { sidebarHeading, userSetting } from '../helper';
import { FaUserAlt ,FaBars} from 'react-icons/fa';
import { BsJustify } from 'react-icons/bs';
import Sidebar from './dashboard/sidebar/Sidebar';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const user = useSelector(state => state);
    const [show, setShow] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    let userDetails = user.userInfo[0];
    console.log(userDetails,"--auth");


    const user_setting = () => {
        setShow(false);
        setSidebar(false)
    }
    return (
        <>
            <div>
                <Link to="/"><img alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0L4qOshgn9lrgFukS2-aWrrU34jvQ9NGXG5Zh8siQJZ70eZf9sYnjwGG7o5zPIkF0xwk&usqp=CAU' className='logo'></img></Link>
                <h4 className='company_name'><span>
                    Sh<span>o</span>ps
                </span></h4>

                {
                    userDetails.permission != undefined ? <Link className='sidebar_link' ><FaBars className='sidebar_icon' onClick={() => { setSidebar(!sidebar) }} /></Link> : null

                }

                {

                    auth ? <ul className='nav-ul nav-right'>
                        {
                            <li ><Link onClick={() => setShow(!show)}>< FaUserAlt />({JSON.parse(auth).name})</Link></li>
                        }
                    </ul>
                        : <ul className='nav-ul nav-right'></ul>

                }
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {
                <div className='rightsidemenu'>
                    {
                        show ? userSetting.map((setting) => {
                            return <div className='user_setting nav-right'>
                                <Link to={setting.route} onClick={user_setting}>
                                    <i ><setting.icon /></i>
                                    {setting.heading}</Link>

                            </div>
                        }) : null
                    }
                </div>
            }
            {
                sidebar ? <Sidebar data={"active_side_bar"}/> : <Sidebar data={"menu"}/>

            }
        </>
    )
}

export default Nav;