import { HashRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./page/ProductPage";
import { AuthProvider } from "./provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerPage from "./page/CustomerPage";

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
      </Routes>
    </HashRouter>
  );
}

export default App;
