import { useCalandar } from "../hooks/useCalandar";

export default function EventCreateBtn() {
const {setShowAddEvent} = useCalandar()
  return (
    <button
      onClick={() => {setShowAddEvent(true)}}
      className="border p-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-2xl"
    >
      <span className="material-icons-outlined cursor-pointer  text-4xl">add_circle</span>
      <span className=" pr-2 text-xl font-semibold"> Create</span>
    </button>
  );
}
