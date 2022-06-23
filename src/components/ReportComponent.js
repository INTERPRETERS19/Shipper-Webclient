// import jsPDF from "jspdf";
// import "jspdf-autotable";
// // Date Fns is used to format the dates we receive
// // from our API call
// import { format } from "date-fns";

// // define a ReportComponent function that accepts a tickets argument
// const ReportComponent = shipments => {
//   // initialize jsPDF
//   const doc = new jsPDF();

//   // define the columns we want and their titles
//   const tableColumn = ["Id", "Recipient", "Description", "Status", "CreatedAt"];
//   // define an empty array of rows
//   const tableRows = [];

//   // for each ticket pass all its data into an array
//  shipments.forEach(shipment => {
//     const shipmentData = [
//       shipment.id,
//       shipment.recipient_name,
//       shipment.description,
//       shipment.current_status,
//       // called date-fns to format the date on the ticket
//       format(new Date(shipment.updated_at), "yyyy-MM-dd")
//     ];
//     // push each tickcet's info into a row
//     tableRows.push(shipmentData);
//   });


//   // startY is basically margin-top
//   doc.autoTable(tableColumn, tableRows, { startY: 20 });
//   const date = Date().split(" ");
//   // we use a date string to generate our filename.
//   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
//   // ticket title. and margin-top + margin-left
//   doc.text("Retrun shipments within the last one month.", 14, 15);
//   // we define the name of our PDF file.
//   doc.save(`report_${dateStr}.pdf`);
// };

// export default ReportComponent;