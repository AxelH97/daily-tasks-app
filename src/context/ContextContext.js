// import React, { createContext, useState, useContext } from 'react';


// const CalendarContext = createContext();

// export const CalendarProvider = ({ children }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [events, setEvents] = useState([]);

//   const addEvent = (event) => {
//     setEvents([...events, event]);
//   };

//   const removeEvent = (eventId) => {
//     setEvents(events.filter((event) => event.id !== eventId));
//   };

//   return (
//     <CalendarContext.Provider
//       value={{
//         selectedDate,
//         setSelectedDate,
//         events,
//         addEvent,
//         removeEvent,
//       }}
//     >
//       {children}
//     </CalendarContext.Provider>
//   );
// };

// export const useCalendar = () => useContext(CalendarContext);

