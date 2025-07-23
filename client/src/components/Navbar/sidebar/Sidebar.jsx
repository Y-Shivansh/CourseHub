import { Dialog, Transition, DialogPanel, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import ThemeToggle from "../../common/ThemeToggle";
import ProfileCard from "./ProfileCard";
import SidebarLinks from "./SidebarLinks";
import AccountSettings from "./AccountSettings";
import LogoutPopup from "../../auth/modals/LogoutPopup";
import UpdatePassPopUp from "../../auth/modals/UpdatePassPopUp";
import DeleteAccountPopup from "../../auth/modals/DeleteAccountPopup";

const Sidebar = ({ isOpen, onClose }) => {
  const [showUpdatePassModal, setShowUpdatePassModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = user.authProvider;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50" as="div">
        {/* BACKDROP OVERLAY */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        {/* SIDEBAR PANEL */}
        <div className="fixed inset-0 flex justify-end">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel
              as="div"
              className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-full bg-background-light dark:bg-background-dark shadow-xl p-4 overflow-y-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xs">
              <button onClick={onClose} className="cursor-pointer dark:text-text-dark text-xl mb-6">
                <X />
              </button>

              <div className="flex flex-col gap-4">
                <ProfileCard user={user} />
                <SidebarLinks user={user} />
                <ThemeToggle withText={true} text="Change Theme" size={20} />
                <AccountSettings userType={userType}
                  onUpdatePassword={() => setShowUpdatePassModal(true)}
                  onDeleteAccount={() => setShowDeleteAccountModal(true)}
                />

                {/* Modals */}
                {showUpdatePassModal && (
                  <UpdatePassPopUp isOpen={showUpdatePassModal} onClose={() => setShowUpdatePassModal(false)} />
                )}
                {showDeleteAccountModal && (
                  <DeleteAccountPopup userType={userType} isOpen={showDeleteAccountModal} onClose={() => setShowDeleteAccountModal(false)} />
                )}
                {showLogoutModal && (
                  <LogoutPopup isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
                )}
                {/* Logout Button */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="mt-6 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition"
                >
                  Logout
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Sidebar;
