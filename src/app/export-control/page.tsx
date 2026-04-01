import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Export Control Policy — Defence Trading',
  description: 'Defence Trading\'s Export Control Policy covering compliance with international arms embargoes, export regulations, and trade restrictions.',
}

export default function ExportControlPage() {
  return (
    <LegalPage title="Export Control Policy" date="Last updated: March 2026">
      <h2>1. Policy Statement</h2>
      <p>Defence Trading is fully committed to compliance with all applicable export control laws, regulations, and international trade restrictions. This policy applies to all products, services, and transactions facilitated through Defence Trading, including all clients, partners, and suppliers engaged through our network.</p>

      <h2>2. Regulatory Framework</h2>
      <p>Defence Trading works exclusively with licensed entities worldwide engaged in military and armament supply and production. We adhere to relevant international export control regimes and multilateral arrangements, including:</p>
      <ul>
        <li>The Wassenaar Arrangement on Export Controls for Conventional Arms and Dual-Use Goods</li>
        <li>The Arms Trade Treaty (ATT)</li>
        <li>UN Security Council arms embargoes and sanctions regimes</li>
        <li>Applicable national export control legislation of supplier and destination countries</li>
      </ul>

      <h2>3. Licensing Requirements</h2>
      <p>All exports of controlled defence products require appropriate export licences issued by the competent authority of the exporting country. Defence Trading will not facilitate any transaction where the required export licence has not been obtained or where the transaction would otherwise violate applicable law.</p>

      <h2>4. End-User and End-Use Screening</h2>
      <p>Prior to completing any transaction, Defence Trading conducts end-user and end-use screening to verify the identity and legitimacy of the purchasing entity. We require full documentation, including end-user certificates, from all clients before proceeding with any supply.</p>

      <h2>5. Prohibited Transactions</h2>
      <p>Defence Trading will not facilitate transactions involving:</p>
      <ul>
        <li>Countries, entities, or individuals subject to UN, EU, or US sanctions</li>
        <li>Products subject to applicable arms embargoes or trade restrictions</li>
        <li>Transactions where there is reason to suspect diversion, misuse, or unlawful end-use</li>
      </ul>

      <h2>6. Record Keeping</h2>
      <p>Defence Trading maintains comprehensive records of all export transactions, including licences, end-user certificates, shipping documentation, and compliance assessments, in accordance with applicable regulatory requirements.</p>

      <h2>7. Reporting and Violations</h2>
      <p>Any suspected violations of this Export Control Policy should be reported immediately to our compliance team at <a href="mailto:compliance@defencetrading.com">compliance@defencetrading.com</a>.</p>
    </LegalPage>
  )
}
