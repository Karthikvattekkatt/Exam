import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom'
import "../App.css"
import ictlogo from "../ictlogo.png";

const Sidebar = () => {
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  let ActiveLink = 'activeLink'
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>

      <CDBSidebar textColor="#fff" backgroundColor="#000">
        {/* Header of the Sidebar */}
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
            <img src={ictlogo} alt="logo" style={{ height: '3vmin' }} /> TODO
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
       

            {/* Task Link */}
            <NavLink
              exact
              to="/thome"
            >
             
                  <CDBSidebarMenuItem >
                    Tasks
                  </CDBSidebarMenuItem>
  
            </NavLink>
            

          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  )
}

export default Sidebar