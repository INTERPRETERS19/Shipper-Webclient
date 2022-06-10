import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//import * as FaIcons from "react-icons/fa";
import logo from "../../src/assets/logo.PNG";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: #071a2f;
  height: 60px;
  position: fixed;
  z-index: 100;
  width: 100vw;
  border-style: solid;
  border-width: 0.5px;
  border-bottom-color: #112c48;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0.01px 0.5px 2px rgb(255, 255, 255), 0.1em 0.1em 1em rgba(0, 0, 0, 0.5);
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #001e3c;
  width: 280px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 65px;

  ${"" /* left: ${({ sidebar }) => (sidebar ? "0" : "-100%")}; */}
  transition: 350ms;
  z-index: 10;
  overflow: auto;
  box-shadow: inset 0 3em 2em rgba(0, 0, 0, 0.1), 0 0 0 1px #071a2f,
    0.1em 0.1em 0.5em rgba(0, 0, 0, 0.8);
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff", size: 20 }}>
        <Nav>
          <div
            style={{
              display: "flex",
              flex: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                alignSelf: "center",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo" height="60" width="60" />
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: 24,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                textDecoration: "none",
              }}
            >
              IndexCloud
            </div>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
