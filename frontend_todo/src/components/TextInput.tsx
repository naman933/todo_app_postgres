interface props {
    label : string,
    placeholder : string,
    className : string,
    value : string,
    setValue : any
}
const TextInput = ({label , placeholder, className, value, setValue} : props) => {
    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
            <label className={`font-semibold ${label}`}>{label}</label>
            <input id={label} value = {value} onChange = {(e) => { setValue(e.target.value);}} type="text" placeholder={placeholder} className="p-2 border text-black border-gray-400 border-solid rounded placeholder-gray-500"/>
        </div>
        
    ) 
    
};

export default TextInput;