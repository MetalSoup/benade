import { EnvelopeSimpleIcon, PhoneIcon, UserIcon } from '@phosphor-icons/react';
import {  useState } from 'react';
import type {FormEvent} from 'react';

interface ContactFormProps {
    onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || '',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });

                if (onSuccess) {
                    onSuccess();
                }

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                setError(
                    data.message || 'An error occurred. Please try again.'
                );
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Form submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
            {submitted && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-sm text-green-700 dark:text-green-300">
                    ✓ Thank you for your message! I will get back to you soon.
                </div>
            )}

            {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-700 dark:text-red-300">
                    ✗ {error}
                </div>
            )}

            {/* Name */}
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                    <div className="flex items-center gap-2 mb-1">
                        <UserIcon size={16} className="text-amber-500" />
                        Name
                    </div>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-sm placeholder-gray-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:bg-amber-500/10"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                    <div className="flex items-center gap-2 mb-1">
                        <EnvelopeSimpleIcon
                            size={16}
                            className="text-amber-500"
                        />
                        Email
                    </div>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-sm placeholder-gray-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:bg-amber-500/10"
                />
            </div>

            {/* Phone (optional) */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium">
                    <div className="flex items-center gap-2 mb-1">
                        <PhoneIcon size={16} className="text-amber-500" />
                        Phone (optional)
                    </div>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+27 82 992 1317"
                    className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-sm placeholder-gray-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:bg-amber-500/10"
                />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    required
                    rows={5}
                    className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-sm placeholder-gray-500 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:bg-amber-500/10 resize-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border-2 border-amber-500 bg-amber-500 px-4 py-2.5 font-semibold text-stone-900 transition hover:bg-amber-600 hover:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed dark:text-stone-100"
            >
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}


