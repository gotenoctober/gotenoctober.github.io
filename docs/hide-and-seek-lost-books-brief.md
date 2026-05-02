# Hide & Seek: Lost Books — Game Reference

## Product Overview

- App name: Hide & Seek: Lost Books
- Bundle ID: `com.tenoctober.hideandseeklostbooks`
- Platform: iOS and Android (Expo / React Native)
- Orientation: portrait
- Genre: logic puzzle
- Version at time of writing: 1.1.1

Hide & Seek: Lost Books is a mobile logic puzzle where players locate hidden books on an N×N grid divided into colored regions. The game uses a paper-cutout library theme with procedurally generated levels, a bookmark currency, and a literary quote collection.

## Rules

Each level presents an N×N grid partitioned into N connected color regions. The player must find all hidden books. A valid solution satisfies four constraints:

1. Exactly one book in each row.
2. Exactly one book in each column.
3. Exactly one book in each color region.
4. No two books in adjacent cells, including diagonals (8-neighbor constraint).

A level is won when every solution cell is marked with a book. The player does not need to mark every empty cell.

### Hearts

Players start each level with 3 hearts. Placing a book on a wrong cell costs 1 heart. Reaching 0 hearts loses the level. The maximum hearts per level is 5 (achievable through the extra heart powerup).

### Error Feedback

Wrong placements trigger an 800ms error overlay on the cell, then the mark clears. The game tracks five error types internally: illegal row, illegal column, illegal region, illegal adjacency, and wrong cell.

## Controls

Three gesture types:

- **Tap** — marks a cell as excluded (empty shelf). Max duration 220ms.
- **Double-tap** — places or removes a book. Two taps within 150ms. The placement is validated before the mark is set.
- **Drag** — marks multiple cells as excluded by swiping across them. Minimum 8px movement to activate.

The in-game copy describes these as: "Tap a cell to mark it as empty. Swipe across several to mark a whole row at once." and "Found where a book belongs? Double-tap to place it."

## Progression

### Tiers and Board Sizes

Difficulty is controlled by a floating-point tier value ranging from 1.0 to 50.0. Board size scales with tier:

| Tier Range | Board Size |
|------------|------------|
| 1–8        | 4×4        |
| 9–17       | 5×5        |
| 18–35      | 6×6        |
| 36–50      | 7×7        |

Difficulty labels:

| Label        | Tier Range |
|--------------|------------|
| Beginner     | 1–5        |
| Intermediate | 6–15       |
| Advanced     | 16–30      |
| Expert       | 31+        |

### Difficulty Adaptation

Winning raises the tier. The gain is 0.3 base, plus 0.05 per remaining heart, plus 0.03 per level in the current win streak (capped at 5 levels). Maximum single-win gain is 0.55.

Losing lowers the tier. The penalty is 0.3 base, plus 0.3 per consecutive loss (capped at 3 losses contributing). Maximum single-loss penalty is 1.2.

### Level Generation

Levels are generated deterministically from a (tier, seed) pair. The pipeline:

1. Derive board size from tier.
2. Generate connected color regions.
3. Place books via backtracking.
4. Verify exactly one unique solution (exact solver).
5. Verify solvable by logic (logic solver).
6. Score difficulty based on inference count and board size.

Up to 256 attempts are made per board size. If generation fails at the preferred size, it falls back to a smaller board.

Note: the logic solver includes a fallback to the exact solver, so not every accepted level is guaranteed to be solvable purely by single-cell deduction.

## Rewards

### Bookmarks

The in-game currency. Players earn 1 bookmark per completed level. An additional 1 bookmark is earned when a win extends the daily streak (requires a prior daily win to exist).

### Daily Streaks

Tracked by calendar day. A win on a new day extends the streak by 1. If the player misses one or more days:

- If enough streak freeze powerups are in inventory to cover the gap, they are consumed and the streak continues.
- Otherwise, the streak resets to 1.

Winning on the same calendar day as a previous win does not change the daily streak.

### Literary Quote Collection

Each win awards one quote from the catalog. Quotes are selected randomly from those not yet collected, cycling through the full catalog before repeating.

- Catalog size: 415 quotes
- Authors represented: 70, including Marcus Aurelius, Ralph Waldo Emerson, Henry David Thoreau, Jane Austen, William Shakespeare, Mark Twain, Oscar Wilde, Emily Dickinson, Leo Tolstoy, Fyodor Dostoevsky, Homer, Plato, Lao Tzu, Rumi, Mahatma Gandhi, Helen Keller, and others
- Each quote includes the text, author name, and source work (when applicable)

### Win Streak

A separate counter from daily streak. Tracks consecutive wins without a loss. Resets to 0 on any loss. Contributes to tier gain calculation.

## Powerups

Purchased with bookmarks from in-game inventory:

