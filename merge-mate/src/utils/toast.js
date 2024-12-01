import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  icon: true,
  closeButton: true,
  onClick: undefined,
  onClose: () => toast.dismiss()
};

export const showSuccessToast = (message) => {
  toast.dismiss();
  const toastId = toast.success(message, toastConfig);
  
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
};

export const showErrorToast = (message) => {
  toast.dismiss();
  const toastId = toast.error(message, toastConfig);
  
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
}; 