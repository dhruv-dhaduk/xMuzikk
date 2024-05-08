function Footer({ className, onClick }) {
    return (
        <footer
            onClick={onClick}
            className={`bg-slate-800 rounded-full tablet:rounded-none ${className}`}
        >
        </footer>
    );
}

export default Footer;