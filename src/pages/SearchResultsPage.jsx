import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../components/ui/Spinner.jsx';
import Loading from '../components/Loading.jsx';
import AuthLinks from '../components/AuthLinks.jsx';
import Feed from '../components/Feed.jsx';

import NotFoundPage from './NotFoundPage.jsx';

import { UserContext } from '../contexts/UserContext.js';

import { searchService } from '../dataManager/AppwriteService.js';
import { getMusicDetails } from '../dataManager/index.js';

function SearchResults() {
    
    const { documentId } = useParams();
    const { user } = useContext(UserContext);
    const [searchResults, setSearchResults] = useState(undefined);
    const [searchResultsDetails, setSearchResultsDetails] = useState([]);

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
                console.error(err);
                setSearchResults({ error: err });
            });
    }, [documentId, user]);

    useEffect(() => {
        if (!searchResults || searchResults.error) {
            return;
        }

        getMusicDetails(searchResults.ids)
            .then((data) => {
                setSearchResultsDetails(data);
            })
            .catch((err) => {
                console.error(err);
                setSearchResults({ error: err });
            });
        
    }, [searchResults]);
    
    return (
        <div>
            {
                user !== null
                &&
                searchResults?.query
                &&
                <p className='p-4 tablet:px-10 tablet:pt-4 tablet:pb-0 text-lg tablet:text-xl font-semibold'>
                    Search Results for :
                    &nbsp;
                    <span>
                        { searchResults.query }
                    </span>
                </p>
            }

            { 
                user === undefined
                && 
                (
                    <div className='flex justify-center p-4'>
                        <Spinner />
                    </div>
                )
            }

            {
                user === null
                && 
                <AuthLinks message='Please Login or Signup to enable this feature' />
            }

            {
                user
                &&
                !searchResults?.error
                &&
                searchResultsDetails.length === 0
                &&
                <Loading count={12} />
            }

            {
                user
                &&
                searchResults?.error
                &&
                <NotFoundPage />
            }

            { 
                user
                &&
                !searchResults?.error
                && 
                searchResultsDetails.length
                &&
                <Feed musicList={searchResultsDetails} />
            }
        </div>
    );
}

export default SearchResults;