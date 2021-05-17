import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { startLogout } from "src/actions/auth";
import { FaSignOutAlt } from "react-icons/fa";

import defaultUser from "src/assets/images/default-user.jpg";

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const { imageUrl } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(startLogout());
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={imageUrl ? imageUrl : defaultUser}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu
        className="pt-0"
        placement="bottom-end"
        modifiers={[10, 10]}
      >
        <CDropdownItem divider />
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Perfil</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Ver perfil
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Ajustes
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Ayuda</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-closed" className="mfe-2" />
          Contacto
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          FAQ
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logoutHandler}>
          <FaSignOutAlt className="mfe-2" />
          Salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
