function Slider({ className }) {
    return (
        <input 
            type='range' 
            min={0} 
            max={100} 
            value={70} 
            className={`m-0 p-0 ${className}`}
        />
    );
}

export default Slider;