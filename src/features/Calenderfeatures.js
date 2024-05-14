// import React from "react";
// import { useCalendar } from "../context/ContextContext";

// const CalendarFeatures = () => {
//   const { selectedDate, events } = useCalendar();

//   function getEventsForSelectedDate() {
//     return events.filter(
//       (event) =>
//         event.date.getDate() === selectedDate.getDate() &&
//         event.date.getMonth() === selectedDate.getMonth() &&
//         event.date.getFullYear() === selectedDate.getFullYear() 
//     );
//   }

//   return (
//     <div>
//       {getEventsForSelectedDate().map((event) => (
//         <div key={event.id}>
//           <h2>{event.title}</h2>
//           <p>{event.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CalendarFeatures;
