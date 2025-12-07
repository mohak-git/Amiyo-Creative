import { FC } from "react";
import { toast } from "react-hot-toast";
import { FaX } from "react-icons/fa6";

interface ConfirmationModalProps {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
    title,
    message,
    confirmText = "Yes, Delete",
    cancelText = "No, Cancel",
    onConfirm,
    onCancel,
}) => {
    const id = toast(
        (t) => (
            <div className="absolute w-screen h-screen -top-4 -left-4 bg-zinc-950/95 flex justify-center items-center">
                <div className="bg-zinc-950 border-zinc-800 max-w-sm w-full border-2 p-2">
                    <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                            {title}
                        </h3>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="text-zinc-500 hover:text-white transition-colors">
                            <FaX className="size-4" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        {message}
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                onConfirm();
                            }}
                            className="flex-1 bg-red-950/30 text-red-400 border border-red-900 hover:bg-red-900 hover:text-white py-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors">
                            {confirmText}
                        </button>
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                onCancel?.();
                            }}
                            className="flex-1 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white py-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors">
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        ),
        {
            id: "confirm",
            duration: Infinity,
            position: "top-left",
            style: { background: "transparent", width: "100%", border: 0 },
        }
    );

    return id;
};
