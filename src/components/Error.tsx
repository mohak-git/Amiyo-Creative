import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
    onRetry,
    message,
}: {
    onRetry?: () => void;
    message?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
            <h1 className="text-xl font-semibold text-red-500 mb-2">
                Something went wrong
            </h1>
            <p className="text-gray-400 mb-6">
                {message ?? "We couldn't load your projects. Please try again."}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
