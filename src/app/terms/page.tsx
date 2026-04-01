import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Defence Trading',
  description: 'Terms and Conditions governing access to and use of the Defence Trading website and services.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; Conditions" date="Last updated: March 2026">
      <h2>1. Introduction</h2>
      <p>These Terms and Conditions govern your access to and use of the Defence Trading website and services. By accessing this website, you agree to be bound by these terms. If you do not agree, please discontinue use immediately.</p>
      <p>Defence Trading is a B2B defence procurement platform that works exclusively with licensed entities worldwide engaged in military and armament supply and production.</p>

      <h2>2. Eligibility and Authorised Use</h2>
      <p>Access to this website and use of our services is restricted to authorised business entities, government institutions, and licensed procurement professionals. By using this site, you represent that you are acting on behalf of a legitimate institutional or commercial entity.</p>
      <p>You may not use this website for any unlawful purpose or in any manner inconsistent with applicable export control laws, international sanctions, or defence trade regulations.</p>

      <h2>3. Product and Service Information</h2>
      <p>All product listings and company information on this website are provided for informational and procurement facilitation purposes only. Defence Trading acts as an intermediary connecting clients with licensed manufacturers and authorised suppliers. Pricing, availability, and specifications are subject to change without notice.</p>
      <p>Nothing on this website constitutes a binding offer or guarantee of supply. All transactions are subject to separate written agreements, compliance review, and applicable licensing requirements.</p>

      <h2>4. Compliance Obligations</h2>
      <p>All procurement inquiries and transactions facilitated through Defence Trading are subject to full compliance with applicable international arms embargoes, export control regulations, and destination country import requirements. Clients are responsible for ensuring they hold all required authorisations and end-user certifications prior to completing any transaction.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content on this website, including text, design, logos, and data, is the property of Defence Trading and is protected under applicable intellectual property laws. Reproduction or distribution without prior written consent is prohibited.</p>

      <h2>6. Limitation of Liability</h2>
      <p>Defence Trading shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use this website or its services. All information is provided on an "as is" basis without warranties of any kind.</p>

      <h2>7. Governing Law</h2>
      <p>These Terms and Conditions are governed by applicable international trade law and the laws of the jurisdiction in which Defence Trading operates. Any disputes arising from or in connection with these terms shall be resolved through the appropriate legal channels.</p>

      <h2>8. Changes to These Terms</h2>
      <p>Defence Trading reserves the right to update these Terms and Conditions at any time. Continued use of the website following any changes constitutes acceptance of the revised terms.</p>

      <h2>9. Contact</h2>
      <p>For enquiries relating to these Terms and Conditions, please contact us at <a href="mailto:legal@defencetrading.com">legal@defencetrading.com</a>.</p>
    </LegalPage>
  )
}
