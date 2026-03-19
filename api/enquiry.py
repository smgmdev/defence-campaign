import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
TO_EMAIL = "sales@defencetrading.com"


class handler(BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        pass

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))

            product   = body.get("product", "")
            full_name = body.get("full_name", "")
            company   = body.get("company", "")
            country   = body.get("country", "")
            email     = body.get("email", "")
            whatsapp  = body.get("whatsapp", "")

            if not email or not full_name or not product:
                self._respond(400, {"ok": False, "error": "Required fields missing"})
                return

            html_body = f"""
<h2>Product Enquiry — Defence Trading</h2>
<h3 style="color:#c8102e;">Enquiry for: {product}</h3>
<table cellpadding="8" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
  <tr><td><strong>Full Name</strong></td><td>{full_name}</td></tr>
  <tr><td><strong>Company</strong></td><td>{company}</td></tr>
  <tr><td><strong>Country</strong></td><td>{country}</td></tr>
  <tr><td><strong>Email</strong></td><td>{email}</td></tr>
  <tr><td><strong>WhatsApp</strong></td><td>{whatsapp}</td></tr>
  <tr><td><strong>Product</strong></td><td>{product}</td></tr>
</table>"""

            payload = json.dumps({
                "from": "Defence Trading <noreply@defencetrading.com>",
                "to": [TO_EMAIL],
                "reply_to": email,
                "subject": f"Enquiry for {product} — {full_name}, {company}",
                "html": html_body
            }).encode()

            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=payload,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                    "User-Agent": "DefenceTrading/1.0",
                },
                method="POST"
            )

            try:
                with urllib.request.urlopen(req) as r:
                    self._respond(200, {"ok": True})
            except urllib.error.HTTPError as e:
                err = e.read().decode()
                self._respond(500, {"ok": False, "error": err})

        except Exception as e:
            self._respond(500, {"ok": False, "error": str(e)})

    def _respond(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)
