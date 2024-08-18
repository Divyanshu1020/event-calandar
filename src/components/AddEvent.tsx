import { useEffect, useState } from "react";
import { useCalandar } from "../hooks/useCalandar";

const labelsClasses = [
  "bg-indigo-500",
  "bg-gray-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-purple-500",
];

export default function AddEvent() {
  const {
    setShowAddEvent,
    smallCalandarDaySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useCalandar();

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [selectedLabelName, setSelectedLabelName] = useState(selectedEvent ? selectedEvent.labelName : "")
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const calendarEvent = {
    //     title,
    //     description,
    //     label: selectedLabel,
    //     day: smallCalandarDaySelected?.valueOf(),
    //     id: selectedEvent ? selectedEvent.id : Date.now(),
    // };

    // console.log(calendarEvent);

    const checkBoxColor = "accent-"+selectedLabel?.split("-")[1]+"-500"


    if (selectedEvent) {
      dispatchCalEvent({
        type: "update",
        payload: {
          title,
          description,
          label: selectedLabel as string,
          labelName: selectedLabelName,
          checkBoxColor:checkBoxColor as string,
          day: smallCalandarDaySelected?.valueOf() as number,
          id: selectedEvent?.id,
        },
      });
    } else {
      dispatchCalEvent({
        type: "push",
        payload: {
          title,
          description,
          label: selectedLabel as string,
          checkBoxColor:checkBoxColor as string,
          labelName: selectedLabelName,
          day: smallCalandarDaySelected?.valueOf() as number,
          id: Date.now() as number,
        },
      });
    }

    setShowAddEvent(false);
  }
  useEffect(() => {
      setSelectedLabelName(selectedLabel?.split("-")[1] as string)
  },[selectedLabel])
  return (
    <div className=" w-full h-full bg-transparent absolute flex flex-col items-center p-4  justify-center">
      {/* <div className=" h-full w-full md:h-5/6 md:w-5/6 rounded-lg bg-purple-100 absolute"> */}
      <form
        className="bg-white  h-full w-full md:h-fit md:w-2/6 rounded-lg shadow-2xl "
        onSubmit={handleSubmit}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowAddEvent(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowAddEvent(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="py-3 px-4">
          <div className="grid grid-cols-[1fr_5fr] items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{smallCalandarDaySelected?.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
            <span className="material-icons-outlined text-gray-400">
            label
            </span>
            <div className="flex gap-x-2">
            <input
              type="text"
              name="labelName"
              placeholder="Add a Label Name"
            //   defaultValue={selectedLabel?.split("-")[1]}
              value={selectedLabelName}
              required
              className="pt-3 border-0 capitalize text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setSelectedLabelName(e.target.value)}
            />
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
    // </div>
  );
}
