import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a shipments argument
const ReportComponent = (
  shipments,
  startDate,
  endDate,
  newShipments,
  pickupShipments,
  pendingShipments,
  deliveredShipments,
  rescheduledShipments,
  failToDeliveryShipments,
  totalShipments,
  totalCOD,
  totalDV
) => {
  // initialize jsPDF
  const doc = new jsPDF({ lineHeight: 1.7 });

  // define the columns we want and their titles
  const tableColumn = ["Id", "Recipient Name", "Description", "Status"];
  // define an empty array of rows
  const tableRows = [];

  // for each shipment pass all its data into an array
  shipments.forEach((shipment) => {
    const shipmentData = [
      shipment.id,
      shipment.recipient_name,
      shipment.description,
      shipment.current_status,
    ];
    // push each tickcet's info into a row
    tableRows.push(shipmentData);
  });

  // shipment title. and margin-top + margin-left
  doc.text("Shipment Report", 85, 20);
  doc.setDrawColor(0, 0, 0);
  doc.setFontSize(12);

  //   doc.setLineDash([10, 10], 0);
  //   doc.line(20, 25, 60, 25);
  doc.setLineWidth(0.2);
  doc.line(14, 46, 190, 46); // horizontal line
  doc.line(14, 54, 190, 54);
  doc.line(14, 61, 190, 61);
  doc.line(14, 69, 190, 69);
  doc.line(14, 76, 190, 76);
  //   doc.line(14, 83, 190, 83);
  //   doc.line(14, 92, 190, 92);
  let details = [
    `Duration ${startDate} - ${endDate}`,
    ``,
    `No of New Shipmets: \t${newShipments}`,
    `No of Picked Up Shipmets: \t${pickupShipments}`,
    `No of Pending shipments: \t${pendingShipments}`,
    `No of Delivered shipments: \t${deliveredShipments}`,
    `No of Rescheduled shipments: \t${rescheduledShipments}`,
    `No of fail to delivery Shipments: \t${failToDeliveryShipments}`,
    `No of Total shipments: \t${totalShipments}`,
    ``,

    `COD amount: \tLKR ${totalCOD}`,
    `DV amount: \tLKR ${totalDV}`,
  ];
  doc.text(details, 14, 30);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 120 });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default ReportComponent;
