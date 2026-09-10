import { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';
import AiAgentWidget from './AiAgentWidget';

export default function FloatingWidgets() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-[9995] flex items-center gap-3 select-none"
      aria-label="Quick Contact and AI Assistant Actions"
    >
      {/* WhatsApp Quick Action */}
      <WhatsAppButton />

      {/* AI Design Concierge Action */}
      <AiAgentWidget
        isOpen={aiOpen}
        onToggle={() => setAiOpen((prev) => !prev)}
        onClose={() => setAiOpen(false)}
      />
    </div>
  );
}
