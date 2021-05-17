import React from "react";
import CIcon from "@coreui/icons-react";
import { FaThermometer, FaUserInjured } from "react-icons/fa";

const _navDoctors = [
  {
    _tag: "CSidebarNavItem",
    name: "Panel principal",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Dispositivos",
    to: "/devices",
    icon: <FaThermometer className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar nuevo dispositivo",
        to: "/devices/register-new-device",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Ver todos los dispositivos",
        to: "/devices/view-all-devices",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pacientes",
    to: "/patients",
    icon: <FaUserInjured className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar nuevo paciente",
        to: "/patients/register-new-patient",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Ver todos los pacientes",
        to: "/patients/view-all-patients",
      },
    ],
  },
];

export default _navDoctors;
