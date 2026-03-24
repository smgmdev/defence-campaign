import resend
import time
from datetime import datetime

API_KEY       = "re_hmAy6zqd_EY9FFWNQsBgPdBy8vGvQXbTS"
FROM_EMAIL    = "noreply@arcanamace.com"
FROM_NAME     = "Arcana Mace"
DELAY_SECONDS = 2

SUBJECT = "List Your Media Channels on Arcana Mace — Join the Marketplace"

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
    # New York
    {"name": "5W Public Relations",          "contact": "info@5wpr.com"},
    {"name": "Macias PR",                    "contact": "mark@maciaspr.com"},
    {"name": "Praytell Agency",              "contact": "hello@praytellagency.com"},
    {"name": "DKC",                          "contact": "ny@dkcnews.com"},
    {"name": "Crenshaw Communications",      "contact": "olivia@crenshawcomm.com"},
    {"name": "BPCM New York",                "contact": "ny@bpcm.com"},
    {"name": "MikeWorldWide",                "contact": "bwerner@mww.com"},
    # Chicago
    {"name": "Zapwater Communications",      "contact": "david@zapwater.com"},
    {"name": "CarusoPR",                     "contact": "info@carusopr.com"},
    {"name": "Mekky Media Relations",        "contact": "hello@mekkymedia.com"},
    # Los Angeles
    {"name": "Public Haus Agency",           "contact": "biz@publichausagency.com"},
    {"name": "BPCM Los Angeles",             "contact": "la@bpcm.com"},
    # Miami
    {"name": "Roar Media",                   "contact": "info@roarmedia.com"},
    {"name": "Levy Public Relations",        "contact": "info@levypublicrelations.com"},
    {"name": "Cultivate PR",                 "contact": "sdemaria@cultivate-pr.com"},
    {"name": "Heyday Marketing + PR",        "contact": "emoya@heydaymarketing.com"},
    # Austin / Houston / Texas
    {"name": "INK Communications Co.",       "contact": "kersa@ink-co.com"},
    {"name": "The PR Boutique",              "contact": "info@theprboutique.com"},
    {"name": "Pierpont Communications",      "contact": "info@piercom.com"},
    # San Francisco
    {"name": "Singer Associates PR",         "contact": "info@singersf.com"},
    {"name": "Bospar",                       "contact": "results@bospar.com"},
    {"name": "Landis Communications",        "contact": "info@landispr.com"},
    {"name": "Chamberlin PR",                "contact": "info@chamberlinpr.com"},
    # Seattle
    {"name": "Communique PR",                "contact": "info@communiquepr.com"},
    # Scottsdale / Phoenix
    {"name": "HMA PR",                       "contact": "info@hmapr.com"},
    {"name": "Adler Public Relations",       "contact": "jennifer@adlerpublicrelations.com"},
    # Portland
    {"name": "A.wordsmith",                  "contact": "info@awordsmith.com"},
    # San Diego
    {"name": "Crowe PR",                     "contact": "info@crowepr.com"},
    {"name": "Lee and London PR",            "contact": "info@leeandlondon.com"},
    {"name": "J. Walcher Communications",    "contact": "pr@jwalcher.com"},
    # Minneapolis / St. Paul
    {"name": "Maccabee PR",                  "contact": "paul@maccabee.com"},
    {"name": "Bellmont Partners",            "contact": "info@bellmontpartners.com"},
    {"name": "Lola Red PR",                  "contact": "partnerships@lolared.com"},
    {"name": "Beehive Strategic Communication", "contact": "info@beehivepr.biz"},
    # Nashville
    {"name": "Reed Public Relations",        "contact": "hello@reedpublicrelations.com"},
    # Kansas City / St. Louis
    {"name": "Parson + Associates",          "contact": "team@parsonkc.com"},
    {"name": "Common Ground PR",             "contact": "info@commongroundpr.com"},
    # Boston / Washington DC
    {"name": "Rasky Partners",               "contact": "raskypartners@rasky.com"},
    {"name": "Eleven Eleven PR",             "contact": "sara@elevenelevenpr.co"},
    # Charlotte / Raleigh
    {"name": "PIVOT PR",                     "contact": "info@pivot-pr.com"},
    {"name": "McKeeman Communications",      "contact": "kim@mckeemanpr.com"},
    # Las Vegas
    {"name": "Kirvin Doak Communications",   "contact": "info@kirvindoak.com"},
    {"name": "GYC Vegas",                    "contact": "info@gycvegas.com"},
    {"name": "Rossetti PR",                  "contact": "hello@rossettipr.com"},
    {"name": "BrandBomb PR",                 "contact": "pr@brandbombpr.com"},
    {"name": "Authentic Public Relations",   "contact": "contact@authenticpublicrelations.com"},
]

def main():
    resend.api_key = API_KEY
    print(f"\n{'='*60}\n  ARCANA MACE — USA PR AGENCIES CAMPAIGN\n  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n  From: {FROM_EMAIL}\n  Sending to {len(LEADS)} leads\n{'='*60}\n")
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
