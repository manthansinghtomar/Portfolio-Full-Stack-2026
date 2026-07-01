import React, { useState, useEffect } from 'react'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { FaUser, FaLock, FaKey, FaEnvelope, FaUpload } from 'react-icons/fa'

function ManageSettings() {
    const { admin, setAdmin, getProfile, heroImage } = useAuth()

    // Profile state
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: ''
    })
    const [profileImage, setProfileImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [profileLoading, setProfileLoading] = useState(false)

    // Password state
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [passwordLoading, setPasswordLoading] = useState(false)

    // Initialize forms
    useEffect(() => {
        if (admin) {
            setProfileForm({
                name: admin.name || '',
                email: admin.email || ''
            })
            setImagePreview(admin.image || heroImage || '')
        }
    }, [admin, heroImage])

    // Handle profile form input
    const handleProfileChange = (e) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value
        })
    }

    // Handle image select
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    // Handle password change form input
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        })
    }

    // ================= UPDATE PROFILE =================
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        if (!profileForm.name || !profileForm.email) {
            return alert('Name and Email are required.')
        }

        try {
            setProfileLoading(true)
            const formData = new FormData()
            formData.append('name', profileForm.name)
            formData.append('email', profileForm.email)
            if (profileImage) {
                formData.append('image', profileImage)
            }

            const res = await API.put('/updateProfile', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            alert(res.data.message || 'Profile updated successfully!')
            
            // Reload admin state
            if (res.data.admin) {
                setAdmin(res.data.admin)
            } else {
                await getProfile()
            }
        } catch (error) {
            console.error('Profile update error:', error)
            alert(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setProfileLoading(false)
        }
    }

    // ================= UPDATE PASSWORD =================
    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        const { oldPassword, newPassword, confirmPassword } = passwordForm

        if (!oldPassword || !newPassword) {
            return alert('All password fields are required.')
        }

        if (newPassword !== confirmPassword) {
            return alert('New password and confirm password do not match.')
        }

        if (newPassword.length < 6) {
            return alert('New password must be at least 6 characters long.')
        }

        try {
            setPasswordLoading(true)
            const res = await API.put('/changePassword', {
                oldPassword,
                newPassword
            }, {
                withCredentials: true
            })

            alert(res.data.message || 'Password updated successfully!')
            setPasswordForm({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error('Password change error:', error)
            alert(error.response?.data?.message || 'Failed to change password')
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">Account Settings</h1>
                <p className="text-slate-400 mt-2">Manage your profile, photo, and security preferences</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* PROFILE CARD */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                        <FaUser className="text-cyan-400 text-2xl" />
                        <h2 className="text-2xl font-bold text-white">Profile Details</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        {/* PROFILE PICTURE */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80">
                            <div className="relative group">
                                <img
                                    src={imagePreview || heroImage || 'https://via.placeholder.com/150'}
                                    alt="Admin Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/30 group-hover:border-cyan-400 transition duration-300"
                                    onError={(e) => {
                                        e.target.src = heroImage || "https://via.placeholder.com/150";
                                    }}
                                />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300">
                                    <FaUpload className="text-white text-lg" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-white font-bold text-lg">Profile Photo</h3>
                                <p className="text-slate-400 text-xs mt-1">PNG, JPG or JPEG. Max size 2MB.</p>
                                <label className="mt-3 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-xl cursor-pointer font-semibold transition">
                                    <FaUpload /> Select Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* NAME */}
                        <div>
                            <label className="text-slate-400 text-sm font-semibold mb-2 block">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={profileForm.name}
                                    onChange={handleProfileChange}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-slate-400 text-sm font-semibold mb-2 block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="admin@example.com"
                                    value={profileForm.email}
                                    onChange={handleProfileChange}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 py-4 rounded-xl text-white font-bold transition flex items-center justify-center gap-2"
                        >
                            {profileLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Save Profile Changes'
                            )}
                        </button>
                    </form>
                </div>

                {/* SECURITY CARD */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl h-fit">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                        <FaLock className="text-cyan-400 text-2xl" />
                        <h2 className="text-2xl font-bold text-white">Change Password</h2>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        {/* OLD PASSWORD */}
                        <div>
                            <label className="text-slate-400 text-sm font-semibold mb-2 block">Current Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <FaKey />
                                </div>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Enter current password"
                                    value={passwordForm.oldPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition"
                                />
                            </div>
                        </div>

                        {/* NEW PASSWORD */}
                        <div>
                            <label className="text-slate-400 text-sm font-semibold mb-2 block">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition"
                                />
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label className="text-slate-400 text-sm font-semibold mb-2 block">Confirm New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 py-4 rounded-xl text-white font-bold transition flex items-center justify-center gap-2"
                        >
                            {passwordLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageSettings
