+++
title = "JungleTV Cinema Player Guide"
date = "2026-07-23T22:22:35.793327-04:00"
author = "AllHailBanano"
authorTwitter = "" #do not include @
cover = ""
description = "Watch, chat, queue, and earn — without leaving Minecraft"
showFullContent = true
readingTime = false
+++

JungleTV Cinema mirrors whatever is playing on [jungletv.live](<https://jungletv.live>) onto in-game screens built from map item frames. You can watch the stream on a cinema screen, read and join JungleTV’s chat, pay BAN to queue your own YouTube videos, collect JungleTV’s watch-to-earn rewards, and chip in toward skipping a video or the viewer tip pool — all from Minecraft chat. This guide covers everything you can do as a player.

**Contents**

  - [Watching the cinema](<#watching>)
  - [Getting the audio](<#audio>)
  - [Screen modes](<#modes>)
  - [Finding out what’s on](<#whats-on>)
  - [JungleTV chat](<#chat>)
  - [Queueing your own videos](<#queueing>)
  - [Segments and long videos](<#segments>)
  - [Managing your queued videos](<#unqueue>)
  - [Rewards](<#rewards>)
  - [Skip & rain](<#skip-rain>)
  - [Leaderboards](<#leaderboards>)
  - [Player commands](<#commands>)
  - [Troubleshooting](<#troubleshooting>)


## Watching the cinema

Screens are built by server admins and placed on walls around the world — there is nothing to craft, carry, or set up. Just walk up to one and look at it. Each screen is made of invisible item frames holding maps, and it is protected: you can’t break the frames, take the maps, or knock them off the wall, and neither can creepers, TNT, or anything else.

Screens only render for players who are reasonably close to them (the server sets the distance, 64 blocks by default). If a screen looks blank or frozen from far away, walk toward it.

To see where the screens are:

    /jungletv list

## Getting the audio

Minecraft maps are pictures only — there is no way to send the soundtrack through the game. For audio, open JungleTV in your browser alongside Minecraft:

    /jungletv link

That posts a clickable [jungletv.live](<https://jungletv.live>) link in your chat. The browser stream and the in-game screen are showing the same thing at the same time, so the audio lines up with the picture on the wall.

> Watching in the browser is also what earns you JungleTV rewards — see [Rewards](<#rewards>) below.

## Screen modes

Each screen runs in one of three modes, chosen by the admins. You don’t set this yourself, but it explains why one screen looks different from another:

Mode| What you see
---|---
Thumbnail| A still image of the video that’s playing, swapped out each time the track changes.
Animated| The same still image, plus a live overlay: viewer count, scrolling title, who queued it, and a moving progress bar.
Video| Actual moving video, decoded live and rendered onto the maps a few frames per second, with the same overlay.

Screens can be anywhere from 1x1 up to 10x10 maps (128 to 1280 pixels square). Video mode is the most demanding on the server, so expect to find it on a dedicated cinema screen rather than on every display.

## Finding out what’s on

Three commands tell you what the plugin is doing:

    /jungletv status
    /jungletv list
    /jungletv info <name>

  - `status` — whether the server is connected to JungleTV, what’s playing right now, how many people are watching, who requested it, and how many screens exist.
  - `list` — every screen with its size, mode, and coordinates.
  - `info` — the details of one screen: size in maps and in pixels, mode, which way it faces, where it is, and the video currently feeding it.


## JungleTV chat

JungleTV has its own live chat, and you can both read it and post to it from Minecraft.

**Reading it** works for everyone, no wallet needed:

    /jungletv chat !listen
    /jungletv chat !silence

Once you’re listening, JungleTV messages appear in your normal Minecraft chat prefixed with `[JTV]`. Only you see them — each player opts in individually. The setting sticks for the rest of the server session: if you log out and back in, the feed resumes automatically, and `!silence` is what turns it off.

**Posting to it** needs BananoCraft, because your message is sent from a JungleTV account tied to your in-game wallet:

    /jungletv chat Hello from bananocraft.cc!

The first time you do this, the plugin signs you in to JungleTV automatically — there’s no separate registration step. It also sets your JungleTV nickname to your Minecraft name, so people on the website see who you are instead of a raw Banano address. If you’re listening to the feed, you’ll see your own message come back through it, which is your confirmation it landed.

## Queueing your own videos

With BananoCraft installed, you can put a YouTube video into JungleTV’s queue and pay for it with your in-game BAN balance.

    /jungletv queue https://youtu.be/dQw4w9WgXcQ
    /jungletv queue dQw4w9WgXcQ

Full URLs and bare 11-character video IDs both work. Here’s what happens:

  1. The plugin signs you in to JungleTV if you haven’t already been signed in this session. This briefly changes your Banano account’s representative to prove you own the wallet, then sets it back to a real representative once verified.
  2. Your chat shows the video title and **three clickable price options** — **Queue** , **Play Next** , and **Play Now** — each with its price in BAN. The sooner you want it to play, the more it costs.
  3. Click one. The payment is sent from your BananoCraft wallet automatically.
  4. You get a confirmation once JungleTV has actually accepted and queued the video.


The price offer expires after a short time, so if you leave it sitting in chat, just run the command again to get fresh prices.

> You’ll sometimes see `/jungletv queueconfirm` mentioned. That’s what the clickable price options run behind the scenes — you never need to type it yourself.

## Segments and long videos

JungleTV caps any single queued item at **35 minutes**. There are two ways to work with that.

**Queue just a part of a video** by adding a start and end time:

    /jungletv queue dQw4w9WgXcQ 1:30 5:00
    /jungletv queue dQw4w9WgXcQ 90 300

Times can be plain seconds, `mm:ss`, or `hh:mm:ss`. The segment must be at least 15 seconds and no more than 35 minutes long, and the end has to come after the start.

**Queue a video that’s longer than the cap** with `full`:

    /jungletv queue dQw4w9WgXcQ full

This breaks the video into consecutive 35-minute segments and queues them in order. You are offered and pay for one segment at a time — the next segment is only prepared once the previous one is paid for. That’s deliberate: it’s what keeps the parts arriving at JungleTV in the right order.

For the same reason, `full` only ever offers the standard **Queue** price. Play Next or Play Now on a later segment could let it jump ahead of an earlier one still waiting, which would play the video out of order.

> On a busy JungleTV queue, someone else’s video can still land between two of your segments. There’s no way to reserve consecutive slots — your parts stay in the right order relative to each other, but they may not be back to back.

## Managing your queued videos

Changed your mind about something you queued? As long as it hasn’t played yet, you can pull it back out:

    /jungletv unqueue

That lists your own still-unplayed queue entries, each with a clickable **[Remove]** link. Clicking one runs `/jungletv unqueue <entryId>` for you. Tab-completing the entry ID also works — it looks up your real queued videos live.

You can only see and remove your own entries; they’re matched against your BananoCraft wallet address.

## Rewards

JungleTV pays out BAN just for watching — its watch-to-earn system, tracked against the same wallet you sign in with. Check what you’ve built up:

    /jungletv rewards

This shows your accrued balance and a clickable **[Click to withdraw]** link, or tells you a withdrawal is already pending and where you sit in the withdrawal queue. You can also withdraw directly:

    /jungletv withdraw

Withdrawn rewards land in your BananoCraft wallet.

`/jungletv rewards` also warns you about the two things that commonly stop rewards accruing properly:

  - **Ineligible representative** — your Banano account’s representative isn’t on JungleTV’s reward-eligible list.
  - **Flagged connection reputation** — JungleTV has flagged the connection your session is coming from, which can reduce what you earn.


## Skip & rain

JungleTV lets viewers collectively pay to skip whatever is playing, and to top up a “rain” pool that gets tipped out to viewers. Check both at once:

    /jungletv skip

This is public — no wallet needed — and shows whether the current video can be skipped at all, how much is in the skip fund against the threshold needed, and the current rain pool balance.

To chip in (BananoCraft required):

    /jungletv skip 5
    /jungletv rain 2.5

Contributions are plain Banano payments to whichever address JungleTV currently reports for each fund, so no JungleTV sign-in is involved — same as paying for a queued video. Note that not every video is skippable; some are marked unskippable, and skipping is blocked right at the start and end of a video.

## Leaderboards

See who’s been spending and earning the most on JungleTV:

    /jungletv leaderboard
    /jungletv leaderboard day
    /jungletv leaderboard week
    /jungletv leaderboard month

With no argument it shows the last 24 hours. This is public information — no wallet or sign-in required. The top five entries of each board are shown.

## Player commands

The base command is `/jungletv` (alias `/jtv`). Running it with no arguments prints the command list in-game.

### Available to everyone

Command| What it does
---|---
`/jtv status`| Connection status, what’s playing, viewer count, who requested it, and screen count.
`/jtv list`| Lists every screen with its size, mode, and coordinates.
`/jtv info <name>`| Full details of one screen, including the video currently feeding it.
`/jtv link`| Posts a clickable jungletv.live link so you can get the audio.
`/jtv leaderboard [day|week|month]`| Shows JungleTV’s leaderboards. Defaults to the last 24 hours.
`/jtv skip`| Shows the skip fund balance and threshold, and the rain pool balance.
`/jtv chat !listen`| Starts showing JungleTV chat in your Minecraft chat, prefixed `[JTV]`.
`/jtv chat !silence`| Stops showing JungleTV chat.

### Requires a BananoCraft wallet

Command| What it does
---|---
`/jtv chat <message>`| Sends a message to JungleTV chat. Signs you in automatically the first time.
`/jtv queue <url-or-id>`| Requests a video and shows three clickable price options.
`/jtv queue <url-or-id> <start> <end>`| Queues just a segment (15 seconds to 35 minutes), e.g. `1:30 5:00`.
`/jtv queue <url-or-id> full`| Queues a long video as an ordered chain of 35-minute segments, one payment at a time.
`/jtv unqueue`| Lists your own still-unplayed queued videos, each with a clickable remove link.
`/jtv unqueue <entryId>`| Removes one of your queue entries. This is what the clickable links run.
`/jtv rewards`| Shows your accrued watch-to-earn balance, withdrawal status, and any problems affecting it.
`/jtv withdraw`| Withdraws your accrued rewards to your BananoCraft wallet.
`/jtv skip <amount>`| Contributes BAN toward crowdfunding a skip of the current video.
`/jtv rain <amount>`| Contributes BAN to JungleTV’s viewer tip (“rain”) pool.

If BananoCraft isn’t installed on the server, these commands simply tell you the feature isn’t available — everything else keeps working normally.

## Troubleshooting

Symptom| What’s going on
---|---
Screen is blank or stuck| You may be out of render range — walk closer. If it persists, run `/jungletv status` to check the server is still connected to JungleTV.
No sound| Expected — maps are video-only. Use `/jungletv link` and open JungleTV in your browser.
“That doesn’t look like a YouTube video URL or ID”| Use a full YouTube link (watch, shorts, embed, or youtu.be) or the bare 11-character video ID.
Price options don’t do anything| The offer expired. Run `/jungletv queue` again for fresh prices.
“Segment must be at least 15 seconds” / “can’t be longer than 35 minutes”| JungleTV’s own limits on a single queued item. Use `full` for anything longer.
Rewards aren’t growing| Run `/jungletv rewards` — it flags an ineligible representative or a flagged connection reputation.
Chat feed stopped after relogging| It shouldn’t — `!listen` survives a relog. If it’s genuinely off, run `/jungletv chat !listen` again.

Your server administrators also have separate admin-only commands (creating, removing, resizing and re-moding screens, and reloading configuration); those aren’t listed here as they aren’t part of regular play.
