
import Swal from 'sweetalert2';
import { UilEstate, UilClipboardAlt, UilUsersAlt, UilPackage, UilChart } from "@iconscout/react-unicons";
import { ImProfile } from 'react-icons/im'
import { IoMdLogOut } from 'react-icons/io';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';



const sweetAlert = (msg,status,type)  => {
    Swal.fire({
      position: 'top-end',
      icon: type,
      title: msg,
      showConfirmButton: status,
      timer: 1500
    })
}


const sidebarHeading = [
      {
        icon: UilEstate,
        heading: "Dashboard",
        Link:"/"
      },
      {
        icon: UilClipboardAlt,
        heading: "Product",
        Link:"/product_list"
      },
      {
        icon: BsFillGrid3X3GapFill,
        heading: "Add Product",
        Link:"/add_product"
      },
      {
        icon: UilPackage,
        heading: "Profile",
        Link:"/profile"
      },
      {
        icon: UilChart,
        heading: "Role & Permission",
        Link:"/role"
      }

  ]
const  userSetting = [
  {
    icon: ImProfile,
    heading: "Profile",
    route : "/profile"
  },
  {
    icon: IoMdLogOut,
    heading: "Logout",
    route : "/logout"
  }
]

export {
    sweetAlert,
    sidebarHeading,
    userSetting
}