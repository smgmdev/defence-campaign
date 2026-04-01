import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'End-User Certification — Defence Trading',
  description: 'End-User Certification requirements for all procurement transactions facilitated through Defence Trading.',
}

export default function EndUserCertificationPage() {
  return (
    <LegalPage title="End-User Certification" date="Last updated: March 2026">
      <h2>1. Purpose</h2>
      <p>End-User Certification (EUC) is a mandatory requirement for all procurement transactions facilitated through Defence Trading involving controlled military products, dual-use goods, and regulated defence materials. This requirement ensures that products are delivered to verified end-users and are used solely for the declared purposes.</p>

      <h2>2. Who Must Provide an End-User Certificate</h2>
      <p>All purchasing entities — including government ministries, armed forces, law enforcement agencies, and commercial entities — must provide a valid End-User Certificate prior to the execution of any transaction. The EUC must be issued or endorsed by the appropriate government authority in the end-user&apos;s jurisdiction.</p>

      <h2>3. Required Information</h2>
      <p>A valid End-User Certificate submitted to Defence Trading must include:</p>
      <ul>
        <li>Full legal name and address of the end-user organisation</li>
        <li>Nature and intended use of the products being procured</li>
        <li>Country of final destination</li>
        <li>Confirmation that the products will not be re-exported without prior authorisation</li>
        <li>Authorised signatory details and official stamp or seal where applicable</li>
        <li>Date of issue and validity period</li>
      </ul>

      <h2>4. Verification Process</h2>
      <p>All End-User Certificates submitted to Defence Trading are subject to internal review and verification. We reserve the right to request additional supporting documentation or to conduct further due diligence prior to approving any transaction.</p>

      <h2>5. Non-Re-Export Undertaking</h2>
      <p>By submitting an End-User Certificate, the purchasing entity confirms that the products will not be re-exported, transferred, or otherwise disposed of to any third party without prior written authorisation from Defence Trading and, where required, from the relevant export control authority.</p>

      <h2>6. Consequences of Non-Compliance</h2>
      <p>Provision of false or misleading information in an End-User Certificate is a serious regulatory offence and may result in the cancellation of the transaction, reporting to competent authorities, and permanent exclusion from future procurement activities with Defence Trading.</p>

      <h2>7. Submission</h2>
      <p>End-User Certificates should be submitted to our compliance team prior to order confirmation: <a href="mailto:compliance@defencetrading.com">compliance@defencetrading.com</a>.</p>
    </LegalPage>
  )
}
