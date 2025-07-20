//Enrolled for students and created For Teachers
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { BadgePlus, ChevronDown, ChevronUp, CornerDownLeft } from "lucide-react"
import { Link } from "react-router-dom"

const SidebarLinks = ({ user }) => {
  const commonLinksStyles = "cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md w-full justfy-between dark:text-text-dark text-text-light hover:text-gray-500"
  return (
    <div className="my-4">

      {/* Personal Details Section */}
      <Disclosure as={'div'}>
        {({ open }) => (
          <div className="w-full flex flex-col gap-6">
            <DisclosureButton className={`${commonLinksStyles}`}>
              Personal Details
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </DisclosureButton>

            <DisclosurePanel className="pl-4 mt-1 text-sm text-text-muted space-y-1">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone || "Not added"}</p>
              <p><span className="font-semibold">Age:</span> {user.age || "Not added"}</p>
              <p><span className="font-semibold">Role:</span> {user.role || "Not added"}</p>
              <p><span className="font-semibold">Joined on:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
            </DisclosurePanel>

            {user.role === "student" ? (<Link to="/my-enrolled-courses" className={`${commonLinksStyles}`}>
              Enrolled Courses <CornerDownLeft size={18} />
            </Link>)
              :
              (<div className="flex flex-col gap-6">
                <Link to="/create-course" className={`${commonLinksStyles}`}>
                  Create Course <BadgePlus size={18}/>
                </Link>
                <Link to="/my-courses" className={`${commonLinksStyles}`}>
                  My Courses <CornerDownLeft size={18} />
                </Link>
              </div>
              )
            }


          </div>
        )}

      </Disclosure>

    </div>
  )
}

export default SidebarLinks
