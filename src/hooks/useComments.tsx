import {useEffect, useState} from "react";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {buildCommentTree} from "src/lib/commentUtils";
import {CommentNode} from "src/types/commentTypes";

const useComments = (currentPage: number) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<CommentNode[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                const commentsData = await getCommentsRequest(currentPage);
                const commentTree = buildCommentTree(commentsData.data);

                commentTree.sort(
                    (a, b) =>
                        new Date(b.value.created).getTime() -
                        new Date(a.value.created).getTime(),
                );

                if (currentPage === 1) {
                    setComments(commentTree);
                } else {
                    setComments((prevComments) =>
                        prevComments.concat(commentTree),
                    );
                }
                setLoading(false);
            } catch (error) {
                console.error("[Error fetching comments]:", error);
                setLoading(false);
                fetchComments();
            }
        };

        fetchComments();
    }, [currentPage]);

    return {comments, loading};
};

export default useComments;
