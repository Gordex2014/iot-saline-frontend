import React from "react";
import CIcon from "@coreui/icons-react";
import {
  FaBed,
  FaBuilding,
  FaThermometer,
  FaUserCog,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

const _navAdmins = [
  {
    _tag: "CSidebarNavItem",
    name: "Panel principal",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Médicos",
    to: "/doctors",
    icon: <FaUserMd className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar nuevo médico",
        to: "/doctors/register-new-doctor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Ver médicos activos",
        to: "/doctors/view-all-doctors",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Habitaciones",
    to: "/rooms",
    icon: <FaBuilding className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar nueva habitación",
        to: "/rooms/register-new-room",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Inspeccionar habitaciones",
        to: "/rooms/view-all-rooms",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Camas",
    to: "/beds",
    icon: <FaBed className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar nueva cama",
        to: "/beds/register-new-bed",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Inspeccionar camas",
        to: "/beds/view-all-beds",
      },
    ],
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
  {
    _tag: "CSidebarNavDropdown",
    name: "Administradores",
    to: "/admins",
    icon: <FaUserCog className="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "6",
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Registrar administrador",
        to: "/admins/register-new-admin",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Ver administradores activos",
        to: "/admins/view-all-admins",
      },
    ],
  },
];

export default _navAdmins;
