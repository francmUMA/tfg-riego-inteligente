import { SensorChart } from "./SensorChart";
import { Dialog, DialogTitle } from "@mui/material";

const ChartDialog = ({id, isOpen, onClose }) => {
    return (
        <Dialog  fullWidth open={isOpen} onClose={onClose}>
            <div
                 className="flex items-center justify-center h-96">
                <SensorChart id={id} className="w-full h-full"/>
            </div>
            
        </Dialog>
    )
}

export default ChartDialog;