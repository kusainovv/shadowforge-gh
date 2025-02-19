import "@xyflow/react/dist/style.css";
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingPage } from "./pages/LoadingPage";
import router from "./routes";

export default function App() {
  return <React.StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
}