| Powerup        | Cost        | Effect                                              |
|----------------|-------------|-----------------------------------------------------|
| Hint           | 2 bookmarks | Shows a deduction the player can make               |
| Extra Heart    | 5 bookmarks | Adds 1 heart for the current level (max 5 total)    |
| Streak Freeze  | 6 bookmarks | Protects the daily streak for one missed day         |
| Reveal a Book  | 8 bookmarks | Reveals one hidden book on the board                 |

Hint and Reveal a Book are usable during gameplay. Extra Heart is usable during gameplay. Streak Freeze is consumed automatically when a gap is detected.

## Monetization

### Ads

Interstitial ads (Google AdMob) shown after level completions. Conditions:

- Never shown during a puzzle.
- 5-level grace period at the start (lifetime completions).
- After the grace period, eligible every 3rd level completion.
- 3-minute cooldown between ads.
- Ad session data resets after 24 hours of inactivity.

### Subscription

A single monthly subscription product (`lost_books_ad_free_monthly`) removes interstitial ads. The store screen presents it as "Remove Ads" with the tagline "Your library, uninterrupted." Supports free trial offers on both iOS and Android, restore purchases, and redeem codes. Subscription status is checked every 60 minutes when the app is foregrounded.

## Visual Style

### Colors and Materials

- Background canvas: warm beige (#efe4d2)
- Text: dark brown (#2f261d) primary, medium brown (#54463a) secondary
- UI panels: cream (#f6ecde), light tan (#ecdfcc), tan (#d7c6ad)
- Board frame: dark brown (#8e7f67)
- Accent: blue (#3264a5)
- Success: green (#2f7c4a)
- Danger: red (#9c2f2f)

Paper textures and cutout shadow effects are procedurally generated via build scripts. All art assets are original.

### Region Colors

Default palette uses 8 soft pastels: blush red, peach, yellow, sage green, sky blue, lavender, rose, light green.

Book pieces have distinct body, spine, and page colors using warm tones (terracotta, amber, mustard, forest green, navy, deep purple, magenta, sage).

### Typography

- Display: Fraunces SemiBold (serif), 40px
- Body: Nunito Sans Regular / SemiBold (sans-serif), 16px
- Captions: 13px

### Animation

Three timing tiers: quick (120ms), standard (220ms), relaxed (320ms). Win results use a sequenced animation: bookmark counter pulse, then conditional daily streak badge with spring animation.

### Audio

5 sound effects (tick, success, error, win, lose) and 4 background music tracks with shuffled playback. Music plays at 42% volume with 500ms fade transitions. Sound, music, and haptics are independently toggleable.

## Accessibility

### Colorblind Mode

A settings toggle switches to a high-contrast palette: gold, blue, red, green, purple, teal, dark red, dark blue. Additionally, 8 distinct pattern overlays (diagonal stripes in two directions, horizontal stripes, vertical stripes, chevron, crosshatch, dot grid, orthogonal grid) are applied to regions so they remain distinguishable without relying on color alone.

### Independent Audio Controls

Sound effects, music, and haptic feedback each have separate on/off toggles in settings.

### Interaction Accessibility

Settings toggle rows include `accessibilityLabel`, `accessibilityRole`, and `accessibilityState` attributes.

## Screens

### Home

Displays current level number, total wins, win streak, and daily streak in a 4-stat row. Shows bookmark count. Buttons: Play (or Continue), How to Play, Collection, Settings. A hero illustration fills the bottom of the screen.

### Game

The puzzle board rendered with Skia canvas. Shows hearts remaining, hidden book count, powerup bar, and a rules reference. A store modal can be opened for powerup purchases. After an ad is shown, a "Remove Ads" prompt appears.

### Results

**Win**: shows "Level N Complete", the awarded quote (if any) in an italic panel with author attribution, an animated bookmark counter increment, and a daily streak badge when applicable. Buttons: Home, Next Level.

**Loss**: shows "Level N", the message "You ran out of hearts this round" and "No worries — give it another go!" Buttons: Home, Try Again.

### Collection

Title "My Collection" with "{X} of {Y} quotes collected" subtitle. Quotes displayed in reverse chronological order in paper panels, each showing the quote text (Fraunces font) and author attribution. Empty state: "Win puzzles to discover literary quotes."

### Settings

Toggle rows for sound effects, music, haptics, and colorblind mode. Reset progress button with destructive confirmation. Subscription status display or "Remove Ads" link.

### Store

Subscription purchase screen. Shows product details, trial badge when eligible, subscribe/restore/redeem buttons. If already subscribed, shows active status with a manage subscription link.

### Onboarding

8-slide tutorial flow:

1. Welcome — "Welcome to the Library" with premise introduction.
2. Row rule — illustrated on a 4×4 grid.
3. Column rule — illustrated on a 4×4 grid.
4. No-adjacency rule — illustrated showing 8 blocked neighbors.
5. Region rule — illustrated with 4 colored regions.
6. Controls — how to tap, double-tap, and drag.
7. Bookmarks — explains earning and spending.
8. Call to action — "Ready to Search?"
