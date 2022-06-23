// import React from "react";
// import { Link } from "react-router-dom";
// import shipment from "../../../Shipper-server/models/shipment";

// const Rcomponent = ({ shipments }) => {

// // a function that assigns bootstrap styling classes based on 
// // the status of the ticket
//   const assignColorToShipmentStatus = shipment => {
//     if (shipment.current_status
//         === "failToDeliver") {
//       return "p-3 mb-2 bg-success text-white";
//     } else if (shipment.current_status === "OutForDelivery") {
//       return "p-3 mb-2 bg-warning text-dark";
//     } else if (shipment.current_status === "PickUp") {
//       return "p-3 mb-2 bg-light text-dark";
//     }
//   };
//   return (
//     <div className="container">
//       {shipments.length === 0 ? (
//         "You currently have no shipments created"
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Id</th>
//               <th scope="col">Reciepient</th>
//               <th scope="col">Description</th>
//               <th scope="col">Status</th>
//               <th scope="col"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {shipments.map(ticket => (
//               <tr key={shipment.id}>
//                 <td>{shipment.id}</td>
//                 <td>{shipment.recipient_name}</td>
//                 <td>{shipment.description}</td>
//                 <td className={assignColorToShipmentStatus(shipment)}>
//                   {shipment.current_status}
//                 </td>
//                 <td>
//                   <Link to={`/shipment/${shipment.id}`}>See comments</Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Rcomponent;