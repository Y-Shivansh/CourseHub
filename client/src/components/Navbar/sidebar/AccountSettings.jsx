// Account Settings - update, delete, theme.
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"

const AccountSettings = ({ onUpdatePassword, onDeleteAccount, userType }) => {
  return (
    <Disclosure as={'div'}>
      {({ open }) => (
        <>
          <DisclosureButton className="w-full text-left px-2 py-2 font-medium text-text-light dark:text-text-dark flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            Account Settings
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </DisclosureButton>
          <DisclosurePanel className="pl-4 mt-1 space-y-3 text-sm">
            {userType === 'local' && <button
              onClick={onUpdatePassword}
              className="block hover:underline text-primary-light"
            >
              Update Password
            </button>}

            <button
              onClick={onDeleteAccount}
              className="block hover:underline text-red-500"
            >
              Delete Account
            </button>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>

  )
}

export default AccountSettings
