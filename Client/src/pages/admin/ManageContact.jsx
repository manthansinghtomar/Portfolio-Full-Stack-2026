import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import { FaEnvelope, FaUser, FaTrash, FaEye, FaTimes, FaCalendarAlt } from 'react-icons/fa'

function ManageContact() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    // ================= FETCH CONTACTS =================
    const fetchContacts = async () => {
        try {
            setLoading(true)
            const res = await API.get('/getAllContact', {
                withCredentials: true
            })
            // API returns response: { message: "...", contacts: [...] }
            setContacts(res.data.contacts || [])
        } catch (error) {
            console.error("Error fetching contacts:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    // ================= DELETE CONTACT =================
    const handleDelete = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this message?')
        if (!confirmDelete) return

        try {
            const res = await API.delete(`/deleteContact/${id}`, {
                withCredentials: true
            })
            alert(res.data.message || 'Deleted successfully!')
            fetchContacts()
        } catch (error) {
            console.error("Error deleting contact:", error)
            alert(error.response?.data?.message || 'Delete failed')
        }
    }

    // ================= VIEW DETAILS =================
    const handleViewDetails = (contact) => {
        setSelectedContact(contact)
        setOpenModal(true)
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-white">Contact Messages</h1>
                    <p className="text-slate-400 mt-2">Manage incoming messages from your portfolio site</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <FaEnvelope className="text-cyan-400 text-xl" />
                    <span className="text-white font-bold">{contacts.length} Total</span>
                </div>
            </div>

            {/* LOADING STATE */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            ) : contacts.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center text-slate-400">
                    <FaEnvelope className="text-6xl mx-auto mb-6 text-slate-700" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Messages Found</h3>
                    <p className="max-w-md mx-auto">When visitors fill out your contact form, their queries will appear here.</p>
                </div>
            ) : (
                /* MESSAGES LIST */
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition duration-300 relative group"
                        >
                            <div>
                                {/* Info Line */}
                                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-800 h-10 w-10 rounded-full flex items-center justify-center text-slate-300">
                                            <FaUser />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold truncate max-w-[150px]">{contact.name}</h3>
                                            <a href={`mailto:${contact.email}`} className="text-xs text-cyan-400 hover:underline block truncate max-w-[150px]">{contact.email}</a>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <FaCalendarAlt />
                                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>

                                {/* Subject */}
                                <h4 className="text-white font-semibold text-lg mb-2 truncate">
                                    {contact.subject}
                                </h4>

                                {/* Message Snip */}
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {contact.message}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 border-t border-slate-800 pt-4 mt-auto">
                                <button
                                    onClick={() => handleViewDetails(contact)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                                >
                                    <FaEye /> View
                                </button>
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition"
                                    title="Delete Message"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* DETAILS MODAL */}
            {openModal && selectedContact && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl">
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition text-2xl"
                        >
                            <FaTimes />
                        </button>

                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                            <div className="bg-cyan-500/10 h-16 w-16 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Inquiry Details</h2>
                                <p className="text-slate-400 text-sm">
                                    Received on {selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Sender details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-2xl">
                                    <span className="text-xs text-slate-500 block mb-1">Sender Name</span>
                                    <span className="text-white font-semibold block">{selectedContact.name}</span>
                                </div>
                                <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-2xl">
                                    <span className="text-xs text-slate-500 block mb-1">Sender Email</span>
                                    <a href={`mailto:${selectedContact.email}`} className="text-cyan-400 font-semibold hover:underline block truncate">
                                        {selectedContact.email}
                                    </a>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-2xl">
                                <span className="text-xs text-slate-500 block mb-1">Subject</span>
                                <span className="text-white font-semibold block">{selectedContact.subject}</span>
                            </div>

                            {/* Message */}
                            <div className="bg-slate-950/50 border border-slate-800/80 p-6 rounded-2xl">
                                <span className="text-xs text-slate-500 block mb-2">Message</span>
                                <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">
                                    {selectedContact.message}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 py-4 rounded-xl text-white font-bold transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setOpenModal(false)
                                    handleDelete(selectedContact._id)
                                }}
                                className="bg-red-500 hover:bg-red-600 px-6 py-4 rounded-xl text-white font-bold transition flex items-center gap-2"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageContact
