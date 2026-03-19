# CLAUDE.md — Session Context & Business Profile
> This file is auto-loaded by Claude Code at the start of every terminal session.
> Last updated: March 2026

---

## 👤 About Me & My Business

- **Name:** Paul
- **Company:** UAE-licensed defence trading company
- **Location:** Dubai, UAE
- **Business Type:** B2B Defence Trading & Manufacturing
- **Licence:** UAE-licensed to trade military defence products
- **Core Offerings:**
  - Defence product supply (protective equipment, uniforms, comms gear, medical supplies, logistics, vehicles)
  - In-house manufacturing capabilities (custom specs, large-volume orders)
  - International trade routes — Middle East, Europe, and beyond
  - Full UAE defence trade regulatory compliance

---

## 🎯 Current Projects

### 1. US Defence Industry Lead Generation
- Researched and compiled **100 US-based defence companies** as potential B2B clients
- Saved as: `US_Defense_Leads_100.xlsx`
- Categories: Protective Equipment, Military Uniforms, Communications Gear, Logistics & Supply, Medical Supplies, Military Vehicles
- Sizes: Small, SME, Mid-size, Large (includes Tier-1 primes like Lockheed, Boeing, L3Harris)
- Leads also saved to **persistent browser storage** via `save_leads.html`

### 2. Email Outreach Campaign
- Built a **Python email campaign script**: `send_campaign.py`
- Uses **Resend.com API** to send personalised formal outreach emails
- All 100 leads pre-loaded in the script
- Email tone: Formal & professional
- Template personalises: company name, category, location per lead

#### To run the email campaign:
```bash
pip install resend
python send_campaign.py
```
#### Config to fill in `send_campaign.py`:
```python
API_KEY       = "re_YOUR_KEY"        # Resend API key
FROM_EMAIL    = "you@yourdomain.com" # Verified domain in Resend
FROM_NAME     = "Your Company Name"
TEST_MODE     = True                 # Set False when ready to send
```

### 3. Claude Code Terminal Setup
- Installing Claude Code via: `curl -fsSL https://claude.ai/install.sh | bash`
- Auth: Login with existing Claude Pro account (no API key needed)
- Pro subscription includes Claude Code — usage shared with claude.ai

---

## 📁 Project Files

| File | Description |
|------|-------------|
| `US_Defense_Leads_100.xlsx` | Full 100-lead spreadsheet, color-coded by category & size |
| `send_campaign.py` | Python email campaign script (Resend API, all 100 leads pre-loaded) |
| `defense_email_campaign.html` | Browser-based email campaign UI (visual tool) |
| `save_leads.html` | Saves all 100 leads to persistent browser storage |
| `CLAUDE.md` | This file — auto-loaded context for every Claude Code session |

---

## 🏢 The 100 Leads (Quick Reference)

### Protective Equipment (17 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 1 | Chase Tactical | Small | info@chasetactical.com |
| 2 | Hard Head Veterans | Small | support@hardheadveterans.com |
| 3 | Hardwire LLC | SME | info@hardwirellc.com |
| 4 | Sarkar Tactical | SME | contact@sarkartactical.com |
| 5 | ArmorSource LLC | SME | Via web form |
| 6 | RMA Armament | Small | info@rmadefense.com |
| 7 | Armor Express | SME | info@armorexpress.com |
| 8 | Team Wendy | SME | info@teamwendy.com |
| 9 | Gentex Corporation | Mid-size | defense@gentexcorp.com |
| 10 | Point Blank Enterprises | Mid-size | info@pointblankenterprises.com |
| 11 | Revision Military | SME | info@revisionmilitary.com |
| 12 | United Shield Intl. | SME | info@unitedshield.com |
| 13 | Eagle Industries | SME | sales@eagleindustries.com |
| 14 | Atomic Defense | Small | support@atomicdefense.com |
| 15 | Premier Body Armor | Small | info@premierbodyarmor.com |
| 16 | BAE Systems Inc. | Large | Via web form |
| 17 | Avon Protection | Mid-size | defense@avon-protection.com |

