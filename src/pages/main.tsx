import { ThemeProvider } from "@/context/ThemeProvider";
import ErrorPage from "@/pages/Error";
import "@/styles/index.css";
import { RouteDefinition } from "@/types/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import SalesScrapper from "./Scrapper/Sales";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />} element={<App />}>
        <Route element={<SalesScrapper />} path={RouteDefinition.INDEX} />
      </Route>
    </>
  ),
  {
    basename: "/",
  }
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
