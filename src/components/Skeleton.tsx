import React from "react";

interface SkeletonProps {
    width?: number;
    height?: number;
    circle?: boolean;
    count?: number;
    marginX?: number;
    marginY?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = "100px",
    height = "10px",
    circle = false,
    count = 1,
    marginX = 0,
    marginY = 0,
}) => {
    const skeletons: JSX.Element[] = [];

    const style: React.CSSProperties = {
        width,
        height,
        borderRadius: circle ? "50%" : "4px",
        margin: `${marginY}px ${marginX}px`,
    };

    for (let i = 0; i < count; i++) {
        skeletons.push(<div key={i} className="skeleton" style={style}></div>);
    }

    return <>{skeletons}</>;
};

export default Skeleton;
