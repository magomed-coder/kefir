import Skeleton from "./Skeleton";

const CommentCardPlaceholder = () => {
    return (
        <div className="comment_card">
            <div>
                <div className="avatar">
                    <Skeleton height={68} width={68} />
                </div>
            </div>

            <div className="comment-details">
                <div className="top-section">
                    <div className="left-section">
                        <p className="author-name">
                            <Skeleton width={100} />
                        </p>

                        <time className="comment-date">
                            <Skeleton width={150} />
                        </time>
                    </div>

                    <div className="right-section">
                        <Skeleton width={20} height={20} circle={true} />
                        <span>
                            <Skeleton width={30} height={16} />
                        </span>
                    </div>
                </div>
                <div className="bottom-section">
                    <p className="comment-text">
                        <Skeleton count={3} marginY={10} width={250} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommentCardPlaceholder;
