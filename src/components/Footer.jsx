function Footer({ className, onClick }) {
    const imgURL = 'https://img.youtube.com/vi/ZCu2gwLj9ok/maxresdefault.jpg';

    return (
        <footer
            onClick={onClick}
            className={`bg-slate-900 flex flex-col tablet:flex-col-reverse overflow-hidden rounded-full tablet:rounded-none ${className}`}
        >
            
            <div className='flex-1 flex items-center pl-6 tablet:px-4'>
                <div className='w-footer-thmb-m h-footer-thmb-m tablet:w-footer-thmb tablet:h-footer-thmb'>
                    <img 
                        src={imgURL}
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>

                <div className='flex-1 mx-2'>
                    <p className='line-clamp-1 font-bold tablet:text-lg'>
                        Illenium - Fractures (feat. Nevve)
                    </p>

                    <p className='text-xs tablet:text-sm'>
                        <span>The Script</span>
                        <span className='hidden tablet:inline font-bold mx-1'> · </span>
                        <span className='hidden tablet:inline'>3 years ago</span>
                        <span className='hidden tablet:inline font-bold mx-1'> · </span>
                        <span className='hidden tablet:inline'>02:11 <span className='font-bold'>/</span> 03:54</span>
                    </p>
                </div>
            </div>

            <progress className='w-full h-1 tablet:h-1.5 flex-none' min={0} max={100} value={70} />

        </footer>
    );
}

export default Footer;