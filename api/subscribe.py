import json
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

RESEND_API_KEY = "re_hmAy6zqd_EY9FFWNQsBgPdBy8vGvQXbTS"
AUDIENCE_ID    = "56eef90f-316b-4a16-9ba0-c1c0140fb864"


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body   = json.loads(self.rfile.read(length))
        email   = body.get("email", "").strip()
        company = body.get("company", "").strip()

        if not email:
            self._json(400, {"ok": False, "error": "Email required"})
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
                self._json(200, {"ok": True})
        except urllib.error.HTTPError as e:
            if e.code == 409:
                self._json(200, {"ok": True})
            else:
                err = e.read().decode()
                self._json(500, {"ok": False, "error": err})

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self._cors()
        self.end_headers()
        self.wfile.write(body)