### Military Uniforms (15 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 18 | Crye Precision | Small | info@cryeprecision.com |
| 19 | Bluewater Defense | Small | info@bluewaterdefense.com |
| 20 | Aurora Industries LLC | Small | Via web form |
| 21 | Condor Outdoor Products | SME | info@condoroutdoor.com |
| 22 | Massif | Small | sales@massif.com |
| 23 | Propper International | Mid-size | government@propper.com |
| 24 | Brookwood Companies | Mid-size | military@brookwoodcompanies.com |
| 25 | Navajo Fabrics | SME | Via web form |
| 26 | Fechheimer Brothers | Mid-size | Via web form |
| 27 | Rothco | SME | sales@rothco.com |
| 28 | SNC Technical Services | Mid-size | info@snc.org |
| 29 | Milliken & Company | Large | government@milliken.com |
| 30 | 5.11 Tactical | Mid-size | customerservice@511tactical.com |
| 31 | Tru-Spec | SME | sales@tru-spec.com |
| 32 | Beyond Clothing | Small | info@beyondclothing.com |

### Communications Gear (14 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 33 | L3Harris Technologies | Large | Via web form |
| 34 | Collins Aerospace | Large | Via web form |
| 35 | General Dynamics IT | Large | Via web form |
| 36 | Northrop Grumman | Large | Via web form |
| 37 | Viasat Inc. | Mid-size | defense@viasat.com |
| 38 | Silvus Technologies | SME | info@silvustechnologies.com |
| 39 | Kratos Defense | Mid-size | info@kratosdefense.com |
| 40 | Curtiss-Wright Defense | Mid-size | defense@curtisswright.com |
| 41 | Thales Defense & Security | Mid-size | info@thalesdsi.com |
| 42 | Pacific Defense Solutions | SME | info@pacificdefense.com |
| 43 | Persistent Systems LLC | SME | info@persistentsystems.com |
| 44 | Leonardo DRS | Mid-size | info@leonardodrs.com |
| 45 | Triad RF Systems | Small | sales@triadrfsystems.com |
| 46 | Barrett Communications | SME | sales@barrettcommunications.com |

### Logistics & Supply Chain (16 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 47 | ADS Inc. | Mid-size | info@adsinc.com |
| 48 | Darley Defense | Mid-size | defense@darley.com |
| 49 | SupplyCore Inc. | SME | info@supplycore.com |
| 50 | Incredible Supply (ISL) | SME | info@incrediblesupply.com |
| 51 | Greenwood Aerospace | SME | info@governmentprocurement.com |
| 52 | Crane Worldwide Logistics | Mid-size | government@craneww.com |
| 53 | Phoenix Logistics Inc. | SME | info@phoenixlogistics.com |
| 54 | KLX Defense Services | Mid-size | defense@klxaerospace.com |
| 55 | Booz Allen Hamilton | Large | Via web form |
| 56 | Leidos Holdings | Large | Via web form |
| 57 | Peraton Corp. | Large | Via web form |
| 58 | Amentum | Large | Via web form |
| 59 | Federal Defense Inds (FDI) | SME | info@fdi.us.com |
| 60 | M1 Support Services | Mid-size | info@m1support.com |
| 61 | Analytic Services Inc. | Mid-size | info@anser.org |
| 62 | Atlantic Diving Supply | Mid-size | info@adsinc.com |

