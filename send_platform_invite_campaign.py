"""
=============================================================
  DEFENCE TRADING — PLATFORM INVITATION EMAIL CAMPAIGN
  Inviting companies to join defencetrading.com
  Powered by Resend API
=============================================================
"""

import resend
import sys
from datetime import datetime

# =============================================================
#  CONFIG
# =============================================================

API_KEY       = "re_5z7p9CmY_krUa3P65GnrHQmADzYApW5cN"
FROM_EMAIL    = "sales@defencetrading.com"
FROM_NAME     = "Defence Trading"
TEST_MODE     = False

# =============================================================
#  LEADS — Middle East, India, Pakistan (50 new leads)
# =============================================================

LEADS = [
    # Middle East — 20
    {"name": "Al Jasoor", "email": "info@aljasoor.ae", "country": "UAE"},
    {"name": "NIMR Automotive", "email": "info@nimr.ae", "country": "UAE"},
    {"name": "Wahaj Security & Military Equipment", "email": "info@wahaj.ae", "country": "UAE"},
    {"name": "Halcon Systems", "email": "info@halcon.ae", "country": "UAE"},
    {"name": "Al Tariq", "email": "info@altariq.ae", "country": "UAE"},
    {"name": "Lahab Group", "email": "info@lahab.ae", "country": "UAE"},
    {"name": "SAMI Composites", "email": "info@samicomposites.com", "country": "Saudi Arabia"},
    {"name": "Alsalam Aerospace Industries", "email": "info@alsalam.aero", "country": "Saudi Arabia"},
    {"name": "Paramount Middle East", "email": "info@paramountgroup.com", "country": "UAE"},
    {"name": "Al Taif Technical Projects", "email": "info@altaif.com", "country": "Oman"},
    {"name": "JODDB", "email": "info@joddb.com", "country": "Jordan"},
    {"name": "Arab Organization for Industrialization", "email": "aoi@aoi.eg", "country": "Egypt"},
    {"name": "Helwan Company for Metallic Industries", "email": "info@aoi.com.eg", "country": "Egypt"},
    # India — 20
    {"name": "Hindustan Aeronautics Limited", "email": "cmd@hal-india.co.in", "country": "India"},
    {"name": "Bharat Electronics Limited", "email": "mktg@bel.co.in", "country": "India"},
    {"name": "Mazagon Dock Shipbuilders", "email": "cmd@mazdock.com", "country": "India"},
    {"name": "Garden Reach Shipbuilders", "email": "grse@grse.co.in", "country": "India"},
    {"name": "Goa Shipyard Limited", "email": "cmd@goashipyard.co.in", "country": "India"},
    {"name": "L&T Defence", "email": "defence@larsentoubro.com", "country": "India"},
    {"name": "Tata Advanced Systems", "email": "info@tataadvancedsystems.com", "country": "India"},
    {"name": "Mahindra Defence Systems", "email": "defenceinquiries@mahindra.com", "country": "India"},
    {"name": "Ashok Leyland Defence", "email": "defencebusiness@ashokleyland.com", "country": "India"},
    {"name": "Mishra Dhatu Nigam", "email": "mktg@midhani-india.in", "country": "India"},
    {"name": "Dynamatic Technologies", "email": "mail@dynamatics.com", "country": "India"},
    {"name": "Centum Electronics", "email": "defence@centumelectronics.com", "country": "India"},
    {"name": "BrahMos Aerospace", "email": "info@brahmos.com", "country": "India"},
    {"name": "ideaForge Technology", "email": "info@ideaforge.co.in", "country": "India"},
    {"name": "Windlass Engineers", "email": "info@windlassengg.com", "country": "India"},
    {"name": "Nelco Ltd", "email": "info@nelco.in", "country": "India"},
    {"name": "Yantra India Limited", "email": "yil.hq@yantraindia.co.in", "country": "India"},
    {"name": "Munitions India Limited", "email": "mil@munitionsindia.in", "country": "India"},
    {"name": "Armoured Vehicles Nigam Limited", "email": "info@avnl.co.in", "country": "India"},
    # Pakistan — 10
    {"name": "Pakistan Ordnance Factories", "email": "info@pof.gov.pk", "country": "Pakistan"},
    {"name": "Heavy Industries Taxila", "email": "info@hit.gov.pk", "country": "Pakistan"},
    {"name": "Pakistan Aeronautical Complex", "email": "info@pac.org.pk", "country": "Pakistan"},
    {"name": "Global Industrial & Defence Solutions", "email": "info@gfrw.com", "country": "Pakistan"},
    {"name": "Karachi Shipyard & Engineering Works", "email": "info@karachishipyard.com.pk", "country": "Pakistan"},
    {"name": "Frontier Works Organization", "email": "info@fwo.com.pk", "country": "Pakistan"},
    {"name": "Integrated Dynamics", "email": "info@intdynamics.com", "country": "Pakistan"},
    {"name": "Akhtar & Sons", "email": "info@akhtarandsons.com", "country": "Pakistan"},
]

