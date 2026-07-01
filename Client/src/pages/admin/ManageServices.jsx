import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import { FaCode, FaServer, FaLaptopCode, FaAward } from 'react-icons/fa';

function ManageServices() {

    const [service, setService] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    const [form, setForm] = useState({
        title: "",
        description: "",
        headTitle: [],
        headDescription: []
    });

    // ================= FETCH SERVICES =================
    const fetchService = async () => {
        try {
            const res = await API.get('/services')
            setService(res.data.service)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchService()
    }, []);


    // Open Edit Modal
    
    const handleEdit = () => {
        setOpenModal(true);
        setForm({
            title: service.title,
            description: service.description,
            headTitle: service.headTitle,
            headDescription: service.headDescription
        });
    };

    // Handle Change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Handle Update

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/updateService/${service._id}`, form);

            alert("Services updated successfully!");
            setOpenModal(false);
            fetchService();

        } catch (error) {
            console.log("Error updating services:", error);
        }
    };


    if (!service) {
        return (
            <div className="p-6 text-white text-center">
                Loading Services Data...
            </div>
        )
    }

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Manage Services
                </h1>
            </div>

            {/* PREVIEW OF SERVICES SECTION */}
            <section className="py-12 bg-slate-950 border border-slate-800 text-white rounded-3xl mb-8">
                <div className="max-w-7xl mx-auto text-center mb-16 px-6">
                    <p className="text-cyan-400 uppercase tracking-widest font-semibold">
                        {service?.title || "My Services"}
                    </p>
                    <h2 className="text-5xl font-bold mt-4">
                        {service?.description || "What I Do"}
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8 px-6">
                    {service?.headTitle && service.headTitle.length > 0 ? (
                        service.headTitle.map((title, index) => {
                            const icons = [<FaCode />, <FaServer />, <FaLaptopCode />, <FaAward />];
                            const icon = icons[index % icons.length];
                            const desc = service?.headDescription?.[index] || "";

                            return (
                                <div
                                    key={index}
                                    className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:scale-105 transition"
                                >
                                    <div className="text-cyan-400 text-5xl mb-6">
                                        {icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">
                                        {title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-3 text-center text-slate-400 text-lg">No services available</div>
                    )}
                </div>
            </section>

            {/* BUTTONS */}
            <div className="flex justify-end mt-8">
                <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-xl text-white font-semibold transition"
                >
                    Edit Services Section
                </button>
            </div>

            {/* EDIT MODAL */}
            {openModal && service && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 text-white p-8 rounded-2xl w-[90%] md:w-[600px] max-h-[85vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-3xl font-bold">Edit Services Section</h3>
                            <button onClick={() => setOpenModal(false)} className="text-2xl text-slate-500 hover:text-red-500 transition">&times;</button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-5">

                            {/* TITLE */}
                            <div>
                                <label className="text-slate-400 text-sm">Main Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-slate-400 text-sm">Main Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 mt-2"
                                />
                            </div>

                            {/* SERVICE HEADS */}
                            {service.headTitle && service.headTitle.map((_, index) => (
                                <div key={index} className="space-y-2">

                                    {/* Head Title */}
                                    <label className="text-slate-400 text-sm">Service #{index + 1} Title</label>
                                    <input
                                        type="text"
                                        value={form.headTitle[index]}
                                        onChange={(e) => {
                                            const updated = [...form.headTitle];
                                            updated[index] = e.target.value;
                                            setForm({ ...form, headTitle: updated });
                                        }}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3"
                                    />

                                    {/* Head Description */}
                                    <label className="text-slate-400 text-sm">Service #{index + 1} Description</label>
                                    <textarea
                                        value={form.headDescription[index]}
                                        onChange={(e) => {
                                            const updated = [...form.headDescription];
                                            updated[index] = e.target.value;
                                            setForm({ ...form, headDescription: updated });
                                        }}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition mt-4"
                            >
                                Update Services
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageServices