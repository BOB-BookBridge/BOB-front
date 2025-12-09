import { toast } from 'react-toastify';

const showToast = {
  success: (msg: string) =>
    toast.success(msg, {
      autoClose: 800,
    }),

  error: (msg: string) =>
    toast.error(msg, {
      autoClose: 2000,
    }),

  warn: (msg: string) =>
    toast.warn(msg, {
      autoClose: 1500,
    }),

  info: (msg: string) =>
    toast.info(msg, {
      autoClose: 1200,
    }),
};

export default showToast;
