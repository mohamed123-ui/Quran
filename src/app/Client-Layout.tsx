"use client";
import { Store } from "./Redux/Store";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Provider } from "react-redux";
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
