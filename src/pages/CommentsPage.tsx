import React from "react";
import Comments from "src/components/Comments";

const CommentsPage: React.FC = () => {
    return (
        <section className="comments">
            <div className="container">
                <Comments />
            </div>
        </section>
    );
};

export default CommentsPage;
