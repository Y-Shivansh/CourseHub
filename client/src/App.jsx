import { AppRoutes } from "./router/AppRoutes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotUI from "./components/chatbot/ChatbotUi";
function App() {
  return (
    <>
    {/* <div className=" border w-1/3 m-auto min-h-screen flex flex-col justify-center">
<ChatbotUI/>

    </div> */}
        <AppRoutes/>
        <ToastContainer position="top-right" autoClose={1000} />
    </>
  )
}
export default App;
