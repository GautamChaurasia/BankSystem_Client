import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { Share } from "./Share"
import logo from './res/images.jpg'

const NavBar = () => {

    const {value} = useContext(Share)

    return(
        <>
        <div className='bg-dark'>
            <div className="navbar ctm">
            <NavLink to='/'>Home</NavLink>{' '}
            {!value && <><NavLink to='/login'>LogIn</NavLink>{' '}
            <NavLink to='/register'>Register</NavLink></> }
            {value && <NavLink to='/logout'>LogOut</NavLink>}
            </div>
        </div>
        <div className='bg'>
        <center><img src={logo} alt='Bank Logo'/>
        <h3 style={{'marginBottom':'15px', 'color':'#46b38e'}}>Bank</h3></center>
        </div>
        </>
    )
}

export default NavBar