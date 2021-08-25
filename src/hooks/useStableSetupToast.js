import { useRef } from "react";
import { useToast } from "../contexts";
const useStableSetupToast = () => {
  const { setupToast } = useToast();

  const stableSetupToast = useRef(setupToast);

  return stableSetupToast.current;
};

export { useStableSetupToast };
