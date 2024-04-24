import React, {useCallback, useMemo, useState} from "react";

import {countComments, countLikes} from "src/lib/commentUtils";

import IconComponent from "./Icons";
import LoadMoreButton from "./LoadMoreButton";
import CommentsList from "./CommentsList";
import useAuthors from "src/hooks/useAuthors";
import useComments from "src/hooks/useComments";
import CommentsHeader from "./CommentsHeader";
import CommentCardPlaceholder from "./CommentCardPlaceholder";

const PAGES_COUNT = 3;

const Comments: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [likedComments, setLikedComments] = useState<number[]>([]);

    const handleLikeComment = useCallback((commentId: number) => {
        setLikedComments((prev) => {
            if (prev.includes(commentId)) {
                return prev.filter((id) => id !== commentId);
            } else {
                return [...prev, commentId];
            }
        });
    }, []);

    const loadComments = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const {comments, loading: commetsLoading} = useComments(currentPage);
    const {authors, loading: authorLoading} = useAuthors();

    // const totalComments: number = countComments(comments);
    // const totalLikes: number = countLikes(comments) + likedComments.length;
    const totalComments = useMemo(() => countComments(comments), [comments]);
    const totalLikes = useMemo(
        () => countLikes(comments) + likedComments.length,
        [comments, likedComments],
    );

    let content: JSX.Element;
    const isLoading = (authorLoading || commetsLoading) && currentPage === 1;

    if (isLoading) {
        const skeletons = Array.from({length: 6}, (_, index) => (
            <CommentCardPlaceholder key={index} />
        ));

        content = <>{skeletons}</>;
    } else if (comments.length === 0) {
        content = <p>Комментариев нет!</p>;
    } else {
        content = (
            <>
                <CommentsList
                    nodes={comments}
                    authors={authors}
                    likedComments={likedComments}
                    onLikedComments={handleLikeComment}
                />

                <div
                    className="load_button__container"
                    style={{
                        visibility:
                            currentPage < PAGES_COUNT ? "visible" : "hidden",
                    }}
                >
                    <LoadMoreButton
                        loading={commetsLoading}
                        onClick={loadComments}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="comments-header__container">
                <CommentsHeader
                    totalComments={totalComments}
                    totalLikes={totalLikes}
                />
                <IconComponent
                    iconType="underline"
                    style={{display: "contents"}}
                />
            </div>

            {content}
        </>
    );
};

export default Comments;
