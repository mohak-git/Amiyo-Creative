import { FaSpinner } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen text-white">
            <div className="w-full max-w-2xl space-y-4">
                <div className="animate-pulse rounded-md bg-gray-700 h-6 w-1/3" />
                <div className="animate-pulse rounded-md bg-gray-700 h-4 w-2/3" />
                <div className="animate-pulse rounded-md bg-gray-700 h-40 w-full" />
                <div className="animate-pulse rounded-md bg-gray-700 h-40 w-full" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <FaSpinner className="animate-spin text-blue-500 text-4xl" />
            </div>
        </div>
    );
}

export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center z-10">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
    );
}
