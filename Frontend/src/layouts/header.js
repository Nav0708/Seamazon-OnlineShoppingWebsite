import React from "react";
import logo from '../logo.png';
import {NavLink} from 'react-router-dom';

const header = () =>{
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink to='/' class="navbar-brand" href="#"><img src={logo} alt="Logo" style={{ marginLeft: '10px', marginTop: '10px', width: '250px', height: '100px' }} /> </NavLink>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink to='/' className="nav-link active">
                                    Home
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/login' className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/signUp' className="nav-link">
                                    Sign Up
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/shoppingcart' className="nav-link">
                                    Shopping cart 
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
     </>
    )
} 
export default header;