import { AppRoutes } from "./router/AppRoutes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <AppRoutes/>
      <ToastContainer position="top-right" autoClose={1400} />
    </>
  )
}
export default App;