### Medical Supplies (14 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 63 | McKesson Corporation | Large | government@mckesson.com |
| 64 | Cencora Inc. | Large | Via web form |
| 65 | Humana Military | Large | Via web form |
| 66 | Leidos Health | Large | health@leidos.com |
| 67 | Advancia Aeronautics | Small | info@advancia.com |
| 68 | CentralCare | Small | info@centralcare.com |
| 69 | Spectrum Healthcare Res. | SME | info@spectrumhealthcare.com |
| 70 | TriWest Healthcare | Mid-size | Via web form |
| 71 | Medline Industries | Large | government@medline.com |
| 72 | Cardinal Health | Large | government@cardinalhealth.com |
| 73 | BioTechLogic | Small | info@biotechlogic.com |
| 74 | North American Rescue | SME | info@narescue.com |
| 75 | Chinook Medical Gear | Small | info@chinookmed.com |
| 76 | Bound Tree Medical | SME | info@boundtree.com |

### Military Vehicles (18 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 77 | Oshkosh Defense | Large | defense@oshkoshdefense.com |
| 78 | General Dynamics Land | Large | Via web form |
| 79 | BAE Systems Vehicles | Large | Via web form |
| 80 | Textron Systems | Large | Via web form |
| 81 | AM General | Mid-size | info@amgeneral.com |
| 82 | Flyer Defense LLC | SME | info@flyerdefense.com |
| 83 | American Rheinmetall | Mid-size | info@american.rheinmetall.com |
| 84 | Navistar Defense | Mid-size | defense@navistar.com |
| 85 | HDT Global | SME | info@hdtglobal.com |
| 86 | McLaughlin Body Co. | SME | info@mclaughlinbody.com |
| 87 | Jankel Tactical Systems | Small | info@jankeltactical.com |
| 88 | Terradyne Armored Veh. | Small | info@terradyne.com |
| 89 | Force Protection Inc. | SME | info@forceprotection.net |
| 90 | Polaris Defense | Mid-size | defense@polaris.com |
| 91 | Caterpillar Defense | Large | government@cat.com |
| 92 | ND Defense LLC | SME | info@nddefense.com |
| 93 | Hendrick Dynamics | Small | info@hendrickdynamics.com |
| 94 | Indigen Armor | Small | info@indigenarmor.com |

### Tier-1 Primes & Mixed (6 companies)
| # | Company | Size | Email |
|---|---------|------|-------|
| 95 | Lockheed Martin | Large | Via web form |
| 96 | RTX Corporation | Large | Via web form |
| 97 | Boeing Defense | Large | Via web form |
| 98 | CACI International | Mid-size | Via web form |
| 99 | Parsons Corporation | Mid-size | defense@parsons.com |
| 100 | Huntington Ingalls (HII) | Large | Via web form |

---

## 💬 Preferences & Style

- **Communication style:** Direct, professional
- **Output preference:** Spreadsheets (xlsx), Python scripts, markdown files
- **Email tone:** Formal & professional
- **Tools used:** Resend.com for email, Python for scripting
- **Platform:** Mac (macOS), terminal = zsh

---

## 🚀 Quick Commands

```bash
# Run email campaign (test mode)
python send_campaign.py

# Install Claude Code (if not done yet)
curl -fsSL https://claude.ai/install.sh | bash

# Install Resend library
pip install resend

# Open project folder (update path as needed)
cd ~/Desktop/defence-campaign
```

---

## 📌 Things To Do / Continue

- [ ] Fill in API key and FROM_EMAIL in `send_campaign.py`
- [ ] Verify sending domain in Resend dashboard
- [ ] Set `TEST_MODE = False` and launch email campaign
- [ ] Follow up with leads that respond
- [ ] Consider expanding lead search to Europe or Middle East
- [ ] Add more leads or filter by specific category/size

---

## 🗒️ How To Use This File

Place `CLAUDE.md` in your project folder, then every time you start Claude Code in that folder it will automatically load all this context. You never need to re-explain your business or projects.

```bash
# Place this file in your project directory
mkdir ~/defence-campaign
mv CLAUDE.md ~/defence-campaign/
mv send_campaign.py ~/defence-campaign/
cd ~/defence-campaign
claude   # ← starts with full context automatically
```
