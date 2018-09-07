import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    
    var nav = props.user ? 
        <nav>
            <Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
        </nav>
    :
        <nav>
            <Link class="grad2" to="/login" >Log In</Link>
            <Link class="grad1" to="/signup">Sign Up</Link>
        </nav>;
    return (
        <div>
            {nav}
        </div>
    );
    
}

export default NavBar;