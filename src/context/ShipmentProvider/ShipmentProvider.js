import { useState, createContext } from "react";
import Client from "../../api/Client";

export const ShipmentContext = createContext();

export const ShipmentProvider = (props) => {
  const [allShipments, setAllShipments] = useState();
  const [allNewShipments, setAllNewShipments] = useState();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getAllShipments = async () => {
    await Client.get(`/allshipment/${currentUser.id}`)
      .then((response) => {
        setAllShipments(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all shipments");
      });
  };

  const getAllNewShipments = async () => {
    await Client.get(`/allNewshipment/${currentUser.id}`)
      .then((response) => {
        setAllNewShipments(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all New shipments");
      });
  };
  return (
    <ShipmentContext.Provider
      value={{
        allShipments,
        getAllShipments,
        allNewShipments,
        getAllNewShipments,
      }}
    >
      {props.children}
    </ShipmentContext.Provider>
  );
};
