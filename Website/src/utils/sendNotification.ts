import toast from "react-hot-toast";

export const notify = (message:string,success:boolean) => {
    if(!success)
        return toast.error(message);
    return toast.success(message)
}
