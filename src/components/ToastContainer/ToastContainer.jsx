import "./ToastContainer.css";
import { Toast } from "../../components";
import { useToast } from "../../contexts";

function ToastContainer() {
  const { toasts } = useToast();
  return (
    <>
      <div className="toast__container">
        {toasts.length
          ? [...toasts].reverse().map((toastItem) => {
              return (
                <Toast
                  key={toastItem.id}
                  id={toastItem.id}
                  text={toastItem.text}
                  variant={toastItem.type}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default ToastContainer;
