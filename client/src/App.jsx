import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./router/AppRoutes"
import LandingPage from "./pages/public/LandingPage";
function App() {
  return (
    <>
      <BrowserRouter>
          <LandingPage/>
      </BrowserRouter>
      {/* <AppRoutes/> */}
    </>
  )
}
export default App;
