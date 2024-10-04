import {create} from 'zustand'

export const useToast = create((set) => ({
    type: 'success',
    show: false,
    message: '',
    showMessage: (type, message) => set({ show: true, type, message }),
    hideMessage: () => set({ show: false, message: '' }),
}))