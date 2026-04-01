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

            first     = body.get("first_name", "")
            last      = body.get("last_name", "")
            email     = body.get("email", "")
            company   = body.get("company", "")
            country   = body.get("country", "")
            phone     = body.get("phone", "")
            org_type  = body.get("org_type", "")
            role      = body.get("role", "")
            req_type  = body.get("request_type", "")
            interests = body.get("interests", [])
            message   = body.get("message", "")

            if not email or not first:
                self._respond(400, {"ok": False, "error": "Required fields missing"})
                return

            interests_str = ", ".join(interests) if interests else "None selected"

            html_body = f"""
<h2>New Contact Enquiry — Defence Trading</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
  <tr><td><strong>Name</strong></td><td>{first} {last}</td></tr>
  <tr><td><strong>Email</strong></td><td>{email}</td></tr>
  <tr><td><strong>Company</strong></td><td>{company}</td></tr>
  <tr><td><strong>Country</strong></td><td>{country}</td></tr>
  <tr><td><strong>Phone</strong></td><td>{phone}</td></tr>
  <tr><td><strong>Organisation Type</strong></td><td>{org_type}</td></tr>
  <tr><td><strong>Primary Role</strong></td><td>{role}</td></tr>
  <tr><td><strong>Request Type</strong></td><td>{req_type}</td></tr>
  <tr><td><strong>Interested In</strong></td><td>{interests_str}</td></tr>
  <tr><td><strong>Message</strong></td><td>{message}</td></tr>
</table>"""

            payload = json.dumps({
                "from": "Defence Trading <noreply@defencetrading.com>",
                "to": [TO_EMAIL],
                "reply_to": email,
                "subject": f"New enquiry from {first} {last} — {company}",
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
