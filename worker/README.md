# Bananocraft Feed Worker

Cloudflare Worker + KV that powers the live feed on bananocraft.cc/feed.

## Setup

1. Install Wrangler CLI: `npm install -g wrangler`
2. Login: `wrangler login`
3. Create KV namespace: `wrangler kv namespace create FEED_KV`
4. Copy the binding ID into `wrangler.toml`
5. Set the auth secret: `wrangler secret put API_KEY`
6. Deploy: `wrangler deploy`

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

## Bot Integration

The discord-srv bot (or Minecraft plugin) should POST to this worker whenever a reward is sent:

```bash
curl -X POST https://feed.bananocraft.cc/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"player": "Steve", "amount": 1.5, "action": "mining diamonds"}'
```
