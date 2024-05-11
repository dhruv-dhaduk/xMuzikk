function Slider({ min, max, value, className }) {
    return (
        <input 
            type='range' 
            min={min} 
            max={max} 
            value={value} 
            className={`slider m-0 p-0 ${className}`}
        />
    );
}

export default Slider;