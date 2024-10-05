import { CircleX } from 'lucide-react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useToast } from 'src/store/toast'

const Toast = () => {
    const { type, show, message, hideMessage } = useToast((state) => state)
    const timeout = useRef()
    const toast = useRef()

    useEffect(() => {
        if (!toast.current) return
        if (show) {
            toast.current.style.transform = 'translateX(0)'
            clearTimeout(timeout.current)
            
            timeout.current = setTimeout(() => {
                hideMessage()
            }, 5000)
        } else {
            toast.current.style.transform = 'translateX(calc(100% + 20px))'
        }
    }, [show])
    
    return (
        show &&
        <div
            ref={toast}
            className={`fixed flex gap-2 transition-all duration-100 z-20 right-5 top-[95px] px-2 py-3 rounded-lg text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
            <span>{message}</span>
            <CircleX className='cursor-pointer' onClick={hideMessage}/>
        </div >
    )
}

export default Toast
