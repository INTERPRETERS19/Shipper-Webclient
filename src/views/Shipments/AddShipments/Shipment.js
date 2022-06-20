const KEYS = {
  Shipments: "Shipments",
  shipmentId: "shipmentId",
};

export const getDistrict = () => [
  { id: "Colombo", title: "Colombo" },
  { id: "Jaffna", title: "Jaffna" },
  { id: "Galle", title: "Galle" },
  { id: "Kandy", title: "Kandy" },
  { id: "Kalutara", title: "Katutara" },
  { id: "Gampaha", title: "Gampaha" },
  { id: "Ampara", title: "Ampara" },
];

export const getCity = () => [
  { id: "Colombo", title: "Colombo" },
  { id: "Jaffna", title: "Jaffna" },
  { id: "Galle", title: "Galle" },
  { id: "Kandy", title: "Kandy" },
  { id: "Kalutara", title: "Katutara" },
  { id: "Gampaha", title: "Gampaha" },
  { id: "Ampara", title: "Ampara" },
];

export const getPrepaid = () => [
  { id: "Yes", title: "Yes" },
  { id: "No", title: "No" },
];

export const getHandling = () => [
  { id: "Standard", title: "Standard" },
  { id: "Fragile", title: "Fragile" },
];

export const getPayment_method = () => [
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

// export function insertShipments(data) {
//     let Shipments=getAllShipments();
//     data['id'] = generateShipmentID()
//     Shipments.push(data)
//     localStorage.setItem(KEYS.Shipments,JSON.stringify(Shipments))
// }

// export function generateShipmentID() {
//     if (localStorage.getItem(KEYS.shipmentId) == null)
//         localStorage.setItem(KEYS.shipmentId, '0')
//     var id = parseInt(localStorage.getItem(KEYS.shipmentId))
//     localStorage.setItem(KEYS.shipmentId, (++id).toString())
//     return id;
// }

// export function getAllShipments() {
//     if (localStorage.getItem(KEYS.Shipments) == null)
//         localStorage.setItem(KEYS.Shipments, JSON.stringify([]))
//     return JSON.parse(localStorage.getItem(KEYS.Shipments));
// }
