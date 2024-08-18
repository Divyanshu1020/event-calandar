import { Dayjs } from "dayjs"
import Day from "./Day"
import AddEvent from "./AddEvent"
import { useCalandar } from "../hooks/useCalandar"

function Month({month}: {month: Dayjs[][]}) {
  const { showAddEvent} = useCalandar()
  return (
    <div className=" flex-1 relative h-full">
    {showAddEvent && <AddEvent/>}
    <div className=" grid grid-cols-7 grid-rows-5 max-h-[30rem] md:min-h-full">
      {
        month.map((week, indexWeek) => (
  
            
              week.map((day, indexDay) => (
                <Day
                  key={indexDay}
                  day={day}
                  rowIndex={indexWeek}
                />
              ))
            
          
        ))
      }

    </div>
    </div>
  )
}

export default Month