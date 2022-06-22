import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Shipments",
    path: "sh",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Shipments",
        path: "/shipment/addshipments",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "All Shipments",
        path: "/shipments/allshipments",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "New Shipments",
        path: "/shipments/newshipments",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Track",
        path: "/reports/reports3",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Reports",
        path: "/reports/reports3",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Returns",
    path: "sh",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Summary",
        path: "/returns/summary",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "All Returns",
        path: "/returns/allreturns",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Reports",
        path: "/returns/reports",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Pickups",
    path: "sh",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Pickup Request",
        path: "/pickups/pickuprequests",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  {
    title: "Account Settings",
    path: "sh",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Edit Profile",
        path: "/settings/prof",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Change Password",
        path: "/settings/changepassword",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
