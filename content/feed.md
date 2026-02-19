---
title: "Live Feed"
---

<div id="feed-container">
  <p id="feed-loading" style="color: var(--accent); font-family: monospace;">Loading feed...</p>
  <ul id="feed-list" style="list-style: none; padding: 0; margin: 0;"></ul>
</div>

<style>
  #feed-list li {
    padding: 0.5rem 0;
    border-bottom: 1px dashed var(--accent);
    font-family: monospace;
    font-size: 0.95rem;
  }
  #feed-list li:last-child {
    border-bottom: none;
  }
  .feed-player {
    color: var(--accent);
    font-weight: bold;
  }
  .feed-amount {
    color: #fbec5d;
    font-weight: bold;
  }
  .feed-time {
    color: #888;
    font-size: 0.8rem;
    margin-left: 0.5rem;
  }
  #feed-empty {
    color: #888;
    font-style: italic;
  }
</style>

<script>
  // Change this to your Cloudflare Worker URL once deployed
  const FEED_API = "https://feed.bananocraft.cc/api/events";
  const POLL_INTERVAL = 15000; // 15 seconds

  async function fetchFeed() {
    try {
      const res = await fetch(FEED_API + "?limit=50");
      if (!res.ok) throw new Error("Feed unavailable");
      const data = await res.json();
      renderFeed(data.events);
    } catch (err) {
      document.getElementById("feed-loading").textContent =
        "Feed currently unavailable. Check back soon!";
    }
  }

  function timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + "m ago";
    if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
    return Math.floor(diff / 86400) + "d ago";
  }

  function renderFeed(events) {
    const loading = document.getElementById("feed-loading");
    const list = document.getElementById("feed-list");

    loading.style.display = "none";
    list.innerHTML = "";

    if (!events || events.length === 0) {
      list.innerHTML = '<li id="feed-empty">No rewards yet... go mine something!</li>';
      return;
    }

    events.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML =
        '<span class="feed-player">' + escapeHtml(e.player) + "</span>" +
        " just found " +
        '<span class="feed-amount">' + e.amount + " banano</span>" +
        " while " + escapeHtml(e.action) +
        '<span class="feed-time">' + timeAgo(e.timestamp) + "</span>";
      list.appendChild(li);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Initial fetch + polling
  fetchFeed();
  setInterval(fetchFeed, POLL_INTERVAL);
</script>
