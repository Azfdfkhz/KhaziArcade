# PRD — KHAZ ARCADE PORTFOLIO

**Product:** KHAZ Arcade  
**Type:** Interactive 3D Personal Portfolio  
**Platform:** Web  
**Primary Stack:** Next.js + React + JavaScript/JSX + Tailwind CSS  
**3D:** Three.js + React Three Fiber + Drei  
**Animation:** Framer Motion  
**3D Asset:** Existing `.glb` arcade model

---

## 1. Product Overview

**KHAZ Arcade** adalah personal portfolio interaktif yang menggunakan sebuah **3D arcade machine sebagai interface utama**.

Alih-alih menggunakan struktur portfolio konvensional seperti:

> Navbar → Hero → About → Projects → Skills → Contact

website menggunakan konsep:

> **Arcade Machine → Start → Arcade Menu → Portfolio**

Pengunjung seolah-olah sedang memainkan sebuah arcade game, tetapi isi game tersebut adalah portfolio KHAZ.

### Tujuan

- Membuat portfolio memorable.
- Menunjukkan kemampuan frontend dan 3D web.
- Menggabungkan development, UI/UX, dan 3D.
- Tetap mudah digunakan meskipun konsepnya eksperimental.
- Memiliki identitas visual yang kuat dan konsisten.

---

## 2. Product Vision

> **“A portfolio that feels like discovering a game.”**

Website harus terasa seperti:

**modern portfolio + retro arcade + interactive 3D experience.**

Bukan sekadar website yang memiliki gambar arcade.

**Arcade adalah interface utama.**

---

## 3. Target User

### Primary

Orang yang ingin melihat:

- Portfolio developer
- Project
- Skill
- Experience
- Contact

### Secondary

Orang yang tertarik dengan:

- 3D
- Interactive website
- Creative development
- UI/UX
- Web technology

### User Context

Pengunjung bisa datang melalui:

- Laptop
- Desktop
- Tablet
- Smartphone

Website harus tetap usable tanpa perangkat arcade fisik.

---

## 4. Core User Journey

```text
OPEN WEBSITE
      ↓
LOADING
      ↓
3D ARCADE APPEARS
      ↓
WELCOME SCREEN
      ↓
PRESS START
      ↓
CAMERA ZOOM TO SCREEN
      ↓
ARCADE MENU
      ↓
SELECT CATEGORY
      ↓
┌─────────┬──────────┬────────┬────────────┬─────────┐
│ ABOUT   │ PROJECTS │ SKILLS │ EXPERIENCE │ CONTACT │
└─────────┴──────────┴────────┴────────────┴─────────┘
      ↓
EXPLORE CONTENT
      ↓
BACK
      ↓
ARCADE MENU
```

---

## 5. Main Feature — Interactive 3D Arcade

3D arcade machine merupakan **hero dan primary navigation interface**.

Asset sudah tersedia dari user dalam format:

```text
arcade.glb
```

Website tidak boleh membuat ulang atau mengganti model arcade.

### Requirements

Arcade harus:

- Bisa di-render di browser.
- Memiliki lighting yang baik.
- Memiliki screen.
- Memiliki joystick.
- Memiliki arcade buttons.
- Memiliki idle animation ringan.
- Responsive terhadap ukuran layar.

---

## 6. Arcade Interaction

### Joystick

Joystick digunakan sebagai navigasi.

| Input | Action |
|---|---|
| ↑ | Menu sebelumnya |
| ↓ | Menu berikutnya |
| ← | Project sebelumnya |
| → | Project berikutnya |
| Enter | Select |
| Escape | Back |

Jika memungkinkan:

```text
W → UP
S → DOWN
A → LEFT
D → RIGHT
```

Joystick 3D juga ikut bergerak ketika digunakan.

### Arcade Buttons

Minimal terdapat:

#### Select

Untuk memilih menu.

#### Action

Untuk menjalankan action seperti:

- Play Project
- Open GitHub
- Contact

#### Back

Untuk kembali ke menu sebelumnya.

Button memiliki animasi fisik:

```text
Idle
 ↓
Pressed
 ↓
Released
```

---

## 7. Landing Screen

Initial screen:

```text
WELCOME TO

MY PORTFOLIO


PRESS START
```

Tambahkan animasi blinking pada:

```text
PRESS START
```

Landing screen harus sederhana.

