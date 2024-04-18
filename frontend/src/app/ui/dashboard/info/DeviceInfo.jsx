import { SignalIcon, SignalSlashIcon } from "@heroicons/react/20/solid";

const Name = ({name}) => {
    return(
        <h1>{name}</h1>
    )
}

const Connect = ({connect}) => {
    return(
        <p className={`min-w-36 w-full max-w-40 h-1/2 max-h-7 px-2 text-sm rounded-xl shadow-sm ${
            connect == true
                ? "bg-green-300 text-green-600"
                : "bg-red-300 text-red-600"
            } 
            flex items-center`}>
            {connect == true ? <SignalIcon className="w-5 mr-2" /> : <SignalSlashIcon className="w-5 mr-2" />}
            {connect == true ? " Connected" : " Not Connected"}
        </p>
    )
}

export const DeviceInfo = ({device}) => {
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Name name={"Hola"}/>
            <Connect connect={true}/>
            <Connect connect={false}/>
        </div>
    )
}