import {useEffect, useState} from "react";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import {IAuthor} from "src/types/authorTypes";

const useAuthors = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorsData = await getAuthorsRequest();
                setAuthors(authorsData);
                setLoading(false);
            } catch (error) {
                console.error("[Error fetching authors]:", error);
                setLoading(false);
                fetchAuthors();
            }
        };

        fetchAuthors();
    }, []);

    return {authors, loading};
};

export default useAuthors;
