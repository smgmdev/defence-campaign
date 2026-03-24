import resend
import time
from datetime import datetime

API_KEY       = "re_hmAy6zqd_EY9FFWNQsBgPdBy8vGvQXbTS"
FROM_EMAIL    = "noreply@arcanamace.com"
FROM_NAME     = "Arcana Mace"
DELAY_SECONDS = 2

SUBJECT = "Arcana Mace — List Your Agency & Media Options"

def build_html(email):
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {{ font-family: Arial, Helvetica, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }}
    .wrapper {{ max-width: 620px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }}
    .header {{ background: #ffffff; padding: 28px 40px; text-align: left; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #e8e8e8; }}
    .header img {{ width: 56px; height: 56px; display: block; flex-shrink: 0; }}
    .header h1 {{ color: #0d0d0d; font-size: 24px; margin: 0; letter-spacing: 2px; font-weight: 600; }}
    .header p {{ color: #666; font-size: 12px; margin: 4px 0 0; letter-spacing: 1px; text-transform: uppercase; }}
    .body {{ padding: 40px; color: #333; line-height: 1.8; font-size: 15px; }}
    .body h2 {{ color: #0d0d0d; font-size: 18px; margin-top: 0; }}
    .highlight {{ background: #fdf8ee; border-left: 4px solid #c9a84c; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0; }}
    .cta {{ text-align: center; margin: 32px 0; }}
    .cta a {{ background: #000000; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 0; font-weight: 700; font-size: 14px; letter-spacing: 2px; display: inline-block; text-transform: uppercase; }}
    .footer {{ background: #f4f4f4; padding: 24px 40px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e8e8e8; }}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="https://arcanamace.com/icon-512.png" alt="Arcana Mace Logo">
      <div>
        <h1>ARCANA MACE</h1>
        <p>Media Buying Marketplace</p>
      </div>
    </div>
    <div class="body">
      <h2>Join the Arcana Mace Marketplace</h2>
      <p>
        We are reaching out to invite your agency to join <strong>Arcana Mace</strong> — a dedicated media buying marketplace built for agencies, publishers, and media buyers.
      </p>
      <p>
        As a PR or media agency, joining Arcana Mace gives you direct exposure to media buyers actively searching for media placements — no middlemen, no lengthy negotiations.
      </p>

      <div class="highlight">
        <strong>What you can do on Arcana Mace:</strong>
        <table cellpadding="0" cellspacing="0" style="margin-top:14px;width:100%;">
          <tr>
            <td style="width:28px;padding:9px 12px 9px 0;vertical-align:top;"><img src="https://www.forbes.com/favicon.ico" alt="Forbes" width="20" height="20" style="display:block;margin-top:1px;"></td>
            <td style="padding:9px 0;vertical-align:top;color:#444;font-size:14px;line-height:1.5;">List your <strong>media channels</strong> and make placements available to buyers instantly</td>
          </tr>
          <tr>
            <td style="width:28px;padding:9px 12px 9px 0;vertical-align:top;"><img src="https://s.w.org/favicon.ico" alt="WordPress" width="20" height="20" style="display:block;margin-top:1px;"></td>
            <td style="padding:9px 0;vertical-align:top;color:#444;font-size:14px;line-height:1.5;">List <strong>WordPress media sites for sale</strong> — connect your sites directly to the platform and sell direct publishing</td>
          </tr>
          <tr>
            <td style="width:28px;padding:9px 12px 9px 0;vertical-align:top;font-size:18px;line-height:1;">&#128178;</td>
            <td style="padding:9px 0;vertical-align:top;color:#444;font-size:14px;line-height:1.5;">Get discovered by an international audience of media buyers and brands</td>
          </tr>
          <tr>
            <td style="width:28px;padding:9px 12px 9px 0;vertical-align:top;font-size:18px;line-height:1;">&#128203;</td>
            <td style="padding:9px 0;vertical-align:top;color:#444;font-size:14px;line-height:1.5;">Manage all your listings and engage with buyers directly</td>
          </tr>
        </table>
      </div>

      <p>
        Whether you are looking to monetise your media inventory or sell publications on the WordPress media site that you own, Arcana Mace gives you the infrastructure to do it efficiently.
      </p>

      <div style="margin:24px 0;">
        <strong style="display:block;margin-bottom:14px;">Learn more:</strong>
        <table cellpadding="0" cellspacing="0" style="width:100%;">
          <tr><td style="padding:0 0 10px 0;">
            <a href="https://arcanamace.com/self-publishing" style="display:block;background:#1a73e8;color:#ffffff;text-decoration:none;padding:14px 20px;font-size:14px;font-weight:400;letter-spacing:0.3px;">How self publishing works with connected WordPress sites</a>
          </td></tr>
          <tr><td style="padding:0 0 10px 0;">
            <a href="https://arcanamace.com/media-buying" style="display:block;background:#1a73e8;color:#ffffff;text-decoration:none;padding:14px 20px;font-size:14px;font-weight:400;letter-spacing:0.3px;">Learn more about media buying</a>
          </td></tr>
          <tr><td style="padding:0;">
            <a href="https://arcanamace.com/how-it-works" style="display:block;background:#1a73e8;color:#ffffff;text-decoration:none;padding:14px 20px;font-size:14px;font-weight:400;letter-spacing:0.3px;">How Arcana Mace works</a>
          </td></tr>
        </table>
      </div>

      <div class="cta">
        <a href="https://arcanamace.com">JOIN ARCANA MACE</a>
      </div>

      <p>We look forward to having you on board.</p>
      <p>
        Best regards,<br>
        <strong>The Arcana Mace Team</strong>
      </p>
    </div>
    <div class="footer">
      &copy; 2026 Arcana Mace &nbsp;|&nbsp; arcanamace.com<br>
      You are receiving this because your agency was identified as a potential partner.
    </div>
  </div>
</body>
</html>"""

LEADS = [
    {"id":439, "name":"Rooster PR",                        "contact":"hello@rooster.co.uk"},
    {"id":440, "name":"Rostrum Agency",                    "contact":"hello@rostrum.agency"},
    {"id":441, "name":"Seven Hills",                       "contact":"hello@wearesevenhills.com"},
    {"id":442, "name":"CCgroup",                           "contact":"hello@ccgrouppr.com"},
    {"id":443, "name":"Red Lorry Yellow Lorry",            "contact":"hello@rlyl.co.uk"},
    {"id":444, "name":"Hudson Sandler",                    "contact":"hello@hudsonsandler.com"},
    {"id":445, "name":"Say Communications",                "contact":"hello@saycomms.co.uk"},
    {"id":446, "name":"Threepipe",                         "contact":"hello@threepipe.co.uk"},
    {"id":447, "name":"Fieldhouse Associates",             "contact":"hello@fieldhouseassociates.com"},
    {"id":448, "name":"CommsCo",                           "contact":"hello@thecommsco.com"},
    {"id":449, "name":"Transmission Private",              "contact":"enquiry@transmission-private.com"},
    {"id":450, "name":"Cherish PR",                        "contact":"info@cherishpr.com"},
    {"id":451, "name":"Midas PR",                          "contact":"info@midaspr.co.uk"},
    {"id":452, "name":"Kaizo PR",                          "contact":"info@kaizo.co.uk"},
    {"id":453, "name":"Roche Communications",              "contact":"info@rochecom.com"},
    {"id":454, "name":"Platform Communications",           "contact":"info@platformcomms.com"},
    {"id":455, "name":"Spreckley Partners",                "contact":"info@spreckley.co.uk"},
    {"id":456, "name":"Clementine Communications",         "contact":"info@clementinecom.com"},
    {"id":457, "name":"Gosh PR",                           "contact":"info@goshpr.co.uk"},
    {"id":458, "name":"The Whitehouse Consultancy",        "contact":"info@whitehouseconsulting.co.uk"},
    {"id":459, "name":"SE10",                              "contact":"info.uk@se10.com"},
    {"id":460, "name":"PR Office",                         "contact":"info@theproffice.com"},
    {"id":461, "name":"Gresham PR",                        "contact":"neil.boom@greshampr.co.uk"},
    {"id":462, "name":"Munch PR",                          "contact":"theteam@munchpr.com"},
    {"id":463, "name":"Lily Pad PR",                       "contact":"hello@lilypadpr.co.uk"},
    {"id":464, "name":"Eskenzi PR",                        "contact":"katie@eskenzipr.com"},
    {"id":465, "name":"Whiteoaks PR",                      "contact":"hello@whiteoaks.co.uk"},
    {"id":466, "name":"Citypress",                         "contact":"hello@citypress.co.uk"},
    {"id":467, "name":"Brazen PR",                         "contact":"info@wearebrazenpr.com"},
    {"id":468, "name":"Sugar PR",                          "contact":"hello@sugarpr.co.uk"},
    {"id":469, "name":"Galibier PR",                       "contact":"jobs@galibierpr.co.uk"},
    {"id":470, "name":"Vitis PR",                          "contact":"info@vitispr.com"},
    {"id":471, "name":"Prohibition PR",                    "contact":"hello@prohibitionpr.co.uk"},
    {"id":472, "name":"MacComms",                          "contact":"info@maccomms.net"},
    {"id":473, "name":"Aberfield Communications",          "contact":"hello@aberfield.com"},
    {"id":474, "name":"Stripe Communications",             "contact":"hello@stripecommunications.com"},
    {"id":475, "name":"Acumen PR",                         "contact":"kevin.dorrian@acumen-pr.com"},
    {"id":476, "name":"Holyrood PR",                       "contact":"info@holyroodpr.co.uk"},
    {"id":477, "name":"Perceptive Communicators",          "contact":"info@perceptivecommunicators.co.uk"},
    {"id":478, "name":"Tigerbond",                         "contact":"hello@tigerbond.com"},
    {"id":479, "name":"Highlight PR",                      "contact":"hello@highlightpr.co.uk"},
    {"id":480, "name":"Purplefish",                        "contact":"hello@purplefish.agency"},
    {"id":481, "name":"Ambitious PR",                      "contact":"hello@ambitiouspr.co.uk"},
    {"id":482, "name":"Harvey & Hugo",                     "contact":"info@harveyandhugo.com"},
    {"id":483, "name":"Viva PR",                           "contact":"hello@vivapr.co.uk"},
    {"id":484, "name":"Propel PR",                         "contact":"info@propelpr.co.uk"},
    {"id":485, "name":"Altitude PR",                       "contact":"info@altitudepr.co.uk"},
    {"id":486, "name":"Dragonfly PR",                      "contact":"hello@dragonflypr.co.uk"},
    {"id":487, "name":"Motive PR",                         "contact":"hello@motivepr.co.uk"},
    {"id":488, "name":"Tank PR",                           "contact":"info@tank.co.uk"},
]

def main():
    resend.api_key = API_KEY
    print(f"\n{'='*60}\n  ARCANA MACE — UK PR AGENCIES CAMPAIGN\n  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n  From: {FROM_EMAIL}\n  Sending to {len(LEADS)} leads\n{'='*60}\n")
    confirm = input(f"  Ready to send {len(LEADS)} emails. Type YES to confirm: ").strip()
    if confirm.upper() != "YES":
        print("  Cancelled.")
        return
    print()
    sent, errors = 0, 0
    for i, lead in enumerate(LEADS, 1):
        print(f"[{i}/{len(LEADS)}] {lead['name']}\n         → {lead['contact']}")
        try:
            result = resend.Emails.send({"from": f"{FROM_NAME} <{FROM_EMAIL}>", "to": [lead["contact"]], "subject": SUBJECT, "html": build_html(lead["contact"])})
            print(f"         ✓ Sent — ID: {result['id']}")
            sent += 1
        except Exception as e:
            print(f"         ✗ Error — {e}")
            errors += 1
        if i < len(LEADS):
            time.sleep(DELAY_SECONDS)
    print(f"\n{'='*60}\n  COMPLETE  ✓ Sent: {sent}  ✗ Errors: {errors}\n{'='*60}\n")

if __name__ == "__main__":
    main()
