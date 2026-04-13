import React from 'react'
import HelpCard from '../components/HelpCard'
import FrequentQuestions from '../components/FrequentQuestions'

function HelpAndSupport() {
  return (
    <div className='h-screen px-10 py-8 pb-20 overflow-y-auto no-scrollbar'>
      <div>
        <h2 style={{fontFamily: "Playfair Display, serif"}} className='mb-4 text-lg font-bold'>💡 Help & Support</h2>
        <div className='grid grid-cols-2 gap-4'>
            <HelpCard icon="💬" heading="Live Chat Support" desc="Chat with our support team. Available Mon-Sat, 9 AM-7 PM." btn="Start Chat" />
            <HelpCard icon="📧" heading="Email Us" desc="Send us your query at support@nestly.in and we'll respond within 24 hours." btn="Send Email" />
            <HelpCard icon="📞" heading="Call Support" desc="Reach us at +91-800-NESTLY. Available for urgent issues during business hours." btn="Call Now" />
            <HelpCard icon="🐛" heading="Report an Issue" desc="Found a bug or scam listing? Report it and we'll investigate within 48 hours." btn="Report" />
        </div>
      </div>
      <div className='py-8'>
        <h2 style={{fontFamily: "Playfair Display, serif"}} className='mb-4 text-lg font-bold'>❓ Frequently Asked Questions</h2>
        <div className='flex flex-col gap-4 '>
            <FrequentQuestions question="How do I contact a property owner?" answer="Once you find a listing you like, click 'Contact Owner' on the listing page. You can message or call them directly — no middlemen or brokers involved." />
            <FrequentQuestions question="Is Nestly really free? No brokerage?" answer="Yes! Nestly is completely free for students. No brokerage, no hidden charges. Owners pay a small fee to list verified properties." />
            <FrequentQuestions question="How are listings verified?" answer="Our team physically visits properties and verifies owner identity, photos, and price accuracy before marking them as verified." />
            <FrequentQuestions question="Can I cancel a scheduled visit?" answer="Yes, you can cancel from your Scheduled Visits section. Please cancel at least 2 hours before to be respectful of the owner's time." />
        </div>
      </div>
    </div>
  )
}

export default HelpAndSupport
