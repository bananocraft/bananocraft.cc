const MAX_EVENTS = 500;
const EVENTS_KEY = "events";

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

  const event = {
    id: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    player: String(player),
    amount: Number(amount),
    action: String(action),
    timestamp: Date.now(),
  };

  // Get existing events
  const existing = await env.FEED_KV.get(EVENTS_KEY, { type: "json" });
  const events = existing || [];

  // Prepend new event, cap at MAX_EVENTS
  events.unshift(event);
  if (events.length > MAX_EVENTS) {
    events.length = MAX_EVENTS;
  }

  await env.FEED_KV.put(EVENTS_KEY, JSON.stringify(events));

  return new Response(JSON.stringify({ ok: true, event }), {
    status: 201,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

async function handleGet(request, env, corsHeaders) {
  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "50", 10), 1), 200);

  const existing = await env.FEED_KV.get(EVENTS_KEY, { type: "json" });
  const events = (existing || []).slice(0, limit);

  return new Response(JSON.stringify({ events }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=5",
      ...corsHeaders,
    },
  });
}
