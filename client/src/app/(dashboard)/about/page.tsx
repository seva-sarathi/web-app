import Link from "next/link";
import { 
  FiArrowLeft, 
  FiActivity, 
  FiTarget, 
  FiWifi, 
  FiUsers, 
  FiDollarSign,
  FiBox
} from "react-icons/fi";

// TypeScript Interfaces
interface TeamMember {
  name: string;
  role: string;
  gradient: string;
}

export default function AboutPage() {
  const team: TeamMember[] = [
    { name: "Vaibhav", role: "5G Technology", gradient: "from-blue-400 to-cyan-300" },
    { name: "Sushant", role: "5G Technology", gradient: "from-cyan-400 to-teal-300" },
    { name: "Anurag Chandra", role: "Web App & Deployments", gradient: "from-indigo-400 to-purple-400" },
    { name: "Aditya Mishra", role: "AI Models & Robotics", gradient: "from-rose-400 to-red-400" },
    { name: "Krishna", role: "Algorithms & Management", gradient: "from-fuchsia-400 to-pink-400" },
    { name: "Anushri", role: "Robotics", gradient: "from-amber-400 to-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden selection:bg-blue-200">
      
      {/* Modern Glass Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <FiActivity className="text-2xl" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">SevaSarathi</span>
        </div>
        <Link 
          href="/" 
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-medium rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
        >
          <FiArrowLeft className="text-lg" /> Back to App
        </Link>
      </header>

      {/* 3D-styled Hero Section */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        {/* Abstract Background Orbs for depth */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-blue-600 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Project Origin
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Built for the future. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Forged in constraints.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
            Born at the 5G Innovation Hackathon. Engineered to revolutionize hospital logistics using edge AI and robotics under a severe hardware budget.
          </p>
        </div>
      </section>

      {/* THE GLOWING TIMELINE */}
      <section className="relative max-w-6xl mx-auto py-20 px-4">
        
        {/* The Central Glowing "Rope" */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 md:-translate-x-1/2 z-0 opacity-30 rounded-full"></div>

        {/* 1. The Hackathon Block */}
        <div className="relative z-10 flex flex-col md:flex-row items-center mb-32 w-full group">
          <div className="md:w-1/2 w-full pr-0 md:pr-16 pl-20 md:pl-0 text-left md:text-right flex justify-end">
            {/* 3D Glass Card Effect */}
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 max-w-lg w-full relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-50 group-hover:bg-purple-200 transition-colors"></div>
              
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-purple-500/30 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <FiWifi className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">5G Innovation Hackathon</h2>
              <p className="text-gray-600 leading-relaxed">
                SevaSarathi was conceptualized and prototyped during the 5G Innovation Hackathon. Our goal was to utilize ultra-reliable, low-latency 5G networks to coordinate multiple AGVs in a critical healthcare environment without signal drop-offs.
              </p>
            </div>
          </div>
          {/* Glowing Node */}
          <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-white border-4 border-purple-500 rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 2. The Budget Constraint Block */}
        <div className="relative z-10 flex flex-col md:flex-row-reverse items-center mb-32 w-full group">
          <div className="md:w-1/2 w-full pl-20 md:pl-16 text-left flex justify-start">
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 max-w-lg w-full relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:bg-blue-200 transition-colors"></div>
              
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white shadow-lg shadow-blue-500/30 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <FiDollarSign className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">The ₹1 Lakh Challenge</h2>
              <p className="text-gray-600 leading-relaxed">
                Commercial hospital AGVs cost millions. We engineered SevaSarathi's entire hardware and software stack under a strict budget of ₹1,00,000. By substituting expensive proprietary sensors with edge AI algorithms, we proved life-saving automation can be affordable.
              </p>
            </div>
          </div>
          <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 3. The USP Pitch */}
        <div className="relative z-10 flex flex-col md:flex-row items-center mb-32 w-full group">
          <div className="md:w-1/2 w-full pr-0 md:pr-16 pl-20 md:pl-0 text-left md:text-right flex justify-end">
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 max-w-lg w-full relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-50 group-hover:bg-pink-200 transition-colors"></div>
              
              <div className="inline-flex p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl text-white shadow-lg shadow-pink-500/30 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                <FiTarget className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">System Innovations</h2>
              <ul className="text-left space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg mt-0.5"><FiActivity size={14} /></div>
                  <p className="text-gray-600"><strong className="text-gray-900">Micro-Latency Control:</strong> Real-time override capabilities powered by 5G network slicing.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg mt-0.5"><FiBox size={14} /></div>
                  <p className="text-gray-600"><strong className="text-gray-900">Modular Intelligence:</strong> Heavy AI processing happens on the MEC server, allowing physical robots to remain lightweight.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-green-100 text-green-600 rounded-lg mt-0.5"><FiWifi size={14} /></div>
                  <p className="text-gray-600"><strong className="text-gray-900">Dynamic Routing:</strong> Custom algorithms adapt instantly to blockages in busy hospital corridors.</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-white border-4 border-pink-500 rounded-full -translate-x-1/2 mt-8 md:mt-0 shadow-[0_0_15px_rgba(236,72,153,0.5)] z-20"></div>
          <div className="md:w-1/2 w-full hidden md:block"></div>
        </div>

        {/* 4. The Team Section */}
        <div className="relative z-10 w-full mt-40">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">The Makers</h2>
            <p className="text-gray-500 mt-3">The engineering team behind SevaSarathi.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* 3D Floating Avatar Area */}
                <div className={`h-40 bg-gradient-to-br ${member.gradient} relative overflow-hidden flex items-center justify-center`}>
                  {/* Glassmorphism reflection overlay */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Icon */}
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 text-white transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 shadow-lg">
                    <FiUsers className="text-4xl" />
                  </div>
                </div>
                
                {/* Card Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold uppercase tracking-wide border border-gray-100">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
      
      {/* Footer cap */}
      <div className="w-full h-32 bg-gradient-to-t from-gray-100 to-transparent"></div>
    </div>
  );
}