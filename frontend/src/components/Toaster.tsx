import { Toaster } from "react-hot-toast";

const Toast = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#020618",
                    color: "#fff",
                    border: "1px solid #334155",
                },
            }}
        />
    );
};

export default Toast;
