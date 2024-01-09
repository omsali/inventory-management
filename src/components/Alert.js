import { toast } from "react-toastify";
// const base = { position: "top-right", theme: "colored", autoClose: 2000 };

const alertError = ( msg ) => {
    toast.error(`${msg}`,{ theme: "colored" })
}

const alertSuccess = ( msg ) => {
    toast.success(`${msg}`, { toastStyle: { backgroundColor: '#cbd5e1' } })
}

export { alertError, alertSuccess };