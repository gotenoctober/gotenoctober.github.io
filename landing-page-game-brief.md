# Hide & Seek: Lost Books Landing Page Game Brief

Prepared for marketing content planning. This brief describes the current game as implemented in the app so landing page copy can stay accurate.

## Product Snapshot

- Working repository name: Hide and Seek Mobile
- Public app name: Hide & Seek: Lost Books
- Store slug: `hide-and-seek-lost-books`
- Category: mobile logic puzzle
- Format: portrait mobile app for iOS and Android
- Style: cozy paper-cutout library puzzle with tactile board interactions
- Intended product promise: find every missing book through deduction, not random guessing

One-sentence description:

> Hide & Seek: Lost Books is a calm mobile logic puzzle where players search a paper-cutout library grid for hidden books, using row, column, color-region, and no-touch rules to solve each board.

Short marketing description:

> A cozy logic puzzle for people who like Sudoku-style deduction, quiet daily play, and collection goals. Every board asks players to find the lost books hidden on colorful shelves through careful deduction.

## Game Premise

The game frames an abstract deduction puzzle as a search through a library. Books have gone missing among shelves, and the player restores order by locating exactly where each book belongs.

The theme shows up throughout the product:

- Hidden pieces are books.
- The grid is drawn as a shelf-like board.
- Currency is bookmarks.
- Rewards include a literary quote collection.
- Store and subscription copy refers to "the library" and "the stacks."
- Visuals use paper textures, shelf framing, pastel regions, cutout shadows, and book-colored marks.

## How The Game Works

Each level is an `N x N` grid split into `N` connected color regions. The player must find all hidden books. A solved board has:

- Exactly one book in each row.
- Exactly one book in each column.
- Exactly one book in each color region.
- No two books touching, including diagonals.

Player actions:

- Tap a cell to mark an empty shelf with an X.
- Drag across cells to mark several shelves as empty.
- Double-tap a cell to place or remove a book.
- A wrong book placement costs one heart.
- A level is won when every true book cell is marked.
- The player does not need to mark every empty cell to win.

Current note: older architecture notes mention long-press for placing a book, but the current gesture implementation and onboarding copy use double-tap.

## Core Loop

1. Look at the board and rules.
2. Eliminate impossible cells.
3. Place a book only when certain.
4. Get immediate visual, audio, and haptic feedback.
5. Solve the board, earn rewards, and move to the next level.

The 30-second experience is meant to be: observe, deduce, mark, confirm, and feel a small satisfying reward.

## Progression And Rewards

Levels are procedurally generated from tier and seed. Accepted levels are checked for:

- Deterministic generation.
- One unique solution.
- A solver pass before the level is accepted.
- Increasing difficulty through tier progression.

Marketing caveat: the product spec positions levels as logic-only and no-guessing. The current `solveByLogic` implementation can fall back to an exact solver, so engineering/product should confirm before "no guessing required" becomes a headline claim.

Current board sizes:

- Tiers 1-8: 4x4
- Tiers 9-17: 5x5
- Tiers 18-35: 6x6
- Tiers 36+: 7x7

Difficulty adapts over time. Winning raises the player's tier, with a small bonus for remaining hearts and win streak. Losing lowers tier, with larger penalties after repeated losses. Early tiers also reveal some starter books so the first sessions are approachable.

Win rewards:

- 1 bookmark for each completed level.
- 1 additional bookmark when a daily streak advances after a prior daily win.
- 1 literary quote awarded on each win when available.
- Level, total wins, win streak, daily streak, bookmarks, and quote collection are persisted.

Quote collection:

- Current quote catalog has 415 entries.
- Authors include Marcus Aurelius, Ralph Waldo Emerson, Henry David Thoreau, Louisa May Alcott, Walt Whitman, William Shakespeare, Mark Twain, Epictetus, Seneca, Charles Dickens, Jane Austen, Leo Tolstoy, Oscar Wilde, Emily Dickinson, Homer, Plato, Fyodor Dostoevsky, Charlotte Bronte, Lewis Carroll, and Kahlil Gibran.
- The collection screen shows collected quotes and total catalog progress.

