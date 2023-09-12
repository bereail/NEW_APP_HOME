import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Basic = () => {

return (
    <>
        <ToastContainer />
    </>
    );
};


// Función para mostrar un toast de éxito
Basic.notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Función para mostrar un toast de error
Basic.notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default Basic;



    /*
    const notify = () => {
      // toast("notification")

      //posicionamient y tipos de mensajes
      toast.success("Succes notification", {position: toast.POSITION})
      toast.warning("Warning notiifaction", {position: toast.POSITION.BOTTOM_LEFT})
      toast.error("Error notification", {position: toast.POSITION.TOP_LEFT})
      toast.info("Infot notifiaction", {position: toast.POSITION.BOTTOM_RIGHT})
    
    
        toast("Custom style", {
            position:toast.POSITION.TOP_CENTER,
            className: 'foo-bar',
            theme: "dark",
            transition:  Zoom
        })

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
    */
