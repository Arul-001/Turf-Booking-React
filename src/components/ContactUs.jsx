import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <section className="contact-head">
      <div className="contact">
        <h1>Get in Touch</h1>
        <p>If you have any questions or need support, feel free to contact us using the details below:</p>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Email: <a href="mailto:support@booknplay.com">support@booknplay.com</a></p>
          <p>Phone: <a href="tel:+916379390128">+91 637-939-0128</a></p>
          <p>Address: 123 Sports Ave, Salem, Tamil Nadu, India</p>
        </div>

        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="button">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
