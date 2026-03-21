import json
import os
import urllib.request
import urllib.error
import urllib.parse
from http.server import BaseHTTPRequestHandler

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
AUDIENCE_ID    = "56eef90f-316b-4a16-9ba0-c1c0140fb864"


class handler(BaseHTTPRequestHandler):

    def log_message(self, format, *args):
        pass

    def do_GET(self):
        try:
            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)
            email  = params.get("email", [""])[0].strip()

            if not email:
                self._redirect("/unsubscribe.html?status=error")
                return

            # Mark contact as unsubscribed in Resend audience
            encoded_email = urllib.parse.quote(email)
            payload = json.dumps({"unsubscribed": True}).encode()

            req = urllib.request.Request(
                f"https://api.resend.com/audiences/{AUDIENCE_ID}/contacts/{encoded_email}",
                data=payload,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type":  "application/json",
                    "User-Agent":    "DefenceTrading/1.0",
                },
                method="PATCH"
            )

            try:
                with urllib.request.urlopen(req) as r:
                    pass
            except urllib.error.HTTPError:
                # Contact may not exist in audience yet — still show success
                pass

            encoded = urllib.parse.quote(email)
            self._redirect(f"/unsubscribe.html?status=success&email={encoded}")

        except Exception:
            self._redirect("/unsubscribe.html?status=error")

    def _redirect(self, location):
        self.send_response(302)
        self.send_header("Location", location)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
