---
title: "Understanding Solana DeFi Obfuscation Techniques"
description: "An overview of common methods used to obscure fund flows on the Solana network, from LP position cycling to rapid wallet cycling and cross-chain bridges."
date: "2025-01-15"
category: "Analysis"
layout: "../../layouts/BlogLayout.astro"
---

This report provides an overview of obfuscation techniques commonly encountered in Solana-based fraud investigations, with guidance on forensic approaches to each.

## LP Position Cycling

Liquidity pool positions on protocols like Orca Whirlpool are frequently used to temporarily obscure fund flows. Funds are deposited as LP, allowed to sit for a period to create the appearance of legitimate yield farming activity, then withdrawn to a new wallet.

Key forensic indicators include short LP holding periods inconsistent with yield farming intent, LP positions opened immediately after receipt of suspicious funds, and withdrawal to wallets with no prior on-chain history.

## Rapid Wallet Cycling

Suspects frequently move funds through chains of freshly-created wallets in rapid succession. Each hop reduces the apparent link between source and destination.

Forensic countermeasures include timing analysis (wallets created immediately before first receipt), dust analysis (wallets receiving only what they forward), and network graph clustering to identify common controllers.

## DEX-Based Layering

Swapping between tokens via DEXes like Jupiter creates additional layers of apparent complexity. Funds enter as SOL, are swapped to USDC, then to another token, then back — creating multiple transaction hops that obscure the original source.

Token swap forensics require reconstructing the economic value at each swap point to confirm continuity of funds.

## Cross-Chain Bridges

Moving funds via bridges like Wormhole or Allbridge creates a perceived break in the chain. Many investigators stop at the bridge transaction, treating it as a dead end.

Effective cross-chain tracing requires maintaining the economic value thread across the bridge and continuing the trace on the destination chain.
