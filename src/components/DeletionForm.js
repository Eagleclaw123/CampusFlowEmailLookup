import React, { useState } from "react";
import { Mail, Shield, Trash2, CheckCircle, AlertCircle } from "lucide-react";

export default function AccountDeletionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    confirmEmail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.confirmEmail) {
      setSubmitStatus("error");
      return;
    }

    if (formData.email !== formData.confirmEmail) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent("Account Deletion Request");
    const body = encodeURIComponent(`
Account Deletion Request

Name: ${formData.name}
Email: ${formData.email}
Reason for deletion: ${formData.reason}

Please delete my account and all associated data as requested.

Submitted on: ${new Date().toLocaleString()}
    `);

    const mailtoLink = `mailto:shuttlesync.app@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", reason: "", confirmEmail: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Account Deletion Request
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're sorry to see you go. Please fill out the form below to request
            deletion of your account and associated data.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Information Panel */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  What happens when you delete your account?
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Your account will be permanently deleted within 30 days
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    All personal data associated with your account will be
                    removed
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    You will receive a confirmation email once the deletion is
                    complete
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    Some data may be retained for legal or security purposes as
                    outlined in our Privacy Policy
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Need Help Instead?
                </h3>
                <p className="text-blue-700 text-sm">
                  If you're having issues with our service, consider reaching
                  out to our support team first. We might be able to help
                  resolve your concerns without deleting your account.
                </p>
              </div>
            </div>

            {/* Form Panel */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Deletion Request Form
                </h2>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-800">
                      Your email client should have opened with the deletion
                      request. Please send the email to complete your request.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-800">
                      Email addresses don't match. Please check and try again.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Email Address *
                  </label>
                  <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="Confirm your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Reason for Deletion (Optional)
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please let us know why you're deleting your account (optional)"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Submit Deletion Request"}
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500 text-center">
                By submitting this form, you acknowledge that your account
                deletion is permanent and cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Questions about data deletion? Contact us at{" "}
            <a
              href="mailto:shuttlesyn.app@gmail.com"
              className="text-blue-600 hover:underline"
            >
              shuttlesyn.app@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
