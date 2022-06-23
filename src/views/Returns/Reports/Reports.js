// import React, { useEffect, useState } from "react";
// import shipment from "../../../../../Shipper-server/models/shipment";
// import ReportComponent from "../../../components/ReportComponent";
// import Rcomponent from "../../../components/Rcomponent";
// import axios from "axios";

// const Reports = () => {
  
//   const [shipments, setShipments] = useState([]);
  

//   useEffect(() => {
//     const gettAllShipments = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/shipments");
//         setShipments(response.data.shipments);
//       } catch (err) {
//         console.log("error");
//       }
//     };
//     gettAllShipments();
//   }, []);

// const reportShipments = shipments.filter(shipment =>shipment.current_status=== "failToDeliver");
  
//   return (
//     <div>
//       <div className="container mb-4 mt-4 p-3">
//         <div className="row">
//           {"shipper_details" === "" ? (
//             <> </>
//           ) : (
//             <button
//               className="btn btn-primary"
//               onClick={() => ReportComponent(reportShipments)}
//             >
//               Generate monthly report
//             </button>
//           )}
//         </div>
//       </div>
//       <Rcomponent shipments={shipments} />
//     </div>
//   );
// };

// export default Reports;