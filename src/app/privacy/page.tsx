import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Notice — Defence Trading',
  description: 'Privacy Notice explaining how Defence Trading collects, uses, stores, and protects personal data.',
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" date="Last updated: March 2026">
      <h2>1. Overview</h2>
      <p>Defence Trading is committed to protecting the privacy of individuals who interact with our website and services. This Privacy Notice explains how we collect, use, store, and protect personal data in accordance with applicable data protection laws, including the EU General Data Protection Regulation (GDPR) and equivalent national legislation where applicable.</p>

      <h2>2. Data We Collect</h2>
      <p>We may collect the following categories of personal data:</p>
      <ul>
        <li>Contact information (name, email address, job title, company name)</li>
        <li>Communication records (enquiries submitted via forms or email)</li>
        <li>Website usage data (pages visited, time on site, browser type)</li>
        <li>Subscription preferences (newsletter and insights opt-ins)</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>Personal data collected is used for the following purposes:</p>
      <ul>
        <li>Responding to procurement enquiries and business correspondence</li>
        <li>Sending procurement intelligence, product updates, and insights where consent has been given</li>
        <li>Improving website functionality and user experience</li>
        <li>Complying with legal and regulatory obligations</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>Defence Trading does not sell personal data to third parties. We may share data with trusted service providers acting on our behalf (such as email delivery platforms) under appropriate data processing agreements. Where required by law or regulatory authority, we may disclose data to competent authorities.</p>

      <h2>5. Data Retention</h2>
      <p>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Business correspondence relating to procurement enquiries is retained for a minimum of five years in compliance with trade record-keeping requirements.</p>

      <h2>6. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise any of these rights, please contact us at <a href="mailto:privacy@defencetrading.com">privacy@defencetrading.com</a>.</p>

      <h2>7. Data Security</h2>
      <p>We implement appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration, or destruction.</p>

      <h2>8. Changes to This Notice</h2>
      <p>This Privacy Notice may be updated periodically. The date of the most recent revision is displayed at the top of this page. We encourage you to review this notice regularly.</p>

      <h2>9. Contact</h2>
      <p>For any privacy-related enquiries, please contact: <a href="mailto:privacy@defencetrading.com">privacy@defencetrading.com</a>.</p>
    </LegalPage>
  )
}
