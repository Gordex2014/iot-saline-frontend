import CIcon from "@coreui/icons-react";
import React from "react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Products",
    route: "/products",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All products",
        to: "/products/all-products",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add new products",
        to: "/products/add-new-products",
      },
    ],
  },
];

export default _nav;
