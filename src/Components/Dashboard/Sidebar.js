import React, { useState } from "react";
import "./Sidebar.css";
import {FaTh, FaBars, FaUsers, FaUserTie, FaBuilding, FaHandsHelping} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUsers />,
    },
    {
      path: "/leads",
      name: "Leads",
      icon: <FaUserTie />,
    },
    {
      path: "/contacts",
      name: "Contacts",
      icon: <FaBuilding />,
    },
    {
      path: "/serviceRequest",
      name: "Service Request",
      icon: <FaHandsHelping />,
    },
  ];
  return (
    <>
      <div className="nav flex-column sticky-top pt-5 mt-3 bg-dark">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              CRM App
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
