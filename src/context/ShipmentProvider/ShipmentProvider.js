import { useState, createContext } from "react";
import Client from "../../api/Client";

export const ShipmentContext = createContext();
const currentUser = JSON.parse(localStorage.getItem("user"));
export const ShipmentProvider = (props) => {
  const [allShipments, setAllShipments] = useState();
  const [allNewShipments, setAllNewShipments] = useState();
  const [allReturnShipments, setAllReturnShipments] = useState();

  const getAllShipments = async () => {
    await Client.get("/allshipment")
      .then((response) => {
        setAllShipments(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all shipments");
      });
  };

  const getAllNewShipments = async () => {
    await Client.get(`/allnewshipment/${currentUser.id}`)
      .then((response) => {
        setAllNewShipments(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all New shipments");
      });
  };

  const getAllReturnShipments = async () => {
    await Client.get(`/returns/${currentUser.id}`)
      .then((response) => {
        setAllReturnShipments(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all Return shipments");
      });
  };
  return (
    <ShipmentContext.Provider
      value={{
        allShipments,
        getAllShipments,
        allNewShipments,
        getAllNewShipments,
        getAllReturnShipments,
        allReturnShipments,
      }}
    >
      {props.children}
    </ShipmentContext.Provider>
  );
};
