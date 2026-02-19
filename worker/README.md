# Bananocraft Feed Worker

Cloudflare Worker + KV that powers the live feed on bananocraft.cc/feed.

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) with `bananocraft.cc` added as a zone
- [Node.js](https://nodejs.org/) v18+ installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) — Cloudflare's CLI tool

## Setup (step-by-step)

### 1. Install Wrangler

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

This opens a browser window — log in and authorize Wrangler.

### 3. Create the KV namespace

From the `worker/` directory:

```bash
cd worker
wrangler kv namespace create FEED_KV
```

This outputs something like:

```
🌀 Creating namespace with title "bananocraft-feed-FEED_KV"
✨ Success! Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "FEED_KV", id = "abcd1234567890" }
]
```

Copy that `id` value and paste it into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.

### 4. Generate and set the API key

Generate a strong random key:

```bash
openssl rand -hex 32
```

This produces something like `a3f8c1d9e7b24a5f...` — save this, you'll also need it for the bot config.

Now store it as a secret in the Worker:

```bash
wrangler secret put API_KEY
```

Paste the key when prompted. This is stored encrypted — it never appears in your code or config files.

### 5. Configure the route (optional but recommended)

To serve the worker at `feed.bananocraft.cc`, uncomment and update the route in `wrangler.toml`:

```toml
routes = [
  { pattern = "feed.bananocraft.cc/*", zone_name = "bananocraft.cc" }
]
```

Then add a DNS record in Cloudflare Dashboard → **DNS → Records**:

| Type   | Name   | Content         | Proxy   |
|--------|--------|-----------------|---------|
| `AAAA` | `feed` | `100::1`        | Proxied (orange) |

> Using `AAAA 100::1` is the standard Cloudflare trick for Worker-only subdomains (no origin server needed). The orange cloud proxy must be enabled.

If you skip this step, the worker will be available at `bananocraft-feed.<your-subdomain>.workers.dev` instead — update the `FEED_API` URL in `content/feed.md` accordingly.

### 6. Deploy

```bash
wrangler deploy
```

### 7. Test it

Send a test event:

```bash
curl -X POST https://feed.bananocraft.cc/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -d '{"player": "Steve", "amount": 1.5, "action": "mining diamonds"}'
```

Check the feed:

```bash
curl https://feed.bananocraft.cc/api/events
```

Then visit https://bananocraft.cc/feed — you should see the event.

## API

### POST /api/events

Adds a new feed event. Requires `Authorization: Bearer <API_KEY>` header.

```json
{
  "player": "Steve",
  "amount": 1.5,
  "action": "mining diamonds"
}
```

Renders as: **Steve just found 1.5 banano while mining diamonds**

### GET /api/events

Returns the latest events (most recent first). Used by the webpage.

```json
{
  "events": [
    {
      "id": "1708300000000-abc123",
      "player": "Steve",
      "amount": 1.5,
      "action": "mining diamonds",
      "timestamp": 1708300000000
    }
  ]
}
```

Query params:
- `limit` — number of events to return (default: 50, max: 200)

## Bot / Plugin Integration

The discord-srv bot or Minecraft plugin should POST to this worker whenever a reward is sent.

### From a shell / bot script

```bash
curl -X POST https://feed.bananocraft.cc/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"player": "Steve", "amount": 1.5, "action": "mining diamonds"}'
```

### From Java (Minecraft plugin)

```java
HttpURLConnection conn = (HttpURLConnection) new URL("https://feed.bananocraft.cc/api/events").openConnection();
conn.setRequestMethod("POST");
conn.setRequestProperty("Content-Type", "application/json");
conn.setRequestProperty("Authorization", "Bearer " + API_KEY);
conn.setDoOutput(true);

String json = String.format("{\"player\":\"%s\",\"amount\":%f,\"action\":\"%s\"}", playerName, amount, action);
conn.getOutputStream().write(json.getBytes());
conn.getResponseCode(); // 201 = success
```

### Fields

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| `player` | string | yes      | Player name                        |
| `amount` | number | yes      | Banano amount rewarded             |
| `action` | string | yes      | What the player was doing           |
