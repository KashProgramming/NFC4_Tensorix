import { Sparkles, MessageSquare, CheckCircle, FileText, Download, Zap, Brain, Palette } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#853DCC] h-6 w-6" />
          <span className="font-bold text-xl">ScriptGenius</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#features" className="hover:text-[#853DCC] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#853DCC] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#853DCC] transition-colors">Pricing</a>
          <a href="/enhancer" className="hover:text-[#853DCC] transition-colors">Enhancer</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-300 hover:text-white transition-colors">
            Sign In
          </a>
          <a href="/register" className="bg-[#853DCC] hover:bg-[#0d9668] text-white px-5 py-2 rounded-full transition-colors inline-block">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#1e293b] text-[#853DCC] px-3 py-1 rounded-full text-sm font-medium">New</span>
              <span className="text-gray-400">AI-Powered Screenplay Enhancement</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Transform Your <span className="text-[#853DCC]">Scripts</span> with AI Intelligence
            </h1>
            <p className="text-gray-400 text-lg">
              ScriptGenius revolutionizes screenplay writing with advanced AI that analyzes character arcs, enhances dialogue authenticity, and ensures narrative consistency. From first draft to final cut, elevate every scene with intelligent suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/register" className="bg-[#853DCC] hover:bg-[#0d9668] text-white px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Get Started Free
              </a>
              <a href="/login" className="border border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                Sign In
              </a>
            </div>
          </div>
          
          {/* Clapperboard Design */}
          <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] p-8">
      {/* Background glow effect - matching website */}
      <div className="relative">
        <div className="bg-gradient-to-br from-[#853DCC]/20 to-transparent absolute inset-0 rounded-xl blur-3xl"></div>
        
        {/* Main Clapperboard - Wider and more realistic proportions */}
        <div className="relative w-[600px] transform rotate-12 origin-center">
          {/* Clapper Top - Website colors */}
          <div className="bg-gradient-to-b from-[#111] to-[#0f0f0f] border-2 border-gray-800 text-white p-4 rounded-t-3xl shadow-2xl transform -rotate-12 origin-bottom-left relative z-10 h-24">
            <div className="flex justify-between items-center h-full">
              <div className="flex items-center gap-6">
                <div className="font-bold text-2xl text-[#853DCC] tracking-wider">SCRIPTGENIUS</div>
                <div className="text-sm text-gray-400 bg-[#1e293b] px-3 py-1 rounded">SCENE 1</div>
              </div>
              
              {/* Clapper stripes - More realistic diagonal stripes on right side */}
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-16 ${i % 2 === 0 ? 'bg-white' : 'bg-black'} transform rotate-12 shadow-lg`}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Clapper hinges - Website gray colors */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full shadow-inner"></div>
            <div className="absolute left-3 top-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner"></div>
            <div className="absolute left-3 bottom-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner"></div>
          </div>
          
          {/* Slate Board - Website color scheme */}
          <div className="bg-gradient-to-br from-[#111] via-[#0f0f0f] to-[#0a0a0a] border-2 border-gray-800 rounded-b-3xl rounded-t-sm p-6 shadow-2xl -mt-1 h-80 relative overflow-hidden">
            {/* Slate surface texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent rounded-b-3xl"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Main content area */}
              <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
                {/* Left side - Original dialogue */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-[#853DCC] text-sm font-mono mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    ORIGINAL
                  </div>
                  <div className="text-white text-lg leading-relaxed mb-2">
                    "I never meant for this to happen."
                  </div>
                  <div className="text-gray-400 text-xs">
                    Emotion: Regret | Subtext: Hidden guilt
                  </div>
                </div>
                
                {/* Right side - AI Enhanced */}
                <div className="bg-[#1e293b] border border-[#853DCC]/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-[#853DCC] text-sm font-mono mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI ENHANCED
                  </div>
                  <div className="text-white text-lg leading-relaxed mb-2">
                    "I never meant... God, how did we get here?"
                  </div>
                  <div className="text-gray-400 text-xs">
                    Added vulnerability + dramatic pause
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-3 mb-4">
                <button className="bg-[#853DCC] hover:bg-[#0d9668] text-white text-sm px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  APPLY
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm px-4 py-2 rounded-lg transition-all">
                  REFINE
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm px-4 py-2 rounded-lg transition-all">
                  SKIP
                </button>
              </div>
              
              {/* Bottom slate details */}
              <div className="pt-3 border-t-2 border-gray-800 grid grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-[#853DCC] font-bold text-xs mb-1">CHARACTER</div>
                  <div className="text-gray-400">Sarah</div>
                </div>
                <div className="text-center">
                  <div className="text-[#853DCC] font-bold text-xs mb-1">SCENE</div>
                  <div className="text-gray-400">24A</div>
                </div>
                <div className="text-center">
                  <div className="text-[#853DCC] font-bold text-xs mb-1">TAKE</div>
                  <div className="text-gray-400">PERFECT</div>
                </div>
                <div className="text-center">
                  <div className="text-[#853DCC] font-bold text-xs mb-1">AI SCORE</div>
                  <div className="text-gray-400">94%</div>
                </div>
              </div>
            </div>
            
            {/* Corner mounting holes for authentic slate look */}
            <div className="absolute top-3 left-3 w-3 h-3 bg-gray-900 rounded-full shadow-inner border border-gray-800"></div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-gray-900 rounded-full shadow-inner border border-gray-800"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 bg-gray-900 rounded-full shadow-inner border border-gray-800"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 bg-gray-900 rounded-full shadow-inner border border-gray-800"></div>
            
            {/* Additional realistic details */}
            <div className="absolute top-1/2 left-1 w-2 h-8 bg-gray-800 rounded-r-full"></div>
            <div className="absolute top-1/2 right-1 w-2 h-8 bg-gray-800 rounded-l-full"></div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful <span className="text-[#853DCC]">Features</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our AI-powered tools help screenwriters enhance their scripts through tone detection, character analysis, and automatic dialogue improvements.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-6 w-6 text-[#853DCC]" />,
                title: "Dialogue Enhancement",
                description: "Get AI-powered suggestions to improve dialogue clarity, impact, and character voice."
              },
              {
                icon: <Palette className="h-6 w-6 text-[#853DCC]" />,
                title: "Emotion & Tone Analysis",
                description: "Analyze and refine the emotional tone of each scene for maximum impact."
              },
              {
                icon: <CheckCircle className="h-6 w-6 text-[#853DCC]" />,
                title: "Character Consistency",
                description: "Ensure your characters maintain consistent language and personality traits throughout."
              },
              {
                icon: <FileText className="h-6 w-6 text-[#853DCC]" />,
                title: "Standard Formatting",
                description: "Multi-character screenplay editor with industry-standard formatting support."
              },
              {
                icon: <Sparkles className="h-6 w-6 text-[#853DCC]" />,
                title: "AI Punchlines",
                description: "Generate alternative dialogue options and punchlines to enhance your script."
              },
              {
                icon: <Download className="h-6 w-6 text-[#853DCC]" />,
                title: "Export Options",
                description: "Export your enhanced screenplay to PDF, Fountain, or Final Draft format."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-[#853DCC]/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[#1e293b] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#1e293b] to-[#111] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Screenplay?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of screenwriters who are using AI to enhance their creative process and produce professional-quality scripts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-[#853DCC] hover:bg-[#0d9668] text-white px-6 py-3 rounded-full transition-colors inline-block text-center">
              Start Free Trial
            </a>
            <a href="/login" className="border border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-full transition-colors inline-block text-center">
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#853DCC] h-6 w-6" />
            <span className="font-bold text-xl">ScriptGenius</span>
          </div>
          <div className="flex gap-8">
            <a href="#features" className="text-gray-400 hover:text-[#853DCC] transition-colors">Features</a>
            <a href="#pricing" className="text-gray-400 hover:text-[#853DCC] transition-colors">Pricing</a>
            <a href="#" className="text-gray-400 hover:text-[#853DCC] transition-colors">Blog</a>
            <a href="#" className="text-gray-400 hover:text-[#853DCC] transition-colors">Support</a>
          </div>
          <div className="text-gray-400 text-sm">
            © 2023 ScriptGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
