import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit() {
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="contact page-transition">
      <div className="contact-inner">
        <div className="contact-text-wrap">
          <h2 className="page-title">Contact</h2>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="contact-form-wrap">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Your Message"
              rows="6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {status === "success" && (
            <p className="form-status success">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="form-status error">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            className="cta-btn"
            onClick={handleSubmit}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
