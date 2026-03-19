#!/usr/bin/env python3
"""
Defence Trading — Local server with Resend subscribe proxy.
Run: python3 server.py
Then open: http://localhost:3000
"""

import json
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler

RESEND_API_KEY = "re_hmAy6zqd_EY9FFWNQsBgPdBy8vGvQXbTS"
AUDIENCE_ID    = "56eef90f-316b-4a16-9ba0-c1c0140fb864"
PORT           = 3000


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"  {self.address_string()} — {fmt % args}")

    def do_POST(self):
        if self.path == "/subscribe":
            length = int(self.headers.get("Content-Length", 0))
            body   = json.loads(self.rfile.read(length))
            email  = body.get("email", "").strip()
            company = body.get("company", "").strip()

            if not email:
                self._json(400, {"ok": False, "error": "Email required"})
                return

            payload = json.dumps({
                "email":       email,
                "first_name":  company,
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
                # 409 = contact already exists — still a success
                if e.code == 409:
                    self._json(200, {"ok": True})
                else:
                    err = e.read().decode()
                    print(f"  Resend error {e.code}: {err}")
                    self._json(500, {"ok": False, "error": err})
        else:
            self._json(404, {"ok": False})

    def _json(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(body))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    print(f"\n  Defence Trading server running at http://localhost:{PORT}")
    print(f"  Resend audience: {AUDIENCE_ID}")
    if "YOUR_API_KEY" in RESEND_API_KEY:
        print("  ⚠  Remember to set your RESEND_API_KEY in server.py\n")
    HTTPServer(("", PORT), Handler).serve_forever()
