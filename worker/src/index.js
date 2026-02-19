const MAX_EVENTS = 500;
const EVENTS_KEY = "events";
const LEADERBOARD_KEY = "leaderboard";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://bananocraft.cc",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/api/events" && request.method === "POST") {
      return handlePost(request, env, corsHeaders);
    }

    if (url.pathname === "/api/events" && request.method === "GET") {
      return handleGet(request, env, corsHeaders);
    }

    if (url.pathname === "/api/leaderboard" && request.method === "GET") {
      return handleLeaderboard(request, env, corsHeaders);
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  },
};

async function handlePost(request, env, corsHeaders) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${env.API_KEY}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { player, amount, action } = body;
  if (!player || amount === undefined || !action) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: player, amount, action" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const amt = Number(amount);
  const playerName = String(player);

  const event = {
    id: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    player: playerName,
    amount: amt,
    action: String(action),
    timestamp: Date.now(),
  };

  // Update events list
  const existing = await env.FEED_KV.get(EVENTS_KEY, { type: "json" });
  const events = existing || [];
  events.unshift(event);
  if (events.length > MAX_EVENTS) {
    events.length = MAX_EVENTS;
  }

  // Update leaderboard (case-insensitive player key, preserves display name)
  const lb = (await env.FEED_KV.get(LEADERBOARD_KEY, { type: "json" })) || { since: Date.now(), players: {} };
  const key = playerName.toLowerCase();
  if (!lb.players[key]) {
    lb.players[key] = { name: playerName, total: 0 };
  }
  lb.players[key].total += amt;
  // Update display name to most recent casing
  lb.players[key].name = playerName;

  await Promise.all([
    env.FEED_KV.put(EVENTS_KEY, JSON.stringify(events)),
    env.FEED_KV.put(LEADERBOARD_KEY, JSON.stringify(lb)),
  ]);

  return new Response(JSON.stringify({ ok: true, event }), {
    status: 201,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleGet(request, env, corsHeaders) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "50", 10), 1), 200);
  const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

  const existing = await env.FEED_KV.get(EVENTS_KEY, { type: "json" });
  const all = existing || [];
  const events = all.slice(offset, offset + limit);
  const hasMore = offset + limit < all.length;

  return new Response(JSON.stringify({ events, hasMore, total: all.length }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=5",
      ...corsHeaders,
    },
  });
}

async function handleLeaderboard(request, env, corsHeaders) {
  const lb = (await env.FEED_KV.get(LEADERBOARD_KEY, { type: "json" })) || { since: Date.now(), players: {} };

  // Sort players by total descending
  const ranked = Object.values(lb.players)
    .sort((a, b) => b.total - a.total);

  return new Response(JSON.stringify({ since: lb.since, players: ranked }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=10",
      ...corsHeaders,
    },
  });
}
