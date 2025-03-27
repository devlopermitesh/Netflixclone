import React from "react";

interface ProgressBarProps {
    progress?: number;
    color?: string;
    height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 50, color = "bg-blue-500", height = "h-5" }) => {
    return (
        <div className={`w-full ${height} bg-gray-200/20 rounded-full overflow-hidden border-2 border-white`}>
            <div
                className={`h-full ${color} transition-all duration-500 ease-out`}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
