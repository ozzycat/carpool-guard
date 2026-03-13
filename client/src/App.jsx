import { RouterProvider } from "react-router-dom";
import router from "./utility/AppRouter";

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
