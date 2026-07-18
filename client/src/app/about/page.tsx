import Link from "next/link";
import { FiArrowLeft, FiActivity, FiTarget, FiCpu, FiWifi, FiUsers, FiDollarSign } from "react-icons/fi";

export default function AboutPage() {
  const team = [
    { name: "Vaibhav", role: "5G Technology", color: "bg-blue-300" },
    { name: "Sushant", role: "5G Technology", color: "bg-green-300" },
    { name: "Anurag Chandra", role: "Web App & Deployments", color: "bg-yellow-300" },
    { name: "Aditya Mishra", role: "AI Models & Robotics", color: "bg-red-300" },
    { name: "Krishna", role: "Algorithms & Management", color: "bg-purple-300" },
    { name: "Anushri", role: "Robotics", color: "bg-pink-300" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden">
      
      {/* Navbar */}
      <header className="w-full p-4 md:p-6 border-b-4 border-black flex justify-between items-center bg-gray-50 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <FiActivity className="text-3xl" />
          <span className="text-2xl font-bold uppercase tracking-wider">SevaSarathi</span>
        </div>
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
        >
          <FiArrowLeft className="text-lg" /> Back
        </Link>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center border-b-4 border-black bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
          The Origin <br /> Story.
        </h1>
        <p className="max-w-2xl mx-auto text-xl font-semibold border-x-4 border-black px-6 py-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          Born at the 5G Innovation Hackathon. Built to revolutionize hospital logistics under severe hardware constraints.
        </p>
      </section>

      {/* THE ROPE TIMELINE */}
      <section className="relative max-w-5xl mx-auto py-20 px-4">
        
        {/* The Central "Rope" Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-black md:-translate-x-1/2 z-0 shadow-[2px_0px_0px_0px_rgba(0,0,0,0.5)]"></div>

        {/* 1. The Hackathon Block */}
        <div className="relative z-10 flex flex-col md:flex-row items-center mb-24 w-full">
          <div className="md:w-1/2 w-full pr-0 md:pr-12 pl-16 md:pl-0 text-left md:text-right flex justify-end">
            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <div className="inline-block p-3 bg-purple-300 border-2 border-black mb-4">
                <FiWifi className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold uppercase mb-2">5G Innovation Hackathon</h2>
              <p className="font-semibold text-gray-700">
                SevaSarathi was conceptualized and prototyped during the 5G Innovation Hackathon. Our goal was to utilize ultra-reliable, low-latency 5G networks to coordinate multiple AGVs in a critical healthcare environment without signal drop-offs.
              </p>
            </div>
          </div>
          {/* Node on the Rope */}
          <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-black border-4 border-white rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-solid"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 2. The Budget Constraint Block */}
        <div className="relative z-10 flex flex-col md:flex-row-reverse items-center mb-24 w-full">
          <div className="md:w-1/2 w-full pl-16 md:pl-12 text-left flex justify-start">
            <div className="border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <div className="inline-block p-3 bg-white border-2 border-black mb-4">
                <FiDollarSign className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold uppercase mb-2">The ₹1 Lakh Challenge</h2>
              <p className="font-semibold text-black">
                Commercial hospital AGVs cost millions. We engineered SevaSarathi entire hardware and software stack under a strict budget of ₹1,00,000 (1 Lakh). By substituting expensive proprietary sensors with AI-driven routing and smart algorithms, we proved that life-saving automation can be affordable.
              </p>
            </div>
          </div>
          {/* Node on the Rope */}
          <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-black border-4 border-white rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-solid"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 3. The USP Pitch */}
        <div className="relative z-10 flex flex-col md:flex-row items-center mb-24 w-full">
          <div className="md:w-1/2 w-full pr-0 md:pr-12 pl-16 md:pl-0 text-left md:text-right flex justify-end">
            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <div className="inline-block p-3 bg-green-300 border-2 border-black mb-4">
                <FiTarget className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold uppercase mb-4">Unique Selling Proposition</h2>
              <ul className="text-left font-semibold space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-black mt-1.5 shrink-0"></div>
                  <strong>Micro-Latency Control:</strong> Real-time override capabilities powered by 5G slicing.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-black mt-1.5 shrink-0"></div>
                  <strong>Modular Intelligence:</strong> Heavy AI processing happens on the backend, allowing the physical robots to be cheap and lightweight.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-3 h-3 bg-black mt-1.5 shrink-0"></div>
                  <strong>Dynamic Re-routing:</strong> Algorithms adapt instantly to blockages in busy hospital corridors.
                </li>
              </ul>
            </div>
          </div>
          {/* Node on the Rope */}
          <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-black border-4 border-white rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-solid"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 4. The Team Section */}
        <div className="relative z-10 w-full pl-16 md:pl-0 mt-32">
          
          {/* Central Team Header sitting ON the rope */}
          <div className="absolute left-0 md:left-1/2 -translate-x-8 md:-translate-x-1/2 -top-16 bg-black text-white px-6 py-3 font-bold uppercase tracking-widest border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl z-20">
            The Makers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:pt-12">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                
                {/* Image Placeholder */}
                <div className={`${member.color} h-32 border-b-4 border-black flex items-center justify-center`}>
                  <FiUsers className="text-6xl opacity-50" />
                </div>
                
                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase mb-1">{member.name}</h3>
                  <div className="inline-block px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold uppercase">
                    {member.role}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </section>
      
      {/* Cap the bottom of the rope */}
      <div className="w-full flex justify-center pb-20">
        <div className="w-8 h-8 bg-black"></div>
      </div>
    </div>
  );
}