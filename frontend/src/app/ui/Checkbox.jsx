import "./checkbox.css"

export default function Checkbox({ active, onChange }){
    return (
        <div className="switch">
            <input type="checkbox" checked={active} onChange={onChange} />
            <span className="slider round"></span>
        </div>
    );
}

