import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Notice — Defence Trading',
  description: 'Cookie Notice explaining how Defence Trading uses cookies on its website.',
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Notice" date="Last updated: March 2026">
      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites function correctly, improve user experience, and provide information to website operators.</p>

      <h2>2. How We Use Cookies</h2>
      <p>The Defence Trading website uses a limited number of cookies to ensure the site functions properly and to understand how visitors interact with our content. We do not use cookies for advertising or tracking purposes.</p>

      <h2>3. Types of Cookies We Use</h2>
      <ul>
        <li><strong>Strictly Necessary Cookies:</strong> Required for the website to function. These cannot be disabled as they are essential to core site functionality such as navigation and security.</li>
        <li><strong>Analytics Cookies:</strong> Used to collect anonymised information about how visitors use the site, including pages visited and time spent. This helps us improve the site experience. No personally identifiable information is collected through these cookies.</li>
        <li><strong>Preference Cookies:</strong> Allow the site to remember choices you have made (such as language or display preferences) to provide a more personalised experience.</li>
      </ul>

      <h2>4. Third-Party Cookies</h2>
      <p>We may use third-party service providers whose tools place cookies on your device. These providers are subject to their own privacy and cookie policies. We ensure that any third-party services we use comply with applicable data protection standards.</p>

      <h2>5. Managing Cookies</h2>
      <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling cookies may affect the functionality of certain parts of the website. For guidance on managing cookies, refer to your browser&apos;s help documentation.</p>

      <h2>6. Changes to This Notice</h2>
      <p>This Cookie Notice may be updated from time to time. The date of the most recent update is shown at the top of this page.</p>

      <h2>7. Contact</h2>
      <p>For any questions regarding our use of cookies, please contact us at <a href="mailto:privacy@defencetrading.com">privacy@defencetrading.com</a>.</p>
    </LegalPage>
  )
}
