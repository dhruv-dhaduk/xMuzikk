import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { searchService, authService } from '../dataManager/AppwriteService.js';

function SearchResults() {
    const { documentId } = useParams();

    const [user, setUser] = useState(undefined);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { response } = await authService.getAccountDetails();

            if (!response) {
                setUser(null);
            }
            else {
                setUser(response);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        searchService
            .getSearchResults(documentId)
            .then((response) => {
                setSearchResults(response);
            })
            .catch((err) => {
                setSearchResults({ error: err });
            });
    }, [documentId, user]);
    
    return (
        <div>
            { user === undefined && <p>Loading auth . . .</p> }
            { user === null && <p>Please login or signup to enable this features</p> }
            { user && searchResults === null && <p>Loading search results . . .</p> }
            { user && searchResults?.error && <p>Search results: { JSON.stringify(searchResults) }</p> }
            { user && searchResults?.ids && <p>Search results: { JSON.stringify(searchResults) }</p> }
        </div>
    );
}

export default SearchResults;