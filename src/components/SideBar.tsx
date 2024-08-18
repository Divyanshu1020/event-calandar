import EventCreateBtn from "./EventCreateBtn";
import Labels from "./Labels";
import SmallCalendar from "./SmallCalendar";

export default function SideBar({ showSideBar }: { showSideBar: boolean }) {
  return (
    <aside className={` ${showSideBar ? "absolute" : "hidden"} z-10 bg-white md:block md:w-1/4 lg:relative lg:w-42 min-w-64 border p-5 w-full h-[calc(100vh-64px)]`}>
        <EventCreateBtn/>
        <SmallCalendar/>
        <Labels />
    </aside>
  )
}
