import { Outlet } from "react-router-dom";
import Header from "./layouts/Header/Header";
import Spinner from './layouts/Animation/Spinner';
import PluginMessenger from "./layouts/Plugin/PluginMessenger";

function App() {
  return (
    <>
      <Header />
      {/* <Spinner /> */}
      <PluginMessenger />
      <Outlet />
    </>
  );
}

export default App;
