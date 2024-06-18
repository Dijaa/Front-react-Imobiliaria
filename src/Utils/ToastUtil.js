import { toast } from 'react-toastify';

const mensagemOk = (mensagem) => {
  toast.success(mensagem, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const mensagemErro = (mensagem) => {
  toast.error(mensagem, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export {mensagemErro, mensagemOk}