# =============================================================
#  EMAIL TEMPLATE
# =============================================================

SUBJECT = "Defence Trading — List Your Buy & Sell Requirements on the Global Defence Trade Platform"

def build_html_body(to_name=""):
    greeting = f"Dear {to_name} Team," if to_name else "Dear Sir/Madam,"
    return f"""<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;margin:0;padding:20px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="padding:28px 36px;border-bottom:1px solid #eee;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td style="font-size:20px;color:#000;font-weight:900;letter-spacing:-1px;">
          DefenceTrading<span style="color:#e00;font-size:8px;vertical-align:super;">&#9679;</span>
        </td>
        <td align="right" style="font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase;">
          Platform Invitation
        </td>
      </tr></table>
    </div>

    <!-- Hero Image -->
    <div style="background:#5BA8D9;padding:0;">
      <img src="https://www.defencetrading.com/og-image.png" alt="Defence Trading Platform" style="width:100%;display:block;" />
    </div>

    <!-- Body -->
    <div style="padding:36px;">
      <p style="font-size:15px;color:#222;line-height:1.7;margin:0 0 20px;">{greeting}</p>

      <p style="font-size:15px;color:#222;line-height:1.7;margin:0 0 20px;">
        We are reaching out to introduce <strong>Defence Trading</strong> — a global online platform built exclusively for licensed defence and military trade. Our platform connects verified buyers and sellers of defence products through a secure, compliant, and transparent marketplace.
      </p>

      <p style="font-size:15px;color:#222;line-height:1.7;margin:0 0 24px;">
        We would like to invite your organisation to join the platform and list your current <strong>buy or sell requirements</strong> — whether you are sourcing defence products internationally or looking to reach new procurement partners across the Middle East, Europe, Asia, and beyond.
      </p>

      <!-- Screenshot 1: Platform Hero -->
      <div style="margin:0 0 28px;border:1px solid #eee;overflow:hidden;">
        <img src="https://www.defencetrading.com/email-hero-v2.png" alt="Defence Trading — Procure defence products from verified global suppliers" style="width:100%;display:block;" />
      </div>

      <h2 style="font-size:18px;color:#000;font-weight:800;margin:0 0 16px;letter-spacing:-0.3px;">How It Works</h2>

      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
        <tr>
          <td style="padding:8px 16px 8px 0;vertical-align:top;font-size:20px;font-weight:900;color:#F5C400;">1</td>
          <td style="padding:8px 0;font-size:14px;color:#333;line-height:1.7;"><strong>Create an account</strong> — Register your organisation on defencetrading.com.</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;vertical-align:top;font-size:20px;font-weight:900;color:#F5C400;">2</td>
          <td style="padding:8px 0;font-size:14px;color:#333;line-height:1.7;"><strong>List your requirements</strong> — Post what you are looking to buy or sell. Specify product, quantity, unit, and delivery terms.</td>
        </tr>
        <tr>
          <td style="padding:8px 16px 8px 0;vertical-align:top;font-size:20px;font-weight:900;color:#F5C400;">3</td>
          <td style="padding:8px 0;font-size:14px;color:#333;line-height:1.7;"><strong>Get matched</strong> — Our platform connects you with verified counterparties. When a match is found, both parties are notified to begin discussions.</td>
        </tr>
      </table>

      <!-- Screenshot 2: Create Order Modal -->
      <div style="margin:0 0 28px;border:1px solid #eee;overflow:hidden;">
        <img src="https://www.defencetrading.com/email-create-order-v2.png" alt="Defence Trading — Create Order" style="width:100%;display:block;" />
      </div>

      <h2 style="font-size:18px;color:#000;font-weight:800;margin:0 0 16px;letter-spacing:-0.3px;">What You Can Trade</h2>

      <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 8px;">The platform supports procurement across all major defence categories:</p>
      <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
        <tr>
          <td style="padding:4px 24px 4px 0;font-size:13px;color:#555;">&#8226; Ammunition & Explosives</td>
          <td style="padding:4px 0;font-size:13px;color:#555;">&#8226; Armoured Vehicles</td>
        </tr>
        <tr>
          <td style="padding:4px 24px 4px 0;font-size:13px;color:#555;">&#8226; Protective Equipment</td>
          <td style="padding:4px 0;font-size:13px;color:#555;">&#8226; Communications & Electronics</td>
        </tr>
        <tr>
          <td style="padding:4px 24px 4px 0;font-size:13px;color:#555;">&#8226; Weapons Systems</td>
          <td style="padding:4px 0;font-size:13px;color:#555;">&#8226; Logistics & MRO</td>
        </tr>
        <tr>
          <td style="padding:4px 24px 4px 0;font-size:13px;color:#555;">&#8226; Naval & Aerospace</td>
          <td style="padding:4px 0;font-size:13px;color:#555;">&#8226; Medical & CBRN</td>
        </tr>
      </table>

      <!-- CTA Button -->
      <div style="text-align:center;margin:0 0 32px;">
        <a href="https://www.defencetrading.com/signup" style="display:inline-block;background:#F5C400;color:#000;padding:16px 48px;font-size:15px;font-weight:800;text-decoration:none;letter-spacing:0.5px;">
          Join Defence Trading
        </a>
      </div>

      <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 20px;">
        Defence Trading is fully licensed in the UAE and operates in compliance with all applicable export control regulations and end-user certification requirements. All transactions on the platform are subject to counterparty verification.
      </p>

      <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 20px;">
        If your organisation is interested in listing requirements or learning more about the platform, we would welcome the opportunity to discuss how Defence Trading can support your procurement operations.
      </p>

      <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 4px;">Kind regards,</p>
      <p style="font-size:14px;color:#000;font-weight:700;margin:0 0 4px;">Defence Trading</p>
      <p style="font-size:13px;color:#888;margin:0 0 0;">
        <a href="https://www.defencetrading.com" style="color:#888;">www.defencetrading.com</a> &nbsp;|&nbsp; sales@defencetrading.com
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;border-top:1px solid #eee;background:#fafafa;">
      <p style="font-size:11px;color:#aaa;margin:0;line-height:1.6;">
        This email is intended for authorised defence procurement and trade personnel only. Defence Trading operates in full compliance with applicable export control regulations. If you received this email in error, please disregard.
      </p>
    </div>

  </div>
</body>
</html>"""


