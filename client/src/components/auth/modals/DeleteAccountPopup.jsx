import React from 'react'
import BaseModal from '../../common/BaseModal'
import { useState } from 'react'
import { privateApi } from '../../../services/axios.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Loader from '../../common/Loader';
import Input from '../../common/Input';
import Button from '../../common/Button';

const DeleteAccountPopup = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await privateApi.delete('/user/delete', { 
        data: { password: password}
      });
      localStorage.clear();
      toast.success("Account deleted successfully");
      navigate('/')
    } catch (err) {
      toast.error("Deletion Failed");
      setError(err?.response?.data?.message || "Updation Failed");
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />;
  
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={"Delete Account"}>
      <form onSubmit={handleDelete} className="px-2 sm:px-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-red-500">Confirm Deletion</h2>
        <p className="text-xs sm:text-sm text-text-muted mb-3 sm:mb-4">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <Input
          label={"Password"}
          type={'password'}
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          className="bg-background-light border-gray-300"
          applyDark={false}
          labelDark={false}
          isPassword={true}
        />
        {/* :Error Side: */}
        {error && <p className='text-red-500 text-center text-xs sm:text-sm mt-3 sm:mt-4'>{error}</p>}
        <Button type="submit" className="mt-3 sm:mt-4 w-full">Delete</Button>
      </form>
    </BaseModal>
  )
}

export default DeleteAccountPopup