Bookmark powerups:

- Hint: 2 bookmarks. Shows a deduction the player can make.
- Extra Heart: 5 bookmarks. Adds one temporary heart for the current level, capped at 5 hearts.
- Reveal a Book: 8 bookmarks. Reveals one hidden book on the board.
- Streak Freeze: 6 bookmarks. Protects the daily streak for one missed day.

## Monetization And Ads

The current app has interstitial ads and an ad-free subscription.

Current ad behavior:

- Ads are never shown mid-puzzle.
- Ads are considered only after a level completion.
- There is a 5-level grace period.
- After the grace period, ads can show every 3rd level completion.
- There is a 3-minute cooldown.
- Ad-free subscribers skip interstitial ads.

Subscription positioning already present in the app:

- Main product surface: "Remove Ads"
- Store copy theme: "Your library, uninterrupted."
- Purchase flow supports trial labels, restore purchases, and redeem code.

Marketing should avoid making aggressive monetization claims. A landing page can safely say the game includes an optional ad-free subscription, but should not imply the whole game is ad-free unless referring specifically to subscribers.

## What Makes It Different

Logic-first puzzle integrity:

- Every accepted board is unique-solution.
- Boards pass a solver gate before acceptance.
- Powerups help without changing the underlying puzzle rules.

Cozy library theme:

- The game avoids the sterile look of many grid puzzles.
- Books, shelves, bookmarks, and quotes create a clear identity.

Tactile paper-craft presentation:

- Paper textures, pastel regions, cutout shadows, shelf framing, and small confetti effects make the board feel physical.

Short-session mobile design:

- Portrait layout.
- Fast tap and drag marking.
- Immediate feedback.
- Progress persists across sessions.

Collection and habit loops:

- Literary quotes reward wins.
- Bookmarks give players a reason to keep solving.
- Daily streaks support repeat play.

Accessibility and comfort:

- Colorblind mode switches to higher-contrast colors and pattern overlays.
- Sound, music, and haptics can be toggled independently.
- Rules are available in onboarding and during gameplay.

## Visual And Brand Direction

The game should be described as warm, tactile, calm, bookish, and clever. It should not feel frantic, competitive, neon, casino-like, or overly childish.

Visual ingredients:

- Warm paper background tones.
- Pastel color regions.
- Dark, readable book pieces.
- White X marks for empty shelves.
- Red X feedback for errors.
- Shelf-style board frame.
- Fraunces display type and Nunito Sans body type.
- Paper panel and chip UI.
- Gentle success bounce and paper-fleck confetti.

Marketing visuals should prioritize:

- A clear board screenshot with books, X marks, hearts, and powerups visible.
- A rules/how-it-works panel showing one book per row, column, region, and no touching.
- The quote reward screen after a win.
- The collection screen showing quote progress.
- A colorblind-mode comparison if accessibility is a landing page section.
- The home screen hero image if the landing page needs atmosphere.

## Audience

Primary audience:

- Mobile puzzle players who enjoy Sudoku, Star Battle, Minesweeper-style deduction, nonograms, and other logic puzzles.
- Players who want something calmer than timed or competitive puzzle games.
- Readers and bookish audiences who respond to a library theme and quote collection.

Secondary audience:

- Casual daily players who like streaks and short sessions.
- Completionists who enjoy collecting quotes and watching progress grow.
- Accessibility-conscious players who value colorblind-friendly puzzle visuals.

## Messaging Pillars

Use these as landing page content angles:

1. Fair deduction
   - Lead with trust. The puzzle is fair because accepted levels are generated, solved, and checked before play.

2. A cozy library puzzle
   - The board is not just a grid; it is a shelf of missing books.

3. Built for small moments
   - Quick levels, immediate feedback, progress that resumes.

4. Rewards with character
   - Bookmarks, daily streaks, and a growing literary quote collection make progress feel personal.

5. Calm but challenging
   - The tone is gentle, but the logic can grow from beginner to expert.

## Landing Page Structure Recommendation

Hero:

