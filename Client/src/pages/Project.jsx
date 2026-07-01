import React from 'react'
import { useEffect, useState } from 'react'
import API from '../services/api'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function Project() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try{
        const res = await API.get('/getAllProjects');
        console.log("API Response:", res.data);
        setProjectData(res.data.projects || []);
        setLoading(false);

    } catch(error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white text-2xl">Loading Services Section...</div>
        )
    }


  return (
    <>

      <section id="projects" className="py-28 px-6 bg-slate-900">
                    <div className="max-w-7xl mx-auto">

                        <div className="text-center mb-20">
                            <p className="text-cyan-400 uppercase tracking-widest font-semibold">
                                {projectData?.title || "PROJECTS"}
                            </p>

                            <h2 className="text-5xl font-bold mt-4">
                                {projectData?.description || "My Recent Work"}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {projectData.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:scale-105 transition shadow-xl"
                                >
                                    {project.image && (
                                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-6 border border-slate-800" />
                                    )}

                                    <div className="h-2 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-6"></div>

                                    <h3 className="text-2xl font-bold mb-4">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-4 items-center">
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold hover:underline flex items-center gap-2">
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-300 font-semibold hover:text-white hover:underline flex items-center gap-2">
                                                <FaGithub /> GitHub
                                            </a>
                                        )}
                                        {(!project.liveLink && !project.githubLink) && (
                                            <button className="text-cyan-400 font-semibold hover:underline">
                                                View Case Study →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

    </>
  )
}

export default Project