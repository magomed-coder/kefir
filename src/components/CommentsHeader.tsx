import React from "react";
import IconComponent from "./Icons";

interface CommentsHeaderProps {
    totalComments: number;
    totalLikes: number;
}

const CommentsHeader: React.FC<CommentsHeaderProps> = ({
    totalComments,
    totalLikes,
}) => {
    return (
        <div className="comments-header">
            <span>{totalComments} комментариев</span>
            <div className="right-section">
                <IconComponent iconType="hollowHeartGray" />
                <span>{totalLikes}</span>
            </div>
        </div>
    );
};

export default CommentsHeader;
