import { useState, createContext } from "react";
import Client from "../../api/Client";

export const ShipmentContext = createContext();
export const ShipmentProvider = (props) => {
  const [allShipments, setAllShipments] = useState();
  const [loading, setLoading] = useState(true);
  const [allNewShipments, setAllNewShipments] = useState();
  const [allPickups, setAllPickups] = useState();
  const [allReturnShipments, setAllReturnShipments] = useState();
  const [alldeliveredShipments, setAlldeliveredShipments] = useState();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getAllShipments = async () => {
    await Client.get(`/allshipment/${currentUser.id}`)
      .then((response) => {
        setAllShipments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to get all shipments");
      });
  };

  const getAllNewShipments = async () => {
    await Client.get(`/allNewshipment/${currentUser.id}`)
      .then((response) => {
        setAllNewShipments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to get all New shipments");
      });
  };

  const getAllPickups = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    await Client.get(`/allpickup/${currentUser.id}`)
      .then((response) => {
        setAllPickups(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to get all Pickups");
      });
  };
  const getAlldeliveredShipments = async () => {
    await Client.get(`/delivered/${currentUser.id}`)
      .then((response) => {
        setAlldeliveredShipments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to get all Delivered shipments");
      });
  };

  const getAllReturnShipments = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    await Client.get(`/returns/${currentUser.id}`)
      .then((response) => {
        setAllReturnShipments(response.data);
        setLoading(false);
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
        allPickups,
        getAllPickups,
        getAllReturnShipments,
        allReturnShipments,
        getAlldeliveredShipments,
        alldeliveredShipments,
      }}
    >
      {props.children}
    </ShipmentContext.Provider>
  );
};
