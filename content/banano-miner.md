+++
title = "BananoMiner Player Guide"
date = "2026-07-23T22:22:35.793327-04:00"
author = "AllHailBanano"
authorTwitter = "" #do not include @
cover = ""
description = "How to earn, redeem, and quest with the BananoMiner plugin"
showFullContent = true
readingTime = false
+++

BananoMiner rewards you for playing the game normally. Mining, farming, fighting, exploring, trading, and all sorts of everyday actions have a chance to earn you in-game currency, physical item rewards, or redeemable vouchers — on top of whatever the vanilla game already gives you.

This guide covers everything from a **player’s** point of view: what you can do, what commands are available to you, and how rewards, vouchers, and quests work.

**Contents**

  - [Getting started](<#getting-started>)
  - [Activities that can earn rewards](<#activities>)
  - [Luck boosts](<#boosts>)
  - [Vouchers](<#vouchers>)
  - [Quests](<#quests>)
  - [Stats scoreboard](<#scoreboard>)
  - [Player commands](<#commands>)


## Getting started

There’s nothing special you need to do to take part — just play. Whenever you perform one of the activities listed below, there’s a chance you’ll be rewarded, and you’ll see a message when you win something. Currency rewards go straight into your server wallet; item rewards land in your inventory (or drop at your feet if your inventory is full).

## Activities that can earn rewards

A wide range of everyday actions can earn you a reward. Broadly, these fall into a few groups:

  - **Gathering** — mining blocks with a pickaxe, chopping logs with an axe, harvesting crops with a hoe, and fishing with a rod.
  - **Animal care** — breeding and taming animals.
  - **Combat** — defeating tough hostile mobs and bosses (the Wither, Ender Dragon, Elder Guardian, Evoker, Phantom, Warden, Breeze, Ravager), and successfully defending your village during a raid.
  - **Exploration and everyday actions** — a wide variety of things you’ll naturally do while playing, including surviving a nearby lightning strike, opening a Trial Chamber vault, bartering with Piglins, dealing with a Wandering Trader, curing a Zombie Villager, earning advancements, sleeping through the night, harvesting honey, boosting with an Elytra firework, launching with a Riptide trident, landing a strong Mace or trident hit, trading with Villagers, travelling through a portal, linking a Lodestone compass, and fully exploring a map.
  - **Enchanting** — enchanting your gear at an enchanting table.


Any of these can award you server currency, and some can also drop a physical item reward directly into your inventory or produce a voucher. Keep doing what you’d do anyway — the rewards are a bonus on top of normal gameplay.

## Luck boosts

A **luck boost** is a temporary effect that improves your chances of earning a reward from the activities above. Boosts:

  - Can be gifted to you by server staff.
  - Can occasionally be found just from playing.
  - Can be granted by redeeming a **boost voucher**.


A boost lasts for a limited time and then wears off naturally. There’s no action required to use one — once you have it active, it applies automatically to your eligible activities.

## Vouchers

A **voucher** is a physical, tradeable item that represents a reward waiting to be claimed. You’ll recognise one by its glowing enchant effect and special name/lore. There are two kinds:

  - **Currency vouchers** — worth an amount of server currency.
  - **Boost vouchers** — grant a temporary luck boost when redeemed.


**Redeeming a voucher:** simply right-click it while holding it. Currency vouchers pay their value straight into your wallet; boost vouchers apply their boost to you. Once redeemed, a voucher is spent and disappears.

**Where vouchers come from:**

  - As a rare find in certain loot chests around the world.
  - As a reward for completing a quest.
  - Issued directly to you by another player or by server staff.


**Giving vouchers to other players:** you can create your own currency voucher, funded from your own wallet, using the `/voucher` command. This is handy for handing someone a prize, a tip, or a minigame reward without trading currency directly.

**Combining vouchers:** if you’re holding two matching vouchers of the same kind, you can combine them with a diamond in any crafting grid to merge them into a single voucher, freeing up inventory space. Vouchers only combine if they genuinely match one another — mismatched vouchers simply won’t combine.

> Vouchers may appear with different visual styles (for example a “banana” or “coin” look) if your server uses the optional resource pack. This is purely cosmetic and doesn’t affect the voucher’s value.

## Quests

Quests are goals you’re automatically given for completing everyday activities, with a guaranteed reward once finished.

  - You’re given a set of **daily** quests and one or more **weekly** quests automatically — there’s nothing to sign up for.
  - Quests are drawn from a variety of categories (gathering, combat, exploration, and so on), so your daily set will normally cover different kinds of activities rather than three of the same thing.
  - View your active quests, their progress, and time remaining with `/quests`.
  - Progress updates automatically as you play — just do the activity the quest describes.
  - Daily quests reset at midnight (server time); weekly quests run Monday through Sunday. There’s no penalty for letting one expire — it just won’t count anymore.
  - Completing a quest pays out its reward automatically — currency, a luck boost, or items, delivered either directly or as a voucher you redeem. If an item reward doesn’t fit in your inventory when you complete a quest, use `/quests claim` to collect it later.


## Stats scoreboard

You can display an optional sidebar scoreboard showing your live BananoMiner stats (including your active quests) while you play. Toggle it with `/scoreboard` (see below).

## Player commands

Command| Aliases| What it does
---|---|---
`/quests` | `/quest`, `/q` | Shows your active quests, their progress, time remaining, and rewards. Add `claim` to collect any pending quest item reward that didn’t fit in your inventory.
`/voucher <amount> [claimableAfter] [banana|coin]` | `/bmvoucher` | Creates a currency voucher funded from your own wallet, so you can hand it to another player. Optionally set a style, or a delay before it can be redeemed.
`/scoreboard [show|hide|reset]` | `/scores`, `/scb`, `/stats`, `/togglestats` | Toggles the live stats sidebar on or off. `reset` clears your displayed stats.
`/boost <player> <length> <minutes|hours|days>` | — | Gift a temporary luck boost to another online player (you can’t boost yourself). Typically used by staff or as a friendly gesture where permitted on your server.

To redeem a voucher, you don’t need a command — just right-click it while holding it.

Your server may also have additional admin-only commands for configuring the plugin; those aren’t listed here as they aren’t relevant to regular play.
