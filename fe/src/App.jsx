import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "components/Sidebar"
import Toast from "components/Toast"
import Loading from "components/Loading"
import { useRef } from "react"

function App() {

  const page = useRef()
  const scrollTop = () => {
    page.current.scrollTo(0, 0)
  }

  return (
    <div className="w-full relative">
      <Sidebar />
      <div ref={page} className="left-[300px] fixed top-0 right-0 bottom-0 overflow-auto">
        <Header />
        <div>
          <Outlet context={scrollTop}/>
        </div>
      </div>
      <Toast />
      <Loading />
    </div>
  )
}

export default App
