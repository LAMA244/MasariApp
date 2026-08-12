import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Loader2,
  HelpCircle,
} from 'lucide-react';

interface VenueChatProps {
  venue: string;
  cityName: string;
  language: Language;
  onClose?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const VenueChat: React.FC<VenueChatProps> = ({
  venue,
  cityName,
  language,
  onClose,
}) => {
  const t = TRANSLATIONS[language];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text:
        language === 'ar'
          ? `مرحباً بك! أنا مرشد "مساري" المحلي. يسعدني إجابة أي سؤال حول "${venue}" في ${cityName}. كيف يمكنني مساعدتك؟`
          : `Welcome! I am your Masari Local Guide. Ask me anything about "${venue}" in ${cityName}. How can I assist you?`,
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    {
      label: t.ask_guide_quick_dress || (language === 'ar' ? 'ما هو الزي المناسب؟' : 'Dress code?'),
      query:
        language === 'ar'
          ? `ما هو الزي واللباس المناسب للزيارة في ${venue}؟`
          : `What is the recommended dress code for visiting ${venue}?`,
    },
    {
      label: t.ask_guide_quick_tickets || (language === 'ar' ? 'هل يلزم حجز تذاكر؟' : 'Tickets required?'),
      query:
        language === 'ar'
          ? `هل يلزم شراء تذاكر أو حجز مسبق لزيارة ${venue} وما هي الرسوم إن وجدت؟`
          : `Are advance tickets or entry fees required for ${venue}?`,
    },
    {
      label: t.ask_guide_quick_best_time || (language === 'ar' ? 'أفضل وقت للزيارة؟' : 'Best time to visit?'),
      query:
        language === 'ar'
          ? `ما هو أفضل وقت في اليوم لزيارة ${venue} لتجنب الزحام والحرارة؟`
          : `When is the best time of day to visit ${venue} to avoid crowds and heat?`,
    },
    {
      label: t.ask_guide_quick_parking || (language === 'ar' ? 'مواقف ومرافق الوصول؟' : 'Parking & Access?'),
      query:
        language === 'ar'
          ? `هل تتوفر مواقف سيارات ومرافق مهيأة للكراسي المتحركة وعربات الأطفال في ${venue}؟`
          : `Is parking and wheelchair/stroller accessibility available at ${venue}?`,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/venue-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venue,
          city: cityName,
          question: textToSend,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text:
          data.answer ||
          (language === 'ar'
            ? 'عذراً، لم أتمكن من إيجاد الرد حالياً.'
            : 'Sorry, I could not generate an answer right now.'),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Guide chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text:
            language === 'ar'
              ? 'نعتذر، حدث خطأ مؤقت في الاتصال بالمرشد. يُرجى المحاولة مرة أخرى.'
              : 'Sorry, a temporary error occurred contacting the guide. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-emerald-950/5 border-2 border-emerald-800/20 rounded-2xl p-4 shadow-inner space-y-3 no-print">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
              <span>{t.ask_guide || (language === 'ar' ? 'اسأل المرشد المحلي' : 'Ask Local Guide')}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            </h5>
            <p className="text-xs text-stone-500">
              {venue} • {cityName}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
            title={language === 'ar' ? 'إغلاق المحادثة' : 'Close chat'}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs sm:text-sm">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-900 text-amber-300'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  isUser
                    ? 'bg-amber-500 text-white rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none font-medium'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 px-3 py-2 rounded-xl w-fit shadow-sm">
            <Loader2 className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
            <span>{language === 'ar' ? 'جاري استشارة المرشد...' : 'Consulting guide...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
        <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.query)}
            disabled={isLoading}
            className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:border-emerald-400/80 px-2.5 py-1 rounded-full font-medium transition-all shadow-2xs hover:shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-1"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            t.ask_guide_placeholder ||
            (language === 'ar'
              ? 'اسأل عن المواعيد، التذاكر، اللباس، أو الدخول...'
              : 'Ask about tickets, dress code, hours, or access...')
          }
          className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-800/40 focus:border-emerald-800 transition-all shadow-2xs"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-emerald-900 hover:bg-emerald-950 disabled:bg-stone-300 text-white p-2 sm:px-3.5 sm:py-2 rounded-xl transition-colors font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="hidden sm:inline">
            {t.ask_guide_send || (language === 'ar' ? 'إرسال' : 'Send')}
          </span>
        </button>
      </form>
    </div>
  );
};
