import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment } from "react"
import { X } from "lucide-react"


const BaseModal = ({ isOpen, onClose, title, children, position }) => {
    return (
        // as fragment - A way to group multiple elements without adding an extra node to the DOM
        // It does not render anything itself — it just adds or removes CSS classes dynamically when something shows or hides (like a modal, menu, etc.)
        // Transition: handles modal animation timing
        /* The `show` prop controls all nested `TransitionChild` components. */
        <Transition appear show={isOpen} as={Fragment} >

            {/* Dialog is the actual modal component. */}
            <Dialog as="div" onClose={onClose} className=" relative z-[50]" >

                {/* Background Overla, it just fades in and out */}
                {/* TransitionChild: handles individual child animation timing */}
                <TransitionChild
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20" />
                </TransitionChild>

                {/* Modal Panel with zoom + fade effect */}
                <div className={`fixed inset-0 p-4 flex ${position === 'bottom-right' ? 'items-end justify-end' : 'justify-center items-center'}`}>
                    {/* TransitionChild: handles individual child animation timing */}
                    <TransitionChild
                        as={'div'}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {/* DialogPanel is the actual content of the modal. */}
                        <DialogPanel className="relative w-full max-w-md p-6 rounded-xl bg-white dark:bg-secondary-light shadow-xl transition-all">
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            {/* DialogTitle is the title of the modal. */}
                            {title && (
                                <DialogTitle className="text-xl font-medium text-center text-text-light ">
                                    {title}
                                </DialogTitle>
                            )}
                            <div className="mt-5">{children}</div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BaseModal
