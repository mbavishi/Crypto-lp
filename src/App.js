import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminRoutes from "./Routes/AdminRoutes";
import MainRoutes from "./Routes/MainRoutes";
import NotFound from "./common/notFound";
// bootstrap files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// css files
import "./assets/css/Main.css";
import "./assets/css/all.css";

//Admin Side Routing
const AdminRoute = AdminRoutes.map(({ path, component }, key) => (
  <Route exact path={path} element={component} key={key}></Route>
));

//Main Side Routing
const MainRoute = MainRoutes.map(({ path, component }, key) => (
  <Route exact path={path} element={component} key={key}></Route>
));

function App() {
  return (
    <>
      <ToastContainer
        hideProgressBar={true}
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          {/* Main Routing */}
          {MainRoute}
          {/* Admin Routing */}
          {AdminRoute}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
// git push -u origin main