Tidak ada dashboard kompleks.

---

## 8. Main Menu

Setelah START:

```text
SELECT CATEGORY

▶ ABOUT ME
  PROJECTS
  SKILLS
  EXPERIENCE
  CONTACT
```

Footer:

```text
↑ ↓ MOVE
● SELECT
◀ BACK
```

Selected item memiliki visual state berbeda.

---

## 9. About Me

### Screen Name

```text
CHARACTER SELECT
```

Content:

```text
KHAZ

Creative Developer

[Short Biography]

FOCUS

Web Development
UI/UX
3D
Interactive Experience
```

Tidak boleh menggunakan informasi fiktif.

---

## 10. Projects

### Screen Name

```text
GAME LIBRARY
```

Projects ditampilkan seperti game collection.

Contoh:

```text
┌──────────────────────┐
│                      │
│      JEJAK SAKU      │
│                      │
│  PKL Management      │
│      Platform        │
│                      │
│ Flutter · Supabase   │
│                      │
└──────────────────────┘
```

Navigasi:

```text
← PROJECT →
```

Project aktif mendapatkan emphasis visual.

---

## 11. Project Detail

Ketika project dipilih:

```text
JEJAK SAKU

PKL Management Platform

DESCRIPTION

...

TECHNOLOGY

Flutter
Supabase
Google Drive

[ PLAY PROJECT ]

[ GITHUB ]

← BACK
```

Data project harus berasal dari:

```text
data/projects.js
```

bukan hardcoded di component.

---

## 12. Skills

### Screen Name

```text
POWER UPS
```

Technology ditampilkan sebagai collectible/power-up.

Contoh:

```text
┌─────────┐ ┌────────┐ ┌────────┐
│ NEXT.JS │ │ REACT  │ │FLUTTER │
└─────────┘ └────────┘ └────────┘

┌─────────┐ ┌────────┐ ┌─────────┐
│ BLENDER │ │ UNITY  │ │SUPABASE │
└─────────┘ └────────┘ └─────────┘
```

Tidak menggunakan skill percentage palsu.

---

## 13. Experience

### Screen Name

```text
HIGH SCORE
```

Gunakan timeline sederhana.

Contoh:

```text
2026
│
├── PKL / Web Development
│
2025
│
├── Personal Project
│
2024
│
└── Learning / Development
```

Hanya masukkan pengalaman nyata.

---

## 14. Contact

### Screen Name

```text
READY TO CONNECT?
```

Content:

```text
Let's build something interesting.

[ CONTACT ME ]

GitHub
Email
LinkedIn
Instagram
```

Simple dan clean.

---

## 15. Visual Design

### Design Direction

**Modern Retro Arcade**

### Keywords

- Minimal
- Pastel
- Modern
- Retro
- Playful
- Clean
- Premium
- Soft 3D
- Interactive

### Hindari

- Cyberpunk
- Neon berlebihan
- Glassmorphism berlebihan
- Dark dashboard
- Gradient berlebihan
- HUD rumit
- Excessive particles
- Terlalu banyak warna

---

## 16. Color System

| Color | Hex | Usage |
|---|---|---|
| Turquoise | `#63C8CC` | Primary |
| Deep Teal | `#237F85` | Screen / Dark UI |
| Cream | `#FFF3D6` | Arcade / surface |
| Warm White | `#F8F6EF` | Background |
| Peach | `#F29A8D` | Accent |
| Yellow | `#F4C96B` | CTA / highlight |
| Dark | `#263238` | Text |

---

## 17. Typography

Gunakan dua jenis typography.

### Arcade Font

Untuk:

- Screen title
- Menu
- Button label
- Game-style text

### Modern Sans

Untuk:

- Description
- Project detail
- Metadata
- Biography

Jangan menggunakan pixel font untuk seluruh website.

---

## 18. CRT Screen

Tambahkan efek CRT yang sangat subtle:

- Scanline
- Vignette
- Noise
- Screen glow
- Slight curvature

Prioritas:

**Readability > Effect**

Jangan sampai teks sulit dibaca.

---

## 19. 3D Lighting

Lighting harus menyerupai product showcase.

Gunakan:

```text
Key Light
+
Fill Light
+
Rim Light
+
Ambient Light
+
Screen Emission
```

Target visual:

**stylized 3D product photography**

bukan cyberpunk.

