import { useEffect, useState } from 'react'
import { getMonth } from './utils/getMonth'
import Month from './components/Month'
import CalandarHeader from './components/CalandarHeader'
import { useCalandar } from './hooks/useCalandar'
import SideBar from './components/SideBar'
import AddEvent from './components/AddEvent'

function App() {
  const [currentMonth, setMonthIndex] = useState(getMonth())
  const [showSideBar, setShowSideBar] = useState(false)
  const {monthIndex} = useCalandar()
  useEffect(()=>{
    setMonthIndex(getMonth(monthIndex))
  },[monthIndex])
  return (

    <main>
    <div className="h-screen flex flex-col relative">
      
      <CalandarHeader setShowSideBar={setShowSideBar} />
      <div className="flex flex-1">
        <SideBar showSideBar={showSideBar} />
        <Month month={currentMonth} />
      </div>
    </div>
  </main>
  )
}

export default App
