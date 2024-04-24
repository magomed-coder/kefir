import React from "react";
import {CommentNode} from "src/types/commentTypes";
import {IAuthor} from "src/types/authorTypes";
import CommentCard from "./CommentCard";

export interface ICommentsListProps {
    nodes: CommentNode[];
    authors: IAuthor[];
    likedComments: number[];
    onLikedComments: (commentId: number) => void;
    depth?: number;
}

const MAX_DEEP = 1;
const COMMENT_MARGIN = 34;

const CommentsList: React.FC<ICommentsListProps> = ({
    nodes,
    authors,
    likedComments,
    onLikedComments,
    depth = 0,
}) => {
    const deepValue = Math.min(depth, MAX_DEEP);
    const containerStyle: React.CSSProperties = {
        marginLeft: deepValue * COMMENT_MARGIN + "px",
    };

    return (
        <>
            <ul>
                {nodes.map((node) => {
                    const author: IAuthor = authors.find(
                        (author) => author.id === node.value.author,
                    )!; // TODO

                    let isLiked = likedComments.includes(node.value.id);
                    const like = isLiked ? 1 : 0;

                    return (
                        <li key={node.value.id}>
                            <div style={containerStyle}>
                                <CommentCard
                                    author={author}
                                    comment={node.value}
                                    onLikedComments={onLikedComments}
                                    like={like}
                                />
                            </div>

                            {node.children && (
                                <CommentsList
                                    nodes={node.children}
                                    authors={authors}
                                    likedComments={likedComments}
                                    onLikedComments={onLikedComments}
                                    depth={deepValue + 1}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CommentsList;
