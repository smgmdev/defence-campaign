import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
AUDIENCE_ID    = "56eef90f-316b-4a16-9ba0-c1c0140fb864"


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
            body   = json.loads(self.rfile.read(length))
            email   = body.get("email", "").strip()
            company = body.get("company", "").strip()

            if not email:
                self._respond(400, {"ok": False, "error": "Email required"})
                return

            payload = json.dumps({
                "email":        email,
                "first_name":   company,
                "unsubscribed": False
            }).encode()

            req = urllib.request.Request(
                f"https://api.resend.com/audiences/{AUDIENCE_ID}/contacts",
                data=payload,
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type":  "application/json",
                },
                method="POST"
            )

            try:
                with urllib.request.urlopen(req) as r:
                    self._respond(200, {"ok": True})
            except urllib.error.HTTPError as e:
                if e.code == 409:
                    self._respond(200, {"ok": True})
                else:
                    err = e.read().decode()
                    self._respond(500, {"ok": False, "error": err, "status": e.code, "key_set": bool(RESEND_API_KEY)})

        except Exception as e:
            self._respond(500, {"ok": False, "error": str(e), "type": type(e).__name__, "key_set": bool(RESEND_API_KEY)})

    def _respond(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)
