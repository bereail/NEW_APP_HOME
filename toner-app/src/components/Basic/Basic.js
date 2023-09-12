import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Basic = () => {
    const notify = () => {
      // toast("notification")

      //posicionamient y tipos de mensajes
      toast.success("Succes notification", {position: toast.POSITION})
      toast.warning("Warning notiifaction", {position: toast.POSITION.BOTTOM_LEFT})
      toast.error("Error notification", {position: toast.POSITION.TOP_LEFT})
      toast.info("Infot notifiaction", {position: toast.POSITION.BOTTOM_RIGHT})
    }
    return (
        <>
            <button
                onClick={notify}
                className='bg-indigo-500 hover:bg-indigo-700 text-white'
                >
                    Toastify
            </button>
            <ToastContainer />
        </>
    )
}

export default Basic;