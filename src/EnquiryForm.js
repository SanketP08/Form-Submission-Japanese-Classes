import React, { useState } from "react";
import emailjs from "emailjs-com";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EnquiryForm.css";

const EnquiryForm = () => {
  const [course, setCourse] = useState("");
  const [amount, setAmount] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    switch (selectedCourse) {
      case "N5":
        setAmount("11000");
        break;
      case "N4":
        setAmount("13000");
        break;
      case "N3":
        setAmount("15000");
        break;
      default:
        setAmount("");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Log formData to check values
    emailjs
      .sendForm(
        "service_uu50y7e",
        "template_07rmgwm",
        e.target,
        "Ha7zNyJUZJc_YcIy1"
      )
      .then(
        (result) => {
          console.log("Email successfully sent", result.text);
          setIsSubmitted(true); // Update the state to show thank you message
        },
        (error) => {
          console.error("Email send error", error.text);
        }
      );
  };

  return (
    <div className="container mt-5">
      <div className="form-container">
        <h2 className="mb-4 text-center">
          <strong>Yamahana Japanese Classes</strong>
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="course" className="form-label">
                Course Level
              </label>
              <select
                className="form-select"
                id="course"
                name="course"
                value={course}
                onChange={handleCourseChange}
                required
              >
                <option value="">Select Course Level</option>
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                value={amount}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        ) : (
          <div className="thank-you-message">
            <h2>Thank You!</h2>
            <p>Your enquiry has been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
