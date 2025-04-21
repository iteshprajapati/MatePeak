
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const SUPPORT_EMAIL = "support@matepeak.com";

const GetInTouch: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Feedback",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const SUBJECTS = [
    "Feedback",
    "Suggestion",
    "Question",
    "Other",
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Thanks! We’ll get back to you soon.",
      });
      setSubmitting(false);
      setForm({
        name: "",
        email: "",
        subject: "Feedback",
        message: "",
      });
    }, 1100);
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-[#fafafd] to-[#f6f8fc] px-0 border-t border-[#eaeaea]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex-1 max-w-lg w-full mx-auto mb-10 md:mb-0">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-matepeak-primary mb-3">Get in Touch</h2>
          <p className="mb-6 text-gray-600">We’d love to hear your feedback, suggestions, or any questions you have.</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                id="name"
                name="name"
                value={form.name}
                required
                placeholder="Your Name"
                className="rounded-lg shadow-sm"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                required
                placeholder="you@email.com"
                className="rounded-lg shadow-sm"
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                className="rounded-lg border border-gray-300 px-3 py-2 w-full bg-white shadow-sm text-gray-700 focus-visible:ring-2 focus-visible:ring-matepeak-primary focus:outline-none"
                onChange={handleInput}
              >
                {SUBJECTS.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                required
                rows={5}
                placeholder="Type your message here..."
                className="rounded-lg shadow-sm min-h-[100px]"
                onChange={handleInput}
              />
            </div>
            <div className="text-right">
              <Button
                type="submit"
                className="bg-matepeak-primary hover:bg-matepeak-secondary text-white rounded-full px-8 py-2 mt-2 shadow"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-1 max-w-sm mx-auto w-full">
          <div className="bg-white shadow-lg rounded-2xl px-8 py-8 flex flex-col items-center space-y-4">
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#D3E4FD] shadow">
                <svg className="w-6 h-6 text-matepeak-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M4 4h16v16H4z" strokeLinecap="round" /><path d="M22 6l-10 7-10-7"/></svg>
              </span>
              <span className="ml-4 text-matepeak-primary text-lg font-semibold">MatePeak Support</span>
            </div>
            <div className="flex flex-col space-y-1 text-base">
              <span className="text-gray-600">Email:</span>
              <span className="text-matepeak-primary font-medium select-all">{SUPPORT_EMAIL}</span>
            </div>
            <div className="flex flex-col space-y-1 text-base">
              <span className="text-gray-600">Phone:</span>
              <span className="text-matepeak-primary font-medium">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
