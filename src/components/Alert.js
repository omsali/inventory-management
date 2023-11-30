import { toast } from "react-toastify";
// const base = { position: "top-right", theme: "colored", autoClose: 2000 };

const alertError = ( msg ) => {
    toast.error(`${msg}`,{ theme: "colored" })
}

const alertSuccess = ( msg ) => {
    toast.success(`${msg}`,{ theme: "colored" })
}

export { alertError, alertSuccess };