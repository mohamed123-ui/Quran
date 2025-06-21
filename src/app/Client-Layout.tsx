"use client";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (

      <Provider store={Store}>
        <div className="h-[10vh]">
          <Navbar />
        </div>
        {children}
        <Footer />
      </Provider>
  );
}
