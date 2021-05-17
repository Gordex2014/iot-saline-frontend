import {
  CContainer,
  CCreateElement,
  CImg,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import React from "react";
import { FaBriefcaseMedical, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// Default user profile pic
import defaultUser from "src/assets/images/default-user.jpg";
import { validRoles } from "src/types/types";
import adminNavigation from "./_nav.admins";
// sidebar nav config
import doctorNavigation from "./_nav.doctors";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.nav.sidebarShow);
  const { role, firstName, lastName, imageUrl } = useSelector((state) => state.auth);
  let navigation = [];

  if (role === validRoles.admin) {
    navigation = [...adminNavigation];
  } else {
    navigation = [...doctorNavigation];
  }

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <FaBriefcaseMedical size="30px" className="mr-3" />
        <h4>Iot Saline</h4>
      </CSidebarBrand>
      <CContainer>
        <CRow>
          <CImg
            src={imageUrl ? imageUrl : defaultUser}
            shape="rounded-circle"
            fluid
            height="75px"
            align="center"
            className="my-3 mx-2"
          />
        </CRow>
        <CRow className="justify-content-center my-2">
          <h6>
            {firstName} {lastName}
          </h6>
          <FaEdit className="ml-2" />
        </CRow>
      </CContainer>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
