import React from "react";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

const DataLoader = () => (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="text-center">
            <SpinnerIcon className="animate-spin text-cyan-700" style={{ fontSize: '3em' }} />
        </div>
    </div>

);

export { DataLoader };