# =============================================================
#  SEND FUNCTIONS
# =============================================================

def send_test():
    resend.api_key = API_KEY

    to_email = "business@stankeviciusinternational.com"
    print(f"\n  Sending test email to: {to_email}")
    print(f"   From: {FROM_NAME} <{FROM_EMAIL}>")
    print(f"   Subject: {SUBJECT}")
    print(f"   Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    try:
        result = resend.Emails.send({
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [to_email],
            "subject": SUBJECT,
            "html": build_html_body("Stankevicius International"),
        })
        print(f"\n   Test email sent successfully!")
        print(f"   Email ID: {result.get('id', 'N/A')}")
    except Exception as e:
        print(f"\n   Failed to send: {e}")
        sys.exit(1)


def send_all():
    resend.api_key = API_KEY
    sent = 0
    failed = 0

    print(f"\n{'='*60}")
    print(f"  DEFENCE TRADING — PLATFORM INVITE CAMPAIGN")
    print(f"  Total leads: {len(LEADS)}")
    print(f"  From: {FROM_NAME} <{FROM_EMAIL}>")
    print(f"  Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}\n")

    if TEST_MODE:
        print("  TEST MODE — no emails will be sent.\n")
        return

    for i, lead in enumerate(LEADS, 1):
        try:
            result = resend.Emails.send({
                "from": f"{FROM_NAME} <{FROM_EMAIL}>",
                "to": [lead["email"]],
                "subject": SUBJECT,
                "html": build_html_body(lead["name"]),
            })
            sent += 1
            print(f"  [{i}/{len(LEADS)}] Sent to {lead['name']} ({lead['email']}) — {lead['country']}")
        except Exception as e:
            failed += 1
            print(f"  [{i}/{len(LEADS)}] FAILED {lead['name']} ({lead['email']}): {e}")

    print(f"\n{'='*60}")
    print(f"  DONE — Sent: {sent} | Failed: {failed}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--send-all":
        send_all()
    else:
        send_test()
