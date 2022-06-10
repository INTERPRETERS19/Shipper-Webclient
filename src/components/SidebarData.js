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
    path: "/shipments",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Summary",
        path: "/shipment/summary",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
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
        path: "/reports/reports3",
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
    path: "/returns",
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
        title: "Pending Returns",
        path: "/returns/pendingreturns",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "All Returns",
        path: "/shipments/allshipments",
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
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Summary",
        path: "/pickups/pickuprequests",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },

  {
    title: "Orders",
    path: "/orders",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Pending Orders",
        path: "/orders/pending",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Generate Order URL",
        path: "/orders/generate",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Order URL List",
        path: "/orders/list",
        icon: <IoIcons.IoMdHelpCircle />,
      },
    ],
  },
];
