import { useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { BoardProvider } from "./context"
import router from "./routes"


const App = () => {
  const { theme } = useSelector(state => state.images)

  return (
    <ThemeProvider {...{ theme }}>
      <BoardProvider>
        <RouterProvider {...{ router }} />
      </BoardProvider>
    </ThemeProvider>
  )
}

export default App
