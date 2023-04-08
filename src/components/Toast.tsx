import { ShoppingCartIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

type ToastMode = 'warning' | 'success';

export const customToast = (type: ToastMode): void => {
  if (type === 'warning') {
    toast.warning('Product removed from basket!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <ShoppingCartIcon className='h-6 w-6' />,
      theme: 'colored',
    });
  } else if (type === 'success') {
    toast.success('Product added to basket!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <ShoppingCartIcon className='h-6 w-6' />,
      theme: 'colored',
    });
  }
};
