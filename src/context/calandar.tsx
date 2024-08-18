import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import { createCalandarContext } from "./context";

export type Event = {
  title: string;
  description: string;
  label: string;
  labelName: string;
  checkBoxColor: string;
  day: number;
  id: number;
};

export type Action =
  | { type: "push"; payload: Event }
  | { type: "update"; payload: Event }
  | { type: "delete"; payload: { id: number } };

function savedEventsReducer(state: Event[], action: Action): Event[] {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}
const CalandarProvider = ({ children }: { children: ReactNode }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalandarMonthIndex, setSmallCalandarMonthIndex] = useState<
    null | number
  >(null);
  const [smallCalandarDaySelected, setSmallCalandarDaySelected] =
    useState<null | Dayjs>(dayjs());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [labels, setLabels] = useState<
    {
      label: string;
      labelName: string;
      checkBoxColor: string;
      checked: boolean;
    }[]
  >([]);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.labelName)
        .includes(evt.labelName)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalandarMonthIndex !== null) {
      setMonthIndex(smallCalandarMonthIndex);
    }
  }, [smallCalandarMonthIndex]);

  useEffect(() => {
    //     setLabels((prevLabels) => {
    //       return [...new Set(savedEvents.map((evt) => evt.labelName))].map(
    //         (label) => {
    //             console.log("label",label);
    //           const currentLabel = prevLabels.find(
    //             (lbl) => lbl.labelName === label
    //           );
    //           return {
    //             label,
    //             checkBoxColor: currentLabel ? currentLabel.checkBoxColor : "",
    //             labelName: currentLabel ? currentLabel.labelName : label,
    //             checked: currentLabel ? currentLabel.checked : true,
    //           };
    //         }
    //       );
    //     });

    //     // console.log(setLabels);

    //   }, [savedEvents]);

    setLabels((prevLabels) => {
      return [...new Set(savedEvents)].map(
        (label) => {
          console.log("label", label);
          const currentLabel = prevLabels.find(
            (lbl) => lbl.labelName === label.labelName
          );
          return {
            label : label.label,
            checkBoxColor: currentLabel ? currentLabel.checkBoxColor : label.checkBoxColor,
            labelName: currentLabel ? currentLabel.labelName : label.labelName,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });

  }, [savedEvents]);

  function updateLabel(label: {
    label: string;
    labelName: string;
    checkBoxColor: string;
    checked: boolean;
  }) {
    setLabels(
      labels.map((lbl) => (lbl.labelName === label.labelName ? label : lbl))
    );
  }

  return (
    <createCalandarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalandarMonthIndex,
        setSmallCalandarMonthIndex,
        smallCalandarDaySelected,
        setSmallCalandarDaySelected,
        showAddEvent,
        setShowAddEvent,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
      }}
    >
      {children}
    </createCalandarContext.Provider>
  );
};

export { CalandarProvider };
