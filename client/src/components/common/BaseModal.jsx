import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment } from "react"


const BaseModal = ({ isOpen, onClose, title, children }) => {
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
                <div className="fixed inset-0 flex justify-center items-center p-4">
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
                        <DialogPanel className={" w-full max-w-md p-6 rounded-xl bg-white dark:bg-secondary-light shadow-xl transition-all"}>
                            {/* DialogTitle is the title of the modal. */}
                            {title && (
                                <DialogTitle className="text-lg font-medium text-text-light ">
                                    {title}
                                </DialogTitle>
                            )}
                            <div className="mt-10">{children}</div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BaseModal
