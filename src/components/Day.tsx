import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Event } from "../context/calandar";
import { useCalandar } from "../hooks/useCalandar";

export default function Day({
  day,
  rowIndex,
}: {
  day: Dayjs;
  rowIndex: number;
}) {
  const [dayEvents, setDayEvents] = useState<Event[]>([]);

  const {
    setShowAddEvent,
    setSmallCalandarDaySelected,
    setSelectedEvent,
    filteredEvents,
  } = useCalandar();

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-black text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border flex flex-col ">
      <header
        onClick={() => {
          setSmallCalandarDaySelected(day);
          setShowAddEvent(true);
          setSelectedEvent(null);
        }}
        className=" flex flex-col items-center cursor-pointer"
      >
        {rowIndex === 0 && (
          <p className="text-sm p-1 my-1 text-center">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>

      <div
        className=" cursor-pointer overflow-y-auto no-scrollbar"
        onClick={() => {
          setSmallCalandarDaySelected(day);  
          setShowAddEvent(true);
          console.log("add new");
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
              console.log("selected event", evt);
            }}
            className={`${evt.label}  px-1 mx-1 z-10   text-gray-600 text-sm rounded mb-1 truncate`}
          >
            <p className=" py-1 line-clamp-1 whitespace-nowrap text-nowrap text-stone-50 font-semibold capitalize  text-clip ">{evt.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