---

## 20. Animation

Gunakan Framer Motion untuk UI.

Gunakan Three.js / R3F untuk 3D.

### Animation utama

#### Startup

```text
Loading
↓
Arcade appears
↓
Screen turns on
```

#### Start

```text
Button press
↓
Screen transition
↓
Camera zoom
↓
Menu
```

#### Menu

```text
Selection change
↓
Highlight transition
```

#### Project

```text
Project change
↓
Slide / fade
```

Animation harus cepat dan smooth.

Target transition:

**200–500 ms** untuk UI.

Camera transition:

**800–1500 ms.**

---

## 21. Responsive Design

### Desktop

Fokus pada:

```text
Large 3D Arcade
+
Large Screen
```

### Tablet

```text
Smaller Arcade
+
Simplified Environment
```

### Mobile

```text
Simplified 3D
+
Large Arcade Screen UI
+
Touch Controls
```

Jangan memaksa seluruh scene desktop ke mobile.

---

## 22. Input Accessibility

Website harus tetap bisa digunakan tanpa 3D interaction.

Support:

### Mouse

- Click
- Hover

### Keyboard

```text
↑ ↓ ← →
Enter
Escape
```

### Touch

- Tap
- Swipe
- Touch buttons

### 3D Arcade

- Joystick
- Physical buttons

---

## 23. Technical Architecture

```text
Next.js
│
├── App Router
│
├── React / JSX
│
├── Tailwind CSS
│
├── React Three Fiber
│   └── Three.js
│
├── Drei
│
└── Framer Motion
```

### No TypeScript

Gunakan:

```text
.js
.jsx
```

Bukan:

```text
.ts
.tsx
```

---

## 24. Component Architecture

```text
app/
├── layout.jsx
├── page.jsx
└── globals.css

components/
│
├── arcade/
│   ├── ArcadeScene.jsx
│   ├── ArcadeModel.jsx
│   ├── ArcadeCamera.jsx
│   ├── ArcadeLights.jsx
│   └── ArcadeInteraction.jsx
│
├── screen/
│   ├── ArcadeScreen.jsx
│   ├── ArcadeMenu.jsx
│   ├── AboutScreen.jsx
│   ├── ProjectsScreen.jsx
│   ├── ProjectDetail.jsx
│   ├── SkillsScreen.jsx
│   ├── ExperienceScreen.jsx
│   └── ContactScreen.jsx
│
└── ui/
    ├── ArcadeButton.jsx
    ├── CRTOverlay.jsx
    ├── ControlsHint.jsx
    └── LoadingScreen.jsx

data/
├── projects.js
├── skills.js
└── experience.js

public/
├── models/
│   └── arcade.glb
│
├── images/
└── audio/
```

---

## 25. Data Structure

### `projects.js`

```js
export const projects = [
  {
    id: "jejak-saku",
    title: "Jejak Saku",
    description: "PKL Management Platform",
    year: "2026",
    technologies: [
      "Flutter",
      "Supabase"
    ],
    image: "/images/projects/jejak-saku.webp",
    demoUrl: "",
    githubUrl: ""
  }
];
```

Data harus terpisah dari UI.

---

## 26. Performance Requirements

Target:

> **Smooth 3D experience without sacrificing usability.**

Prioritas optimasi:

1. GLB optimization
2. Texture compression
3. Lazy loading
4. Dynamic import
5. Limited shadows
6. Limited post-processing
7. Efficient lighting
8. Reduced mobile 3D complexity

Gunakan dynamic loading untuk scene 3D bila diperlukan.

---

## 27. Loading State

Sebelum GLB selesai:

```text
KHAZ ARCADE

LOADING...

████████░░
```

Loading screen harus tetap menggunakan visual identity KHAZ Arcade.

Jangan menggunakan spinner default.

---

## 28. Audio

Optional.

Sound:

- Startup
- Button click
- Joystick
- Select
- Back
- Transition

Audio harus:

- subtle
- short
- non-annoying

Jangan autoplay suara keras.

Sediakan:

```text
SOUND ON / OFF
```

---

## 29. Content Rules

AI developer **tidak boleh mengarang data portfolio**.

Jangan membuat:

- Fake company
- Fake client
- Fake award
- Fake statistics
- Fake experience
- Fake testimonial
- Fake project

Jika data belum tersedia:

