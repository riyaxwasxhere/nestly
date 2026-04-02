import React from 'react'
import Header from './Header'
import HelpCard from '../components/HelpCard'
import FrequentQuestions from '../components/FrequentQuestions'

function HelpAndSupport() {
  return (
    <div>
      <div>
        <h2>💡 Help & Support</h2>
        <div>
            <HelpCard icon="💬" heading="Live Chat Support" desc="Chat with our support team. Available Mon-Sat, 9 AM-7 PM." btn="Start Chat" />
            <HelpCard icon="📧" heading="Email Us" desc="Send us your query at support@nestly.in and we'll respond within 24 hours." btn="Send Email" />
            <HelpCard icon="📞" heading="Call Support" desc="Reach us at +91-800-NESTLY. Available for urgent issues during business hours." btn="Call Now" />
            <HelpCard icon="🐛" heading="Report an Issue" desc="Found a bug or scam listing? Report it and we'll investigate within 48 hours." btn="Report" />
        </div>
      </div>
      <div>
        <h2>❓ Frequently Asked Questions</h2>
        <div>
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
