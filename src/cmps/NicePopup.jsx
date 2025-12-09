import { useEffect, useState } from "react"



export function PopUp({ header, footer, children, isOpen = false, onClose = () => { } }) {

    const [isOpenPopUp, setIsOpenPopUp] = useState(isOpen)

    useEffect(() => {
        setIsOpenPopUp(isOpen)
    }, [isOpen])

    useEffect(() => {
        function handleEsc(ev) {
            if (ev.key === 'Escape') {
                onClosePopUp()
            }
        }

        if (isOpenPopUp) {
            document.addEventListener('keydown', handleEsc)
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpenPopUp])


    function onClosePopUp() {
        setIsOpenPopUp(false)
        onClose()
    }

    if (!isOpenPopUp) return null

    return (
        <div onClick={onClosePopUp} className="popup-backdrop">
            <div onClick={ev => ev.stopPropagation()} className="popup-container">
                {header && <header className="popup-header">{header}</header>}
                <main className="popup-main">
                    {children}
                </main>
                {footer && <footer className="popup-footer">{footer}</footer>}
            </div>
        </div>
    )
}