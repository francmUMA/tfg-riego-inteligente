import { Dialog, DialogTitle } from "@mui/material"

export const DeleteCropDialog = ( openDialog, closeDialog, deleteFunction ) => {
    return(
        <Dialog open={openDialog} onClose={closeDialog}>
            <DialogTitle className="w-full h-full">¿Seguro que deseas eliminar este cultivo?</DialogTitle>
            <div className="flex flex-row p-4 gap-4">
                <button onClick={closeDialog} className="w-1/2 h-12 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 duration-150">
                    <p>Cancelar</p>
                </button>
                <button onClick={deleteFunction} className="w-1/2 h-12 text-white rounded-md bg-red-600 hover:bg-red-500 duration-150">
                    <p>Eliminar</p>
                </button>
            </div>
        </Dialog>
    )
}