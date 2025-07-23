import React, { useState } from 'react'
import BaseModal from '../../common/BaseModal'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { privateApi } from '../../../services/axios.config'
import { toast } from 'react-toastify'
import Loader from "../../common/Loader"


const UpdatePassPopUp = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const hanndleUpdate = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      await privateApi.put('/user/update', {
        oldPassword: oldPassword,
        password: newPassword
      });
      toast.success("Password Changed");
      onClose();
    } catch (err) {
      toast.error("Something went wrong");
      setError(err?.response?.data?.message || "Updation Failed");
      console.error(err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Loader />;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={"Update Password"}>
      <form className='flex flex-col gap-3 sm:gap-4 px-2 sm:px-0' onSubmit={hanndleUpdate}>
        <Input
          label={"Old Password"}
          type={'password'}
          name={"oldPassword"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required={true}
          className="bg-background-light border-gray-300"
          applyDark={false}
          labelDark={false}
          isPassword={true}
        />
        <Input
          label={"New Password"}
          type={'password'}
          name={"newPassword"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required={true}
          className="bg-background-light border-gray-300"
          applyDark={false}
          labelDark={false}
          isPassword={true}
        />
        {/* :Error Side: */}
        {error && <p className='text-red-500 text-center text-xs sm:text-sm mt-3 sm:mt-4'>{error}</p>}
        <Button type="submit" className="mt-3 sm:mt-4 w-full">Update Password</Button>
      </form>
    </BaseModal>
  )
}

export default UpdatePassPopUp
