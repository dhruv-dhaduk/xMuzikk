import PlaylistItem from './PlaylistItem.jsx';

function PlaylistFeed({ playlistItems }) {
    return (
        <div>
            {
                [...playlistItems, ...playlistItems, ...playlistItems].map((item, index) => (
                    <PlaylistItem key={index} item={item} index={index + 1} />
                ))
            }
        </div>
    )
}

export default PlaylistFeed;