function Feed({ musicList }) {
    return (
        <div>
            {
                musicList.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.thumbnail} className='w-full max-w-96' />
                            <br />
                            <p className='mb-4 w-full overflow-x-hidden'>
                                { JSON.stringify(item) }
                            </p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Feed;