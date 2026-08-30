import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import qrcode from "qrcode-terminal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const AUTH_DIR = path.join(ROOT, "auth_info");
const PORT = Number(process.env.WHATSAPP_BAILEYS_PORT || 3100);
const ADMIN_DIGITS = (process.env.WHATSAPP_ADMIN || "+212786713408").replace(/\D/g, "");
const ADMIN_JID = `${ADMIN_DIGITS}@s.whatsapp.net`;

const logger = pino({ level: "silent" });

let sock = null;
let ready = false;
let starting = false;

function adminJid() {
  return ADMIN_JID;
}

async function startSocket() {
  if (starting || ready) return;
  starting = true;
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  sock = makeWASocket({
    auth: state,
    logger,
    markOnlineOnConnect: false,
  });
  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log("\n=== WhatsApp GSM — scanne ce QR avec le téléphone admin (07 86 71 34 08) ===\n");
      qrcode.generate(qr, { small: true });
      console.log("\nWhatsApp → Paramètres → Appareils connectés → Connecter un appareil\n");
    }
    if (connection === "open") {
      ready = true;
      starting = false;
      console.log("WhatsApp local connecté. Notifications vers", adminJid());
    }
    if (connection === "close") {
      ready = false;
      starting = false;
      const code = lastDisconnect?.error instanceof Boom ? lastDisconnect.error.output?.statusCode : 0;
      const loggedOut = code === DisconnectReason.loggedOut;
      console.log("WhatsApp déconnecté", code || "", loggedOut ? "(session expirée, rescanner le QR)" : "");
      sock = null;
      if (!loggedOut) {
        setTimeout(() => {
          startSocket().catch((err) => console.error(err));
        }, 3000);
      }
    }
  });
}

export async function sendAdminNotification(text) {
  if (!sock || !ready) {
    throw new Error("WhatsApp local non connecté. Scannez le QR dans le terminal.");
  }
  await sock.sendMessage(adminJid(), { text });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && url.pathname === "/status") {
    res.end(JSON.stringify({ ready, admin: adminJid() }));
    return;
  }

  if (req.method === "POST" && (url.pathname === "/notify" || url.pathname === "/")) {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try {
      const body = raw ? JSON.parse(raw) : {};
      const text = String(body.text || body.message || "").trim();
      if (!text) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: "Texte manquant" }));
        return;
      }
      await sendAdminNotification(text);
      res.end(JSON.stringify({ ok: true }));
    } catch (error) {
      res.statusCode = 503;
      res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Erreur WhatsApp" }));
    }
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ ok: false }));
});

await startSocket();
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Service WhatsApp local : http://127.0.0.1:${PORT}`);
});
