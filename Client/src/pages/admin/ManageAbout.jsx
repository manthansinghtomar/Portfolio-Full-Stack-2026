import React, { useEffect, useState } from 'react'
import API from '../../services/api';
import { FaAward } from 'react-icons/fa';

function ManageAbout() {

    const [about, setAbout] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        skills: "",
        achievements: ""
    });

    // Get about
        const fetchAbout = async()=>{
            try {
                const res = await API.get('/about');
                
                setAbout(res.data.about)
                console.log(res.data.about)
            } catch (error) {
                console.log(error)
            }
        }
    

    useEffect(() => {
      fetchAbout();
    }, []);

    const handleEdit = () => {
        setOpenModal(true);
        setForm({
            title: about?.title || "",
            description: about?.description || "",
            skills: about?.skills?.join(', ') || "",
            achievements: about?.achievements?.join(', ') || ""
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/updateAbout/${about._id}`, form, {
                withCredentials: true
            });
            alert(res.data.message);
            setOpenModal(false);
            fetchAbout();
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "An error occurred");
        }
    };


  return (
    <>
    {/* About Section */}
                <section id="about" className="py-28 px-6 bg-slate-900">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
    
                        {/* LEFT: About Me + Technical Skills */}
                        <div>
                            <h2 className="text-5xl font-bold mb-8">
                                {about?.title || "About Me"}
                            </h2>
    
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {about?.description || "Passionate about developing production-level applications..."}
                            </p>
    
                            <h3 className="text-3xl font-bold mb-8 mt-12">
                                Technical Skills
                            </h3>
    
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {about?.skills?.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center hover:border-cyan-400 hover:scale-105 transition"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        {/* RIGHT: Achievements */}
                        <div>
                            <h3 className="text-3xl font-bold mb-8">
                                Achievements
                            </h3>
                            <div className="flex flex-col gap-4">
                                {about?.achievements?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl"
                                    >
                                        <FaAward className="text-cyan-400 text-xl flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* BUTTON  */}
                        <div className='flex justify-end'>

                            <button 
                            onClick={handleEdit}
                            className="bg-yellow-500 mt-5 hover:bg-yellow-600 px-5 py-3 rounded-xl text-white font-semibold transition">
                                Edit About
                            </button>
                        </div>
                        </div>
                    </div>
                </section>

            {/* ================= MODAL ================= */}

            {openModal && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

                    <div className="bg-slate-900 w-full max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh]">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-8">

                            <h2 className="text-3xl font-bold text-white">
                                Update About
                            </h2>

                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-white text-4xl"
                            >
                                ×
                            </button>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleUpdate}
                            className="grid md:grid-cols-2 gap-6"
                        >

                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                className="bg-slate-800 p-4 rounded-xl text-white outline-none md:col-span-2"
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleChange}
                                className="bg-slate-800 p-4 rounded-xl text-white outline-none md:col-span-2 h-36"
                            ></textarea>

                            <textarea
                                name="skills"
                                placeholder="Skills (comma separated)"
                                value={form.skills}
                                onChange={handleChange}
                                className="bg-slate-800 p-4 rounded-xl text-white outline-none md:col-span-2 h-24"
                            ></textarea>

                            <textarea
                                name="achievements"
                                placeholder="Achievements (comma separated)"
                                value={form.achievements}
                                onChange={handleChange}
                                className="bg-slate-800 p-4 rounded-xl text-white outline-none md:col-span-2 h-24"
                            ></textarea>

                            <button
                                className="bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl font-bold text-white md:col-span-2 transition"
                            >
                                Update About
                            </button>

                        </form>

                    </div>

                </div>

            )}
    </>
  )
}

export default ManageAbout