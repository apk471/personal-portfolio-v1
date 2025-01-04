"use client"

import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 sm:pb-7">
      <h1 className="text-2xl font-bold mb-6">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message here..."
            rows={6}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full md:w-auto md:px-8" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {submitStatus === 'success' && (
          <p className="text-green-600">Message sent successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600">There was an error sending your message. Please try again.</p>
        )}
      </form>

      <div className="mt-7 text-center">
        <p className="text-sm text-muted-foreground">Or email me directly at:</p>
        <a
          href="mailto:ayushnamin@gmail.com"
          className="block mt-2 text-sm font-medium text-primary hover:underline break-words"
        >
          ayushnamin@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactForm;

