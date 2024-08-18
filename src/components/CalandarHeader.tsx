import dayjs from "dayjs";
import { useCalandar } from "../hooks/useCalandar";

export default function CalandarHeader({setShowSideBar}:{setShowSideBar: (val:boolean)=>void}) {
  const { monthIndex, setMonthIndex } = useCalandar();



  const handleShowSideBar = () => {
    setShowSideBar((pre:boolean)=>(!pre))
  }
  const handleReset = () => {
    setMonthIndex(dayjs().month())
  };
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  return (
    <header className="px-4 py-2 flex flex-row items-center border">
      {/* <img src={logo} alt="calendar" className="mr-2 w-12 h-12" /> */}
      <button className=" min-w-10 h-10 bg-slate-500 rounded-xl flex flex-col items-center mr-3"
        onClick={handleReset}
        >
        <div className="text-white text-[10px] uppercase font-semibold h-4 text-center w-full rounded-t-xl bg-red-300">
          <p>{dayjs().format("MMM")}</p>
        </div>
        <div className="text-white text-lg font-bold flex flex-row items-center justify-center">
          <p>{dayjs().format("DD")}</p>
        </div>
      </button>
      <h1 className=" lg:mr-10 text-2xl text-gray-500 font-bold">Calendar</h1>
      <button onClick={handleReset} className=" hidden lg:block border rounded py-2 px-4 mx-5">
        Today
      </button>
      <button  className=" flex flex-row items-center justify-center" onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button className=" flex flex-row items-center justify-center" onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className=" hidden sm:block ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      <button className=" md:hidden ml-auto flex flex-row items-center justify-center" onClick={handleShowSideBar}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          menu
        </span>
      </button>
    </header>
  );
}
