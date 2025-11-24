import { HashRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./page/ProductPage";
import { AuthProvider } from "./provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerPage from "./page/CustomerPage";
import OrderPage from "./page/OrderPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <ProductPage />
            </AuthProvider>
          }
        />
        <Route
          path="/customers"
          element={
            <AuthProvider>
              <CustomerPage />
            </AuthProvider>
          }
        />
        <Route
          path="/order"
          element={
            <AuthProvider>
              <OrderPage />
            </AuthProvider>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
