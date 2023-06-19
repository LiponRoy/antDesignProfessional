import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../pages/Customers";
import Inventory from "../../pages/Inventory";
import Orders from './../../pages/Orders';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;