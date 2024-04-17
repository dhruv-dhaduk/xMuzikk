function Feed({ musicList }) {
    return (
        <div>
            {
                musicList.map((item) => {
                    return (
                        <p className='mb-4'>
                            { JSON.stringify(item) }
                        </p>
                    );
                })
            }
        </div>
    );
}

export default Feed;