import { useState } from 'react';
import Spinner from './ui/Spinner.jsx';

function ClearCache() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        localStorage.clear();

        indexedDB
            .databases()
            .then((databases) => {
                databases.forEach((db) => {
                    indexedDB.deleteDatabase(db.name);
                });
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                window.location.reload();
            });
    };

    return (
        <div className='flex items-center justify-center'>
            <button
                onClick={handleSubmit}
                className='flex items-center justify-center px-4 py-2 w-40 h-10 rounded-lg text-lg font-bold bg-black text-white select-none border'
            >
                {isSubmitting ? <Spinner size={30} /> : 'Clear Cache'}
            </button>
        </div>
    );
}

export default ClearCache;
