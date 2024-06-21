import { SensorChart } from "./SensorChart";
import { Dialog } from "@mui/material";

const ChartDialog = ({id, isOpen, onClose, type }) => {
    return (
        <Dialog  fullWidth open={isOpen} onClose={onClose}>
            <div
                 className="flex items-center justify-center h-96">
                <SensorChart type={type} id={id} className="w-full h-full"/>
            </div>
            
        </Dialog>
    )
}

export default ChartDialog;