import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const toastsPortal = document.getElementById("toasts");

function ToastsPortal({ children }) {
  const portalRef = useRef(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement("div");
  }

  useEffect(() => {
    toastsPortal.appendChild(portalRef.current);

    return () => toastsPortal.removeChild(portalRef.current);
  }, []);

  return createPortal(<>{children}</>, portalRef.current);
}

export default ToastsPortal;
