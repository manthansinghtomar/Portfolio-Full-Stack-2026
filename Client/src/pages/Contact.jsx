import React, { useState } from 'react'
import API from '../services/api'
import { FaUser, FaEnvelope, FaPen, FaPaperPlane } from 'react-icons/fa'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      return alert('All fields are required.')
    }

    try {
      setLoading(true)
      const res = await API.post('/createContact', form)
      setSuccess(true)
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert(error.response?.data?.message || 'Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section
        id="contact"
        className="py-28 px-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 min-h-screen flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Side: Call to Action */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <p className="text-cyan-400 uppercase tracking-widest font-semibold mb-3">GET IN TOUCH</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Ready to Build Together?
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Open for internships, freelance opportunities, and enterprise-level collaborations. Leave a message, and I'll get back to you within 24 hours.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href="mailto:yourname@gmail.com"
                className="px-8 py-4 rounded-xl border border-slate-700 hover:border-cyan-400 text-white font-semibold transition text-sm shadow-md"
              >
                Send Email Direct
              </a>
            </div>
          </div>

          {/* Right Side: Dynamic Contact Form */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {success ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been saved dynamically and the administrator will check it shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                
                {/* NAME */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition text-sm"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition text-sm"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <FaPen />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition text-sm"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl p-4 text-white outline-none transition text-sm leading-relaxed"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 py-4 rounded-xl text-white font-bold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact