import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  { id: 'budget', label: '📐 Estimate Project Budget', query: 'Can you help me estimate the cost for my interior design project?' },
  { id: 'services', label: '🏰 Explore Design Services', query: 'What interior design services do you offer for homes and offices?' },
  { id: 'process', label: '✨ How Does the Process Work?', query: 'How does SK Interior handle a project from concept to execution?' },
  { id: 'book', label: '📅 Book a Consultation', query: 'I want to schedule a design consultation with your lead designer.' },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Welcome to SK Interior Studio! I am your AI Design Concierge. How can I assist with your space today?",
    time: 'Just now',
  },
];

export default function AiAgentWidget({ isOpen, onToggle, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Lock body scroll on mobile when modal is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const generateResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('budget') || q.includes('cost') || q.includes('price') || q.includes('estimate')) {
      return {
        text: "Our bespoke interior design packages are tailored to your space requirements:\n\n• Luxury Residential (2BHK / 3BHK): ₹15L - ₹45L+\n• Ultra-Luxury Villas / Penthouses: ₹50L - ₹1.5Cr+\n• Commercial / Office Spaces: Custom quote based on sq.ft.\n\nWould you like to speak directly with our Senior Architect for an exact site estimate?",
        whatsappPrompt: true,
      };
    }

    if (q.includes('service') || q.includes('offer') || q.includes('home') || q.includes('office')) {
      return {
        text: "SK Interior Studio specializes in high-end spaces across:\n\n1. Luxury Residential Interiors\n2. Commercial & Corporate HQ Spaces\n3. Turnkey Architectural Execution\n4. Bespoke Furniture & Lighting Design\n\nWhich category fits your upcoming project?",
      };
    }

    if (q.includes('process') || q.includes('work') || q.includes('steps') || q.includes('timeline')) {
      return {
        text: "Our signature 4-step workflow ensures unmatched elegance:\n\n1. Concept & 3D Visualization\n2. Material & Finish Selection\n3. Precision Craftsmanship & Site Execution\n4. Handover & Warranty\n\nTypical execution timeline ranges between 45 to 90 days.",
      };
    }

    if (q.includes('book') || q.includes('consultation') || q.includes('meet') || q.includes('schedule') || q.includes('contact')) {
      return {
        text: "We would love to host you at our BKC Studio in Mumbai or conduct an on-site consultation!\n\nTap below to connect directly with our Lead Designer on WhatsApp or call us at +91 98707 60240.",
        whatsappPrompt: true,
      };
    }

    if (q.includes('location') || q.includes('address') || q.includes('mumbai') || q.includes('bkc')) {
      return {
        text: "Our design studio is located in BKC, Mumbai. We take on luxury projects across Mumbai, Goa, Delhi NCR, and international destinations.",
      };
    }

    return {
      text: `Thank you for sharing! SK Interior Studio creates curated architectural spaces tailored to your lifestyle. Would you like to connect with our design team on WhatsApp for personalized assistance?`,
      whatsappPrompt: true,
    };
  };

  const handleSend = (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(messageText);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        whatsappPrompt: response.whatsappPrompt,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const whatsappMessage = encodeURIComponent("Hi SK Interior, I used the AI Concierge on your website and would like to talk to a designer.");
  const whatsappUrl = `https://wa.me/919870760240?text=${whatsappMessage}`;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open AI Interior Assistant"
        className="relative flex items-center justify-center gap-2 px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full bg-[#111111] text-[#B59A62] border border-[#B59A62]/60 shadow-2xl hover:bg-[#B59A62] hover:text-[#111111] active:scale-95 transition-all duration-300 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B59A62] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B59A62]" />
        </span>
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2ZM5 3L6.25 6.75L10 8L6.25 9.25L5 13L3.75 9.25L0 8L3.75 6.75L5 3ZM19 15L19.94 17.81L22.75 18.75L19.94 19.69L19 22.5L18.06 19.69L15.25 18.75L18.06 17.81L19 15Z" />
        </svg>
        <span className="hidden sm:inline text-[11px] tracking-[0.18em] uppercase font-bold">
          AI Concierge
        </span>
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99990] transition-opacity duration-300"
        />
      )}

      {/* Main Drawer / Modal */}
      <div
        className={`fixed z-[99995] transition-all duration-500 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        } bottom-0 right-0 left-0 md:left-auto md:bottom-24 md:right-6 w-full md:w-[400px] h-[85vh] md:h-[540px] max-h-[90vh] bg-[#0E0E0E] text-[#F3F1ED] rounded-t-3xl md:rounded-2xl border border-[#B59A62]/30 shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#141414] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B59A62]/15 border border-[#B59A62]/40 flex items-center justify-center text-[#B59A62]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F3F1ED] tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                SK AI Concierge
              </h3>
              <p className="text-[10px] text-[#B59A62] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                Online · Interior Assistant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#F3F1ED]/70 hover:text-white transition-colors"
            aria-label="Close AI Concierge"
          >
            ✕
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0E0E0E] to-[#141414]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#B59A62] text-[#111111] font-medium rounded-tr-none shadow-md'
                    : 'bg-[#1A1A1A] text-[#F3F1ED] border border-white/10 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {msg.whatsappPrompt && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#1ebd59] transition-colors shadow-sm"
                  >
                    <span>Connect on WhatsApp</span>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                    </svg>
                  </a>
                )}
              </div>
              <span className="text-[9px] text-[#F3F1ED]/40 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none w-fit">
              <span className="w-2 h-2 rounded-full bg-[#B59A62] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#B59A62] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#B59A62] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-[#121212] border-t border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
          {SUGGESTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSend(item.query)}
              className="shrink-0 text-[10px] tracking-wide font-medium bg-[#1E1E1E] text-[#B59A62] hover:bg-[#B59A62] hover:text-[#111111] px-3 py-1.5 rounded-full border border-[#B59A62]/30 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#141414] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about design, budget, process..."
            className="flex-1 bg-[#1E1E1E] border border-white/10 focus:border-[#B59A62] text-[#F3F1ED] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none placeholder-[#F3F1ED]/40 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-[#B59A62] text-[#111111] disabled:opacity-40 flex items-center justify-center font-bold hover:bg-[#c9aa6c] transition-all"
            aria-label="Send message"
          >
            ➔
          </button>
        </form>
      </div>
    </>
  );
}