```text
TODO: INSERT REAL DATA
```

atau gunakan struktur data kosong.

---

## 30. MVP

### P0 — Must Have

- [ ] Next.js
- [ ] React JSX
- [ ] Tailwind
- [ ] GLB arcade
- [ ] 3D scene
- [ ] Camera
- [ ] Lighting
- [ ] Loading
- [ ] Press Start
- [ ] Arcade menu
- [ ] Keyboard navigation
- [ ] Mouse interaction
- [ ] About
- [ ] Projects
- [ ] Skills
- [ ] Experience
- [ ] Contact
- [ ] Responsive layout

### P1 — Important

- [ ] Physical joystick animation
- [ ] Physical button animation
- [ ] Camera transition
- [ ] CRT effect
- [ ] Project carousel
- [ ] Mobile touch control

### P2 — Enhancement

- [ ] Sound effects
- [ ] Advanced screen effects
- [ ] Easter eggs
- [ ] More advanced 3D animations

---

## 31. Success Criteria

### Visual

- Arcade menjadi centerpiece.
- UI terlihat modern dan tidak cluttered.
- Warna konsisten.
- 3D asset terlihat bagus.
- Screen UI mudah dibaca.

### UX

Pengunjung dapat:

```text
Open
 ↓
Start
 ↓
Navigate
 ↓
Select
 ↓
Explore
 ↓
Back
```

tanpa kebingungan.

### Technical

- Tidak ada horizontal overflow.
- Tidak ada UI overlap.
- GLB berhasil dimuat.
- Responsive.
- Keyboard navigation bekerja.
- Mobile tetap usable.
- Tidak ada TypeScript.
- Tailwind digunakan sebagai styling utama.

---

## 32. Definition of Done

```text
[ ] Next.js App Router
[ ] JavaScript / JSX
[ ] Tailwind CSS
[ ] Existing arcade.glb integrated
[ ] React Three Fiber scene
[ ] Proper lighting
[ ] Camera system
[ ] Loading state
[ ] Press Start
[ ] Arcade menu
[ ] Joystick navigation
[ ] Button interaction
[ ] Keyboard navigation
[ ] About
[ ] Projects
[ ] Project detail
[ ] Skills
[ ] Experience
[ ] Contact
[ ] Responsive
[ ] Mobile controls
[ ] CRT effect
[ ] Performance optimization
[ ] Accessibility
[ ] No fake portfolio data
[ ] No TypeScript
[ ] No generic portfolio layout
```

---

## 33. Final Product Flow

```text
                    KHAZ ARCADE
                         │
                         ▼
                  ┌─────────────┐
                  │  3D ARCADE  │
                  │    .GLB     │
                  └──────┬──────┘
                         │
                    PRESS START
                         │
                         ▼
                  ┌─────────────┐
                  │ ARCADE MENU │
                  └──────┬──────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
      ABOUT           PROJECTS          SKILLS
        │                │                │
        │                ▼                │
        │          PROJECT DETAIL        │
        │                │                │
        └────────────────┼────────────────┘
                         │
                  EXPERIENCE
                         │
                       CONTACT
```

---

## 34. Development Priority

Jangan langsung membuat semua fitur sekaligus.

### Phase 1 — Foundation

1. Setup Next.js.
2. Setup Tailwind.
3. Setup React Three Fiber.
4. Import `arcade.glb`.
5. Buat camera.
6. Buat lighting.
7. Pastikan model tampil dengan baik.

### Phase 2 — Core Interaction

1. Loading screen.
2. Press Start.
3. Button interaction.
4. Camera transition.
5. Arcade menu.
6. Keyboard navigation.

### Phase 3 — Portfolio

1. About.
2. Projects.
3. Project Detail.
4. Skills.
5. Experience.
6. Contact.

### Phase 4 — Physical Arcade Interaction

1. Joystick animation.
2. Button animation.
3. Screen glow.
4. CRT effect.
5. Project carousel.

### Phase 5 — Polish

1. Mobile optimization.
2. Performance optimization.
3. Audio.
4. Micro interactions.
5. Accessibility.
6. Final responsive testing.

**Prioritas utama:** `arcade.glb → tampil bagus → Press Start → camera masuk ke screen → menu dapat dikontrol → portfolio content.`

Jangan membuat efek tambahan sebelum alur utama tersebut stabil.
