+++
title = "BananoChests Player Guide"
date = "2026-07-23T22:22:35.793327-04:00"
author = "AllHailBanano"
authorTwitter = "" #do not include @
cover = ""
description = "How to lock, share, and trust your storage"
showFullContent = true
readingTime = false
+++

BananoChests lets you lock down your storage so nobody else can steal from it — no keys, no extra items, just a command or a sneak-right-click. This guide covers everything you can do as a player: locking and unlocking, sharing and trust, lock modes, and the full command list.

**Contents**

  - [What you can protect](<#what-you-can-protect>)
  - [Locking and unlocking](<#locking>)
  - [Lock states](<#states>)
  - [Lock modes](<#modes>)
  - [Armour stands](<#armour-stands>)
  - [Sharing](<#sharing>)
  - [Trust](<#trust>)
  - [Default preferences](<#defaults>)
  - [Advancements](<#advancements>)
  - [Player commands](<#commands>)


## What you can protect

BananoChests covers a wide range of storage blocks and entities:

  - **Item storage** — Barrels, Chests, Copper Chests, Shulker Boxes, Ender Chests
  - **Workstations** — Blast Furnaces, Brewing Stands, Furnaces, Lecterns, Smokers
  - **Entities** — Armour Stands
  - **Decorative/entertainment** — Chiseled Bookshelves, Copper Golem Statues, Decorated Pots, Hanging Signs, Jukeboxes, Shelves, Signs
  - **Automation** — Hoppers, Crafters
  - **Miscellaneous** — Beacon, Conduit, Creature Spawner


## Locking and unlocking

The simplest way to lock or unlock any supported block is to **sneak and right-click it with an empty hand**. This toggles its lock state instantly — the first player to do this becomes the **owner**.

You can also do this from a distance with a command, by looking at the block:

    /securechest lock
    /securechest unlock

A locked block can only be unlocked by its owner (or an admin). There’s a maximum range of 16 blocks for all commands that target a block you’re looking at.

## Lock states

State| Who can deposit/withdraw| Who can break it
---|---|---
Unlocked| Anyone| Anyone
Locked| Depends on the Lock Mode (see below)| Only the owner

## Lock modes

Once locked, a storage block also has a **Lock Mode** , which controls exactly how much access other players get. Set it with:

    /securechest setlockmode [accessible|viewable|sealed]

Mode| Viewing| Withdrawing| Depositing
---|---|---|---
Accessible| Anyone| Anyone| Anyone
Viewable| Anyone| Only the owner or players it’s shared with| Anyone
Sealed| Only the owner or players it’s shared with| Only the owner or players it’s shared with| Anyone can deposit via an unlocked hopper, if the game normally allows that for the storage type

In every mode, only the **owner** can break the block, change its lock mode, or manage its sharing settings.

## Armour stands

Armour stands follow the same ownership and lock rules as storage blocks, with one difference in how locking affects equipment:

  - **Unlocked** — anyone can equip or remove items on the stand, and anyone can break it.
  - **Locked (any mode)** — other players can still place items onto the stand, but cannot remove or swap its equipment, and cannot break it. The owner always retains full access.


## Sharing

Sharing grants access to a **specific** locked block, without affecting anything else you own.

  - Shared players get full view/deposit/withdraw access to that block, but cannot break it, lock or unlock it, or change its sharing list — only the owner can do those things.
  - You can share with named players, or with `@all` to make the block available to everyone on the server (handy for public storage). `@all` is tracked separately from the named-player list.
  - Sharing is saved with the block and survives server restarts.
  - A server-configured limit caps how many named players you can share one block with (`@all` doesn’t count against this limit).



    /securechest share target Alice Bob
    /securechest share target @all
    /securechest unshare target Alice
    /securechest unshare target @all

You can also share (or unshare) every block you own within a radius around you, instead of one at a time:

    /securechest share inrange 10 Alice Bob
    /securechest unshare inrange 20 @all

## Trust

Trust is a step up from sharing individual blocks: it’s a **personal** list of players who automatically get access to **all** of your locked storage — past and future — without you having to share each block one by one.

  - Trusted players get the same access as explicitly shared players (view/deposit/withdraw).
  - Trusted players **cannot** break your storage, lock/unlock it, or share it with others.
  - Your trust list is saved with your player data and survives server restarts.



    /securechest trust Alice
    /securechest trust Alice Bob Charlie
    /securechest trust status
    /securechest untrust Alice
    /securechest untrust @all

## Default preferences

You can set personal defaults so you don’t have to lock and configure every block by hand.

**Auto-lock** — automatically lock a storage type the moment you place it:

    /securechest setdefaultautolock [storage type] [autolock|none|status]

Use `@all` as the storage type to apply the setting to every storage type at once.

**Default lock mode** — the lock mode a storage type gets when you lock it:

    /securechest setdefaultlockmode [storage type] [accessible|viewable|sealed|remove]

Use `remove` to go back to the server’s default lock mode for that type, or `@all` as the storage type to set it for everything at once.

## Advancements

BananoChests adds its own advancement tree (its own tab in the in-game Advancements screen) that rewards you for exploring its features:

Advancement| How to earn it
---|---
Under Lock and Key| Lock your first storage item.
Sealed Tight| Lock a storage item using Sealed mode.
Open Book| Lock a storage item using Viewable mode.
Triple Threat| Lock a storage item using all three lock modes.
Shared Responsibility| Share a storage item with another player.
Community Chest| Share a storage item with everyone (`@all`).
Trusted Circle| Add a player to your trust list.
Hands-Free Security| Enable auto-lock for a storage type.
Safety Net| Have a locked storage item survive an explosion.
Failed Robbery| Have a hopper fail to steal items from your sealed locked storage.
Smooth Criminal| Have locked storage survive a charged creeper explosion.
Sealed Delivery| Have another player’s hopper deposit items into your sealed locked storage.
Pot Luck| Take items from a locked accessible decorated pot.
Change of Heart| Change the lock mode on an already-locked storage item.
Window Shopping| Open another player’s Viewable locked storage.
Open Door Policy| Take items from another player’s Accessible locked storage.
Open Borders| Have a non-owner open your `@all` shared locked storage.
Not In My House| Have locked storage block a regular creeper explosion.
TNT Proof| Have locked storage survive a TNT explosion.
Automation Engineer| Lock a hopper.
Tower of Power| Lock a beacon.
The Librarian| Lock a lectern.
Inviolable| Have locked storage survive three explosions in total.
Inner Circle| Add five players to your trust list.
Master Locksmith| Lock every type of storage and lock at least 10 items.
The Locksmith| Lock 10 storage items.
Vault Master| Lock 100 storage items.
All Locked Up| Lock every type of lockable storage at least once.
Blanket Coverage| Enable auto-lock for every storage type.

## Player commands

All player commands live under `/securechest` (aliases: `/sc`, `/storage`).

Command| What it does
---|---
`/sc lock [player]`| Locks the storage block you’re looking at. Optionally give another player’s name to lock it in their name instead of your own.
`/sc unlock`| Unlocks the storage block you’re looking at (owner only).
`/sc status`| Shows the owner, lock state, and lock mode of the storage block you’re looking at — and, if you’re the owner, who it’s shared with.
`/sc setlockmode [accessible|viewable|sealed]`| Sets the lock mode of the storage block you’re looking at.
`/sc share target [byname <type>] <@all|player...>`| Shares the storage block you’re looking at with named players, or with everyone.
`/sc share inrange <radius> [byname <type>] <@all|player...>`| Shares every storage block you own within `<radius>` blocks of you.
`/sc unshare target [byname <type>] <@all|player...>`| Revokes sharing from the block you’re looking at.
`/sc unshare inrange <radius> [byname <type>] <@all|player...>`| Revokes sharing from every storage block you own within `<radius>` blocks of you.
`/sc trust <player...>`| Adds one or more players to your trust list.
`/sc trust status`| Lists everyone currently on your trust list.
`/sc untrust <@all|player...>`| Removes players from your trust list, or clears it with `@all`.
`/sc setdefaultautolock [storage type] [autolock|none|status]`| Sets whether a storage type locks itself automatically when you place it.
`/sc setdefaultlockmode [storage type] [accessible|viewable|sealed|remove]`| Sets your personal default lock mode for a storage type.

> The optional `byname <type>` modifier on the share/unshare commands (e.g. `byname chest`) rejects the command if the block you’re looking at isn’t the specified type — handy for avoiding mistakes.

Your server administrators also have separate admin-only commands (reloading configuration, force-unlocking a block, clearing advancement progress); those aren’t listed here as they aren’t part of regular play.
