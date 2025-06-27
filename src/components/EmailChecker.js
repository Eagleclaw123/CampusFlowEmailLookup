import React, { useState } from "react";
import {
  Search,
  Mail,
  User,
  GraduationCap,
  AlertCircle,
  CheckCircle,
  Key,
  Shield,
} from "lucide-react";
import { studentsData } from "../data/mergedStudentsData";

const CampusFlowEmailChecker = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSearch = () => {
    if (!rollNumber.trim()) {
      setResult({ error: "Please enter a roll number" });
      return;
    }

    setIsLoading(true);
    setShowPassword(false);

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
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                Email & Password Lookup Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 sm:text-2xl">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
            Enter your roll number to quickly find your registered email address
            and password for CampusFlow login
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:text-xl">
                Find Your Login Details
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Quick and secure email & password lookup
              </p>
              <p className="text-gray-500 text-xs mt-1 sm:text-xs">
                Example: 21RS1A0101
              </p>
            </div>

            <div className="space-y-5">
              <div className="text-center mb-4">
                <div
                  className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg sm:w-16 sm:h-16"
                  style={{ backgroundColor: "#3E4685" }}
                >
                  <Search className="w-6 h-6 text-white sm:w-8 sm:h-8" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="Roll Number"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-md text-sm sm:text-base"
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
                    <span>Find My Login Details</span>
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
                <div className="bg-red-50 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg sm:w-20 sm:h-20">
                  <AlertCircle className="w-8 h-8 text-red-500 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:text-xl">
                  Oops! Not Found
                </h3>
                <p className="text-red-600 mb-4 leading-relaxed text-sm sm:text-base px-2">
                  {result.error}
                </p>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md sm:text-sm sm:px-6"
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
                <div className="bg-green-50 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg sm:w-20 sm:h-20">
                  <CheckCircle className="w-8 h-8 text-green-500 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:text-xl">
                  Perfect! Login Details Found ✨
                </h3>

                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-gray-100 sm:p-6">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-1 sm:text-sm">
                      Student Name
                    </p>
                    <p className="font-bold text-gray-900 text-base sm:text-lg">
                      {result.student.Name}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-2 sm:text-sm">
                      Your Login Email
                    </p>
                    <div
                      className="bg-white rounded-xl p-3 border-2 shadow-sm sm:p-4"
                      style={{ borderColor: "#3E4685" }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Mail
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          style={{ color: "#3E4685" }}
                        />
                        <p
                          className="font-mono font-semibold break-all text-xs sm:text-sm"
                          style={{ color: "#3E4685" }}
                        >
                          {result.student.Email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  {result.student.Password && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-600 mb-2 sm:text-sm">
                        Your Password
                      </p>
                      <div
                        className="bg-white rounded-xl p-3 border-2 shadow-sm sm:p-4"
                        style={{ borderColor: "#3E4685" }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            <Key
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              style={{ color: "#3E4685" }}
                            />
                            <p
                              className="font-mono font-semibold break-all text-xs sm:text-sm"
                              style={{ color: "#3E4685" }}
                            >
                              {showPassword
                                ? result.student.Password
                                : "••••••••••••••••"}
                            </p>
                          </div>
                          <button
                            onClick={togglePasswordVisibility}
                            className="ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            style={{ color: "#3E4685" }}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4 border-2 border-orange-200 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                        <Shield className="w-4 h-4 text-orange-600 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-800 text-sm mb-1 sm:text-base">
                          🔒 Important Security Notice
                        </h4>
                        <p className="text-orange-700 text-xs leading-relaxed sm:text-sm">
                          <span className="font-semibold">
                            Please change your password immediately after login
                          </span>{" "}
                          for security reasons. Use a strong, unique password
                          that you haven't used elsewhere.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs sm:gap-3">
                  <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 sm:p-3">
                    <p className="text-gray-500 mb-1 text-xs">Branch</p>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {result.student.Branch}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 sm:p-3">
                    <p className="text-gray-500 mb-1 text-xs">Year</p>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {result.student.Year}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 sm:p-3">
                    <p className="text-gray-500 mb-1 text-xs">Semester</p>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {result.student.Semester}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="mt-6 text-xs font-medium px-4 py-2 rounded-xl border-2 transition-all duration-200 hover:shadow-md sm:text-sm sm:px-6"
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
