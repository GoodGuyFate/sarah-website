import { useState } from "react";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit() {
    if (!name.trim()) {
      setStatus("name-error");
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setStatus("email-error");
      return;
    }
    if (!message.trim()) {
      setStatus("message-error");
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
            Whether you're interested in a piece, a commission, or just want to
            say hello, we'd love to hear from you.
          </p>

          <a
            href="https://wa.me/201224553583"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="contact-form-wrap">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              maxLength={100}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === "name-error") setStatus(null);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              maxLength={200}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "email-error") setStatus(null);
              }}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Your Message"
              rows="6"
              maxLength={5000}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === "message-error") setStatus(null);
              }}
            />
          </div>

          {status === "name-error" && (
            <p className="form-status error">Please enter your name.</p>
          )}
          {status === "email-error" && (
            <p className="form-status error">
              Please enter a valid email address.
            </p>
          )}
          {status === "message-error" && (
            <p className="form-status error">Please enter a message.</p>
          )}
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