- Product name: Hide & Seek: Lost Books
- Plain offer: A cozy logic puzzle about finding missing books.
- Supporting copy: Solve handcrafted-feeling, procedurally generated boards at a calm pace. No timers.
- Primary CTA: Download on the App Store / Get it on Google Play, depending on launch status.

How it works:

- One book per row.
- One book per column.
- One book per color region.
- Books cannot touch, even diagonally.

Feature band:

- Solver-checked puzzles
- Paper-cutout shelves
- Bookmark powerups
- Literary quote collection
- Daily streaks
- Colorblind mode

Progression section:

- Mention adaptive difficulty and short-session play.
- Mention quote collection and bookmarks as rewards.

Screenshot section:

- Board, win result, collection, onboarding/rules, store or powerup surface.

FAQ ideas:

- "Do I need to guess?" Answer: The game is designed around deduction and accepted levels pass a solver gate. Confirm the final "no guessing required" wording with engineering/product before publishing.
- "What happens if I make a mistake?" Answer: Wrong book placements cost a heart; marking empty shelves does not.
- "Can I play casually?" Answer: Yes. Levels are short, progress persists, and settings let players tune sound, music, haptics, and colorblind visuals.
- "Are there ads?" Answer: The game includes interstitial ads after level completions, with an optional ad-free subscription.

## Source-Backed Claims Marketing Can Use

These are supported by the current implementation:

- "A cozy mobile logic puzzle."
- "Find missing books using deduction."
- "Every accepted level has a unique solution."
- "Levels pass a solver gate before they are accepted."
- "Tap or drag to mark empty shelves."
- "Double-tap to place a book."
- "Wrong guesses cost hearts."
- "Earn bookmarks by completing levels."
- "Spend bookmarks on hints, reveals, extra hearts, and streak freezes."
- "Collect literary quotes as you win."
- "Includes 415 collectible quotes."
- "Daily streaks reward consistent play."
- "Colorblind mode adds high-contrast colors and patterns."
- "Sound, music, and haptics can be toggled."
- "Optional ad-free subscription."

## Claims To Avoid Or Confirm First

Avoid these unless product explicitly approves them:

- "Free forever."
- "Completely ad-free."
- "Unlimited levels" or "infinite levels." Procedural generation supports ongoing play, but the exact marketing claim should be approved.
- "No guessing required" or "logic-only puzzles." This is the product goal, but current solver code includes an exact-solver fallback; confirm final wording with engineering/product.
- "Offline play." Core levels are generated locally, but ads, IAP, analytics, and store behavior depend on services.
- "Handcrafted puzzles." The levels are procedurally generated, though the presentation is handcrafted-feeling.
- "No mistakes possible" or "mistake-proof." Mistakes are part of the heart system.
- "For kids" or "educational app." The game is accessible, but it is not implemented as a child-directed educational product.
- "Long-press to place books." Current in-app behavior is double-tap.
- "Real-money bookmark purchases." The current monetization is ad-free subscription, not bookmark sales.

## Useful Source Files

- Product summary and rules: `README.md`, `docs/spec.md`
- Current app name and package identifiers: `app.json`
- Onboarding and rules copy: `src/content/onboarding.ts`, `src/content/rules.ts`
- Level generation and solver gates: `src/levels/generateLevel.ts`, `src/levels/logicSolver.ts`, `test/levels.test.ts`
- Gesture behavior: `src/render/useBoardGestures.ts`
- Progression, bookmarks, daily streaks: `src/state/useProgressStore.ts`, `src/game/currency.ts`, `src/game/dailyStreak.ts`, `src/game/dda.ts`
- Quote catalog: `assets/quotes.json`, `src/content/quotes.ts`
- Visual style and assets: `src/ui/theme/tokens.ts`, `src/render/palette.ts`, `src/render/patterns.ts`, `src/ui/theme/assets.ts`, `assets/art/PROVENANCE.md`
- Player-facing screens: `app/index.tsx`, `app/game.tsx`, `app/results.tsx`, `app/collection.tsx`, `app/store.tsx`, `app/settings.tsx`
