import { Outlet } from "react-router-dom";
import Header from "./layouts/Header/Header";
import Spinner from './layouts/Animation/Spinner';
import PluginMessenger from "./layouts/Plugin/PluginMessenger";
import FeedbackForm from "./layouts/Feedback/FeedbackForm";

function App() {
  return (
    <>
      <Header />
      {/* <Spinner /> */}
      <FeedbackForm />
      <PluginMessenger />
      <Outlet />
    </>
  );
}

export default App;
