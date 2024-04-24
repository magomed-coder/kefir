import {CommentNode, IComment} from "src/types/commentTypes";

export function buildCommentTree(comments: IComment[]): CommentNode[] {
    const rootNodes: CommentNode[] = [];
    const commentMap: {[id: number]: CommentNode} = {};
    const newComments: CommentNode[] = [];

    comments.forEach((comment) => {
        const node: CommentNode = {value: comment};
        commentMap[comment.id] = node;
        newComments.push(node);

        if (comment.parent === null) {
            rootNodes.push(node);
        }
    });

    newComments.forEach((comment) => {
        const node: CommentNode = comment;

        if (comment.value.parent !== null) {
            const parent = commentMap[comment.value.parent];
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(node);
        }
    });

    return rootNodes;
}

export function countComments(tree: CommentNode[]): number {
    let count: number = 0;

    tree.forEach((comment) => {
        count++;

        if (comment.children && comment.children.length > 0) {
            count += countComments(comment.children);
        }
    });
    return count;
}

export function countLikes(tree: CommentNode[]): number {
    let totalLikes: number = 0;

    tree.forEach((comment) => {
        totalLikes += comment.value.likes;

        if (comment.children && comment.children.length > 0) {
            totalLikes += countLikes(comment.children);
        }
    });
    return totalLikes;
}

type DateTime = string | number | Date;

type FormattedDateTime = string;

export function formatDateTime(date: DateTime): FormattedDateTime {
    const d = new Date(date);

    const year: number = d.getFullYear();
    const month: string = String(d.getMonth() + 1).padStart(2, "0");
    const day: string = String(d.getDate()).padStart(2, "0");
    const hours: string = String(d.getHours()).padStart(2, "0");
    const minutes: string = String(d.getMinutes()).padStart(2, "0");
    const seconds: string = String(d.getSeconds()).padStart(2, "0");

    const formattedDate: string = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export function formatRelativeOrAbsoluteTime(
    dateTime: DateTime,
): FormattedDateTime {
    const currentDate: Date = new Date();
    const targetDate: Date = new Date(dateTime);

    const timeDiff: number = currentDate.getTime() - targetDate.getTime();

    const hoursDiff: number = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesDiff: number = Math.floor(timeDiff / (1000 * 60));

    if (minutesDiff < 60) {
        return `${
            minutesDiff === 0 ? "только что" : `${minutesDiff} минут назад`
        }`;
    }

    if (hoursDiff < 24) {
        if (hoursDiff === 0) {
            return "только что";
        } else if (hoursDiff === 1) {
            return "1 час назад";
        } else {
            return `${hoursDiff} час${hoursDiff >= 5 ? "ов" : "а"} назад`;
        }
    }

    return formatDateTime(dateTime);
}
