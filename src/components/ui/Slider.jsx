function Slider({ min, max, value, className, onChange, onClick }) {
    return (
        <input 
            type='range' 
            min={min} 
            max={max} 
            value={value}
            onChange={onChange}
            onClick={onClick}
            className={`slider m-0 p-0 ${className}`}
        />
    );
}

export default Slider;