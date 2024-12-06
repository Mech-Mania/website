import Load from "./components/load/load"
import Gears from "./components/gears/gears"

function App() {
  return (
    <>
      <div className="gap-16 flex flex-col items-center justify-center h-screen w-screen bg-black">
        <Gears>
          <Load/>
        </Gears>
      </div>
    </>
  )
}

export default App