import dayjs, { Dayjs } from "dayjs";
import  { useEffect, useState } from "react";
import { useCalandar } from "../hooks/useCalandar";
import { getMonth } from "../utils/getMonth";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalandarMonthIndex,
    smallCalandarDaySelected,
    setSmallCalandarDaySelected,
} = useCalandar()

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day : Dayjs) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = smallCalandarDaySelected && smallCalandarDaySelected.format(format);  
    if (nowDay === currDay) {
      return "bg-gray-800  text-white font-bold hover:bg-gray-800";
    } else if (currDay === slcDay) {
      return "bg-gray-600  text-white font-bold hover:bg-gray-600";
    } else {
      return "";
    }

  }
  return (
    <div className="mt-9 bg-white max-w-56 md:max-w-full border rounded-xl p-2">
      <header className="flex justify-between">
        <p className="text-gray-500 ml-2 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            "MMMM YYYY"
          )}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 gap-1">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row,) => (
            row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                    setSmallCalandarMonthIndex(currentMonthIdx);
                    setSmallCalandarDaySelected(day);
                }}
                className={`py-1 w-full rounded-lg hover:bg-gray-300 ${getDayClass(day)}`}
              >
                <span className="text-sm ">{day.format("D")}</span>
              </button>
            ))
        ))}
      </div>
    </div>
  );
}