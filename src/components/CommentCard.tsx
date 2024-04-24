import React from "react";
import IconComponent from "./Icons";
import {IAuthor} from "src/types/authorTypes";
import {IComment} from "src/types/commentTypes";
import {formatRelativeOrAbsoluteTime} from "src/lib/commentUtils";

interface Props {
    author: IAuthor;
    comment: IComment;
    onLikedComments: (commentId: number) => void;
    like: number;
}

const CommentCard: React.FC<Props> = React.memo(
    ({author, comment, onLikedComments, like}) => {
        const handleLikeClick = React.useCallback(() => {
            onLikedComments(comment.id);
        }, [comment.id, onLikedComments]);

        return (
            <div className="comment_card">
                <div>
                    <div className="avatar">
                        <img
                            src={author.avatar}
                            alt={`Avatar of ${author.name}`}
                        />
                    </div>
                </div>

                <div className="comment-details">
                    <div className="top-section">
                        <div className="left-section">
                            <p className="author-name">{author.name}</p>

                            <time className="comment-date">
                                {formatRelativeOrAbsoluteTime(comment.created)}
                            </time>
                        </div>

                        <div
                            className="right-section"
                            onClick={handleLikeClick}
                        >
                            <IconComponent
                                iconType={like ? "filledHeart" : "hollowHeart"}
                                style={{height: "22px"}}
                            />
                            <span> {comment.likes + like}</span>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <p className="comment-text">{comment.text}</p>
                    </div>
                </div>
            </div>
        );
    },
);

export default CommentCard;
