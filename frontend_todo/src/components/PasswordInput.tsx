interface props {
    label : string,
    placeholder : string,
    value : string,
    setValue : any
}

const PasswordInput = ({label, placeholder, value, setValue} : props) => {
    return (
        <div className="textInputDiv flex flex-col space-y-2 w-full">
            <label className="font-semibold">{label}</label>
            <input id={label} value = {value} onChange = {(e) => { setValue(e.target.value);}} type="password" placeholder={placeholder} className="p-2 border border-gray-400 border-solid rounded placeholder-gray-500 text-black"/>
        </div>
        
    ) 
    
};

export default PasswordInput;