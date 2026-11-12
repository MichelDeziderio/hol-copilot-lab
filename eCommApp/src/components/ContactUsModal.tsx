import { useState } from 'react';

interface ContactUsModalProps {
    onClose: () => void;
}

const ContactUsModal = ({ onClose }: ContactUsModalProps) => {
    const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormValues({ name: '', email: '', message: '' });
        setIsSubmitted(true);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <section
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-us-title"
                onClick={event => event.stopPropagation()}
            >
                {isSubmitted ? (
                    <>
                        <h2 id="contact-us-title">Thank you for your message</h2>
                        <button type="button" onClick={onClose} className="contact-continue-btn">
                            Continue
                        </button>
                    </>
                ) : (
                    <>
                        <h2 id="contact-us-title">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <label htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                value={formValues.name}
                                onChange={event => setFormValues({ ...formValues, name: event.target.value })}
                                required
                            />
                            <label htmlFor="contact-email">Email address</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                value={formValues.email}
                                onChange={event => setFormValues({ ...formValues, email: event.target.value })}
                                required
                            />
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                value={formValues.message}
                                onChange={event => setFormValues({ ...formValues, message: event.target.value })}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
};

export default ContactUsModal;
