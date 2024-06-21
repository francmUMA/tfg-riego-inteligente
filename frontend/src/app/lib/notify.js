import { toast } from "react-toastify"

export const notify = (message, type) => {
    if (type == "success") {
        toast.success(message)
    } else if (type == "error") {
        toast.error(message)
    } else if (type == "info") {
        toast.info(message)
    } else if (type == "warning") {
        toast.warn(message)
    } else {
        toast(message)
    }
}