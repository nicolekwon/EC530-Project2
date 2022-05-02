import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
const Navbar = () => {
    return (
            <Nav>
                <NavLink to="/">
                    <h1>HEALTH APP</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/home' activeStyle>
                        HOME
                    </NavLink>
                    <NavLink to='/devices' activeStyle>
                        DEVICES
                    </NavLink>
                    <NavLink to='/chat' activeStyle>
                        CHAT
                    </NavLink>
                    <NavLink to='/signup' activeStyle>
                        SIGN UP
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/signin'>SIGN IN</NavBtnLink>
                </NavBtn>
            </Nav>
    );
};
    
export default Navbar;