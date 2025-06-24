import React from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const socialLinks = [
    { icon: <Mail size={20} />, label: 'Email', href: 'mailto:rajlaxmisah@example.com' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajlaxmisah' },
    { icon: <Twitter size={20} />, label: 'Twitter', href: 'https://x.com/raila_san' }
  ];

  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            Get In Touch
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto mb-8"></div>
          <p className="text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you're looking to discuss ideas, collaborate on a project or simply say hello, I'd love to hear from you. Every great creation begins with a conversation.
          </p>
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-sm">
            <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-stone-600 hover:text-stone-800 hover:shadow-md transition-all group"
              aria-label={link.label}
            >
              <div className="group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-stone-500 font-light">
            Based in San Francisco.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;