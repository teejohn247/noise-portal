import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      if (innerWidth <= 768) {
        document.body.style.overflowY = "auto";
      } else {
        document.body.style.overflowY = "hidden";
      }
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [location.pathname]);

  return (
    <>
      <Outlet />

      <Toaster />
    </>
  );
}
