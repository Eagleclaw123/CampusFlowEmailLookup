import React, { useState } from "react";
import {
  Search,
  Mail,
  User,
  GraduationCap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { studentsData } from "../data/students";

const CampusFlowEmailChecker = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!rollNumber.trim()) {
      setResult({ error: "Please enter a roll number" });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const student = studentsData.find(
        (s) => s.RollNumber.toLowerCase() === rollNumber.toLowerCase().trim()
      );

      if (student) {
        setResult({ student });
      } else {
        setResult({
          error: "Roll number not found. Please check and try again.",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setRollNumber("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#3E4685" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#3E4685" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5"
          style={{ backgroundColor: "#3E4685" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="CampusFlow Logo"
                className="w-12 h-12 object-contain drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-12 h-12 rounded-xl p-2 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#3E4685", display: "none" }}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                CampusFlow
              </h1>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Email Lookup Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Enter your roll number to quickly find your registered email address
            for CampusFlow login
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 relative overflow-hidden">
          {/* Card Background Pattern */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-5"
            style={{ backgroundColor: "#3E4685" }}
          >
            <div className="w-full h-full rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#3E4685" }}
              >
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Find Your Email
              </h3>
              <p className="text-gray-600 text-sm">
                Quick and secure email lookup
              </p>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Roll Number (e.g., 21RS1A0101)"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-md"
                  style={{
                    focusRingColor: "#3E4685",
                    "--tw-ring-color": "#3E4685",
                  }}
                />
                {rollNumber && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs text-white">×</span>
                    </div>
                  </button>
                )}
              </div>

              <button
                onClick={handleSearch}
                disabled={isLoading || !rollNumber.trim()}
                className="w-full text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  backgroundColor: "#3E4685",
                  "--hover-bg": "#2f3a73",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2f3a73")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3E4685")
                }
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Find My Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 animate-slideUp">
            {result.error ? (
              <div className="text-center">
                <div className="bg-red-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Oops! Not Found
                </h3>
                <p className="text-red-600 mb-4 leading-relaxed">
                  {result.error}
                </p>
                <button
                  onClick={() => setResult(null)}
                  className="text-sm font-medium px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: "#3E4685",
                    color: "white",
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-green-50 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Perfect! Email Found ✨
                </h3>

                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-gray-100">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Student Name
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      {result.student.Name}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Your Login Email
                    </p>
                    <div
                      className="bg-white rounded-xl p-4 border-2 shadow-sm"
                      style={{ borderColor: "#3E4685" }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Mail
                          className="w-5 h-5"
                          style={{ color: "#3E4685" }}
                        />
                        <p
                          className="font-mono font-semibold break-all"
                          style={{ color: "#3E4685" }}
                        >
                          {result.student.Email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-1">Branch</p>
                    <p className="font-semibold text-gray-900">
                      {result.student.Branch}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-1">Year</p>
                    <p className="font-semibold text-gray-900">
                      {result.student.Year}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-1">Semester</p>
                    <p className="font-semibold text-gray-900">
                      {result.student.Semester}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="mt-6 text-sm font-medium px-6 py-2 rounded-xl border-2 transition-all duration-200 hover:shadow-md"
                  style={{
                    borderColor: "#3E4685",
                    color: "#3E4685",
                  }}
                >
                  Search Another
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-gray-600 text-sm mb-2">
              <strong>Need Help?</strong>
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Contact your system administrator or IT support team for
              assistance with account access
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        input:focus {
          ring-color: #3e4685 !important;
        }
      `}</style>
    </div>
  );
};

export default CampusFlowEmailChecker;
