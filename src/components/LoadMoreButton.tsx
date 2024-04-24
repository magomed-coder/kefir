import React from "react";
import IconComponent from "./Icons";

interface LoadMoreButtonProps {
    loading: boolean;
    onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({loading, onClick}) => {
    return (
        <>
            <button
                onClick={onClick}
                disabled={loading}
                className="load-more-button"
            >
                {loading ? "Загружает..." : "Загрузить еще"}

                <span>
                    <IconComponent iconType="arrow" />
                </span>
            </button>
        </>
    );
};

export default LoadMoreButton;
