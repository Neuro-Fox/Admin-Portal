import { Shield, Users, Clock, MapPin, AlertTriangle, Zap } from "lucide-react";

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="py-24 bg-gradient-to-b from-gray-700 to-gray-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            NeuroFox in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our advanced tourist safety platform delivers measurable results
            with cutting-edge technology, real-time monitoring, and instant
            emergency response capabilities.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-12 md:grid-cols-3 mb-20">
          {/* Tourists Monitored */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              50K+
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tourists Monitored
            </h3>
            <p className="text-gray-600">
              Active users protected daily across India
            </p>
          </div>

          {/* Response Time */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              &lt;15s
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Emergency Response
            </h3>
            <p className="text-gray-600">
              Average alert processing and dispatch time
            </p>
          </div>

          {/* Coverage Areas */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              28
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              States Covered
            </h3>
            <p className="text-gray-600">
              Complete pan-India monitoring network
            </p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-all backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <p className="text-gray-400 font-medium">System Uptime</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-all backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <p className="text-gray-400 font-medium">AI Monitoring</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-all backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1,500+</div>
            <p className="text-gray-400 font-medium">Incidents Prevented</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-all backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">200+</div>
            <p className="text-gray-400 font-medium">Police Partnerships</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-900 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-white mb-4">
              Trusted by Leading Organizations
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our technology powers safety initiatives across government and
              private sectors
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-3">
                Ministry of Tourism
              </div>
              <p className="text-gray-400">Official Government Partnership</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-3">
                State Police Forces
              </div>
              <p className="text-gray-400">Integrated Response System</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-3">
                Travel Agencies
              </div>
              <p className="text-gray-400">White-label Safety Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
