

# "She Completes the Website" — Valentine's Day Experience

## Design Philosophy
A minimal, emotionally rich multi-page website where each page starts *incomplete* and only reveals itself through her gentle interaction. The site feels broken without her — and whole because of her.

---

## Visual Design System

- **Typography**: Elegant serif font (e.g., Playfair Display) for poetic lines, clean sans-serif (Inter) for body text
- **Color Palette**: Deep charcoal background (`#1a1a1a`), soft warm white text (`#f0ece2`), muted gold accent (`#c9a96e`) for revealed content
- **Spacing**: Generous whitespace — each page breathes, nothing feels rushed
- **Transitions**: Slow fades (1-2s), subtle opacity shifts, no bouncing or flashy effects

---

## Page-by-Page Flow

### 🔹 Landing Page
- Shows the title faintly, almost invisible: *"She Completes the Website"*
- A single line appears: *"This website is incomplete."*
- A soft, glowing cursor blinks beside a minimal text input: *"Type her name to begin"*
- On entering the correct name (or any name), the page warms up — text becomes fully visible, and a "Begin" link fades in
- **Feel**: The site literally cannot start without her

### 🔹 Memory Pages (1–6) — Each follows this pattern:
- Page loads with only the **poetic opening line**, faintly visible
- A unique micro-interaction is required to unlock the memory content
- Once unlocked, the content fades in line by line (slow staggered fade, ~0.5s per line)
- The **closing poetic line** appears last, in the gold accent color
- A "Continue" link appears only after all content has revealed — navigation is locked until completion

### Interaction Ideas Per Page:

| Page | Interaction to Unlock |
|------|----------------------|
| **1 — The Beginning** | Click-and-hold on the word "stay" in the poetic line for 2 seconds (staying = unlocking) |
| **2 — The R15 Ride** | Slowly drag/scroll a horizontal line across the page (like riding a road) |
| **3 — Keerthi Cafe** | Click a minimal cup icon — it "fills up" slowly, then content appears |
| **4 — Temple Days** | Press palms together gesture: click two side-by-side elements simultaneously, or simply click "pray" |
| **5 — The Room & Birthday** | A sticky note appears blank — type anything on it, and the page unlocks |
| **6 — Distance & Staying** | A simple toggle: *"Stay?"* — she clicks "Stay" and the content reveals |

### 🔹 Final Completion Page
- All previous pages fade in as small chapter markers at the top
- The line *"Some things don't work alone."* appears
- Then, slowly: *"Just like this website, my life never works without you."*
- Final lines fade in with warmth: *"Love you. Happy Valentine's Day."*
- The entire page subtly shifts to a slightly warmer tone — the site is now "complete"
- A soft ambient glow or gradient shift signals emotional closure

---

## Technical Approach
- **Routing**: React Router — each memory is its own route (`/memory/1`, `/memory/2`, etc.)
- **State**: Local state tracks which pages are "completed" — navigation locks/unlocks accordingly
- **Animations**: CSS transitions + simple React state-driven reveals (no heavy animation libraries)
- **No backend needed**: Entirely frontend, localStorage to remember progress
- **Responsive**: Works beautifully on mobile (she'll likely open it on her phone)

---

## Navigation Logic
- No visible nav menu — just forward progression
- "Continue" buttons appear only after page interaction is complete
- If she tries to jump ahead via URL, she's redirected to the furthest unlocked page
- Progress saved in localStorage so she can return later

