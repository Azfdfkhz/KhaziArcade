You are a Senior Frontend Engineer, Creative Developer, 3D Web Developer,
and UI/UX Designer.

Build a premium interactive personal portfolio website called:

KHAZ ARCADE

A modern creative developer portfolio presented through an interactive
3D retro arcade machine.

==================================================
TECH STACK — STRICT
==================================================

Use ONLY:

- Next.js
- React
- JavaScript
- JSX
- Tailwind CSS
- Three.js
- React Three Fiber
- @react-three/drei
- Framer Motion

IMPORTANT:

Use JavaScript / JSX.

DO NOT use TypeScript.

DO NOT create .ts files.

DO NOT create .tsx files.

Use:

.jsx
.js

for React components and data.

Use Tailwind CSS for styling.

Avoid creating large custom CSS files unless absolutely necessary.

Do not use another frontend framework.

==================================================
CORE CONCEPT
==================================================

The website is not a conventional developer portfolio.

It should feel like:

"A real retro arcade machine that contains my portfolio."

The user enters the website and sees a 3D arcade machine.

The arcade machine is the main identity of the website.

The user can interact with:

- Joystick
- Arcade buttons
- Screen
- Portfolio menu

The arcade machine itself is already provided by the user.

==================================================
IMPORTANT — EXISTING 3D ASSET
==================================================

THE USER ALREADY HAS THE ARCADE 3D MODEL.

Do NOT create a new arcade machine.

Do NOT redesign the arcade machine.

Do NOT replace the arcade model.

Do NOT generate another cabinet.

Use the provided .glb / .gltf / Blender-exported model.

The existing arcade asset is the source of truth.

Build the website and UI around this asset.

The arcade model should be loaded using:

React Three Fiber
+
@react-three/drei

Recommended:

useGLTF()

==================================================
PROJECT STRUCTURE
==================================================

Use a clean Next.js App Router structure.

Recommended:

app/
    layout.jsx
    page.jsx
    globals.css

components/
    arcade/
        ArcadeScene.jsx
        ArcadeModel.jsx
        ArcadeCamera.jsx
        ArcadeLights.jsx
        ArcadeInteraction.jsx

    screen/
        ArcadeScreen.jsx
        ArcadeMenu.jsx
        AboutScreen.jsx
        ProjectsScreen.jsx
        ProjectDetail.jsx
        SkillsScreen.jsx
        ExperienceScreen.jsx
        ContactScreen.jsx

    ui/
        ArcadeButton.jsx
        ScreenFrame.jsx
        CRTOverlay.jsx
        ControlsHint.jsx
        LoadingScreen.jsx

data/
    projects.js
    skills.js
    experience.js

public/
    models/
        arcade.glb

    textures/

    images/

==================================================
NEXT.JS ARCHITECTURE
==================================================

Use Next.js App Router.

The main page:

app/page.jsx

should contain the portfolio experience.

Use client components only where interaction is required.

For example:

"use client";

Use client components for:

- Three.js scene
- Joystick interaction
- Arcade buttons
- Portfolio navigation
- Framer Motion animations
- Keyboard controls

Keep static content server-rendered where possible.

==================================================
TAILWIND CSS
==================================================

Use Tailwind CSS for:

- Layout
- Spacing
- Typography
- Colors
- Responsive design
- Buttons
- UI panels
- Navigation
- Screen overlays
- Controls
- Mobile layout

Do not create unnecessary CSS.

Use Tailwind utility classes.

Example visual language:

bg-[#F8F6EF]
text-[#263238]
bg-[#63C8CC]
bg-[#237F85]
bg-[#FFF3D6]
bg-[#F29A8D]
bg-[#F4C96B]

==================================================
VISUAL IDENTITY
==================================================

Style:

MODERN RETRO ARCADE

Keywords:

- Minimal
- Premium
- Pastel
- Playful
- Clean
- Soft
- Interactive
- 3D
- Retro
- Modern

Avoid:

- Cyberpunk
- Excessive neon
- Excessive gradients
- Excessive glassmorphism
- Black-heavy UI
- Generic gaming HUD
- Generic SaaS dashboard
- Overly complicated UI
- Excessive particles
- Excessive glow

==================================================
COLOR SYSTEM
==================================================

Primary:

Turquoise:
#63C8CC

Deep Teal:
#237F85

Cream:
#FFF3D6

Warm White:
#F8F6EF

Peach:
#F29A8D

Yellow:
#F4C96B

Dark:
#263238

The overall page should primarily use:

Warm White
+
Cream
+
Turquoise
+
Deep Teal

Peach and yellow are accent colors.

==================================================
LANDING PAGE
==================================================

The first viewport should immediately communicate:

KHAZ ARCADE

The 3D arcade machine should be the main visual element.

Layout:

Desktop:

        KHAZ
        Creative Developer

                 [3D ARCADE]

              PRESS START

Mobile:

        KHAZ ARCADE

        [3D ARCADE]

        PRESS START

Keep the surrounding environment minimal.

Do not put a conventional portfolio hero section beside the arcade.

The arcade IS the hero.

==================================================
3D SCENE
==================================================

Create a Three.js scene using React Three Fiber.

The scene should contain:

- Existing arcade model
- Camera
- Soft key light
- Fill light
- Rim light
- Ground plane
- Ambient lighting

The arcade should have:

- Soft shadows
- Screen glow
- Subtle ambient lighting
- Premium product-render appearance

Use @react-three/drei utilities where useful.

Potential components:

Canvas
Environment
ContactShadows
PerspectiveCamera
OrbitControls only if needed

Do not allow unrestricted orbit controls if it damages the portfolio experience.

The camera should be controlled.

==================================================
CAMERA
==================================================

The initial camera shows the entire arcade.

After START:

Animate the camera toward the arcade screen.

Use Framer Motion or a suitable Three.js animation approach.

Transition:

0.8–1.5 seconds.

The transition should feel smooth and cinematic.

Avoid excessive camera movement.

==================================================
ARCADE SCREEN
==================================================

The screen is the actual portfolio interface.

Initial screen:

WELCOME TO
MY PORTFOLIO

PRESS START

After START:

SELECT CATEGORY

▶ ABOUT ME
  PROJECTS
  SKILLS
  EXPERIENCE
  CONTACT

Controls:

↑ ↓ MOVE
● SELECT
◀ BACK

==================================================
JOYSTICK
==================================================

The physical joystick must be interactive.

When user navigates:

UP
→ joystick tilts upward

DOWN
→ joystick tilts downward

LEFT
→ joystick tilts left

RIGHT
→ joystick tilts right

The animation must be subtle.

The joystick should not visually break the model.

==================================================
ARCADE BUTTONS
==================================================

Physical buttons should react when clicked.

Button animation:

- slight downward movement
- slight scale change
- subtle sound
- UI feedback

Buttons can represent:

SELECT
BACK
ACTION

==================================================
INPUT SYSTEM
==================================================

Support:

Mouse
Keyboard
Joystick
Touch

Keyboard:

ArrowUp
ArrowDown
ArrowLeft
ArrowRight

Enter
Escape

Optional:

W
A
S
D

The website must remain usable without the physical joystick.

==================================================
PORTFOLIO NAVIGATION
==================================================

Main categories:

ABOUT ME
PROJECTS
SKILLS
EXPERIENCE
CONTACT

Navigation state should be handled using React state.

Example conceptual state:

activeScreen

Possible values:

"menu"
"about"
"projects"
"project-detail"
"skills"
"experience"
"contact"

Do not create unnecessary page routes for every arcade screen.

The arcade should feel like a single interactive experience.

==================================================
ABOUT ME
==================================================

Title:

CHARACTER SELECT

Show:

KHAZ

Creative Developer

Short real biography.

Use actual information provided by the user.

Do not invent:

Achievements
Companies
Clients
Awards
Experience
Statistics

==================================================
PROJECTS
==================================================

Title:

GAME LIBRARY

Projects should feel like games inside an arcade.

Each project:

- Name
- Description
- Category
- Technologies
- Year
- Preview
- Live demo
- Source code

Navigation:

LEFT / RIGHT

Selected project becomes visually emphasized.

Example project:

JEJAK SAKU

PKL Management Platform

Flutter
Supabase
Google Drive

Actions:

PLAY PROJECT

GITHUB

==================================================
PROJECT DATA
==================================================

Store projects in:

data/projects.js

Example structure:

const projects = [
  {
    id: "jejak-saku",
    title: "Jejak Saku",
    description: "...",
    technologies: ["Flutter", "Supabase"],
    year: "2026",
    image: "/images/projects/jejak-saku.webp",
    demoUrl: "...",
    githubUrl: "..."
  }
];

Do not hardcode project content directly inside UI components.

==================================================
SKILLS
==================================================

Title:

POWER UPS

Show technologies as visual collectible elements.

Possible technologies:

Next.js
React
JavaScript
Tailwind CSS
Flutter
Blender
Unity
Supabase
Linux

Use real skills only.

Do not create fake skill percentages.

==================================================
EXPERIENCE
==================================================

Title:

HIGH SCORE

Use a clean timeline.

Only use real experience.

Do not invent professional history.

==================================================
CONTACT
==================================================

Title:

READY TO CONNECT?

Example:

Let's build something interesting.

CONTACT ME

GitHub
Email
LinkedIn
Instagram

Keep the screen minimal.

==================================================
CRT UI
==================================================

The arcade screen should have a subtle CRT aesthetic.

Possible effects:

- scanlines
- subtle noise
- subtle vignette
- screen glow
- slight curvature illusion

IMPORTANT:

The CRT effect must NOT reduce readability.

Do not make it look like an old broken CRT.

The aesthetic should be:

"modern retro"

not:

"old television simulator".

==================================================
TYPOGRAPHY
==================================================

Use two typography styles.

Arcade / Pixel-inspired:

- screen headings
- menu labels
- small game UI

Modern sans-serif:

- descriptions
- project information
- metadata

Do not use pixel typography everywhere.

Typography must remain highly readable.

==================================================
FRAMER MOTION
==================================================

Use Framer Motion for:

- menu transitions
- screen transitions
- button animations
- project transitions
- UI entrance
- hover states
- subtle movement

Animations should be:

Fast
Smooth
Purposeful

Avoid:

Excessive bouncing
Long transitions
Random movement
Overly dramatic effects

==================================================
MOBILE
==================================================

Mobile must remain fully usable.

Do not force the desktop 3D experience onto a small screen.

On mobile:

- simplify the 3D scene
- reduce camera movement
- reduce lighting cost
- simplify environment
- prioritize screen UI

The arcade concept remains.

Mobile UI example:

KHAZ ARCADE

▶ ABOUT
  PROJECTS
  SKILLS
  EXPERIENCE
  CONTACT

Touch controls should be available.

==================================================
RESPONSIVE BREAKPOINTS
==================================================

Design for:

Mobile
Tablet
Laptop
Desktop
Large Desktop

Use Tailwind responsive utilities:

sm:
md:
lg:
xl:
2xl:

Do not rely on fixed pixel layouts.

Never allow:

horizontal overflow
cropped UI
text outside screen
buttons outside viewport
3D model disappearing

==================================================
PERFORMANCE
==================================================

This is a 3D portfolio.

Performance is a priority.

Optimize:

GLB
Textures
Lights
Shadows
Post-processing
Animations

Use:

lazy loading
dynamic imports
optimized textures
compressed assets
limited shadows

Consider dynamically importing the Three.js scene:

ssr: false

if necessary.

The initial HTML/UI should load quickly.

==================================================
LOADING EXPERIENCE
==================================================

Because the 3D model may take time to load:

Create a minimal loading screen.

Example:

KHAZ ARCADE

LOADING...

████████░░ 80%

Do not show a generic spinner.

The loading screen should match the arcade identity.

==================================================
ACCESSIBILITY
==================================================

Despite being an interactive 3D portfolio:

The website must remain accessible.

Provide:

- keyboard navigation
- visible focus states
- readable contrast
- semantic buttons
- aria-label where appropriate
- reduced-motion consideration

The portfolio must not depend entirely on mouse input.

==================================================
AUDIO
==================================================

Optional.

If implemented:

- button click
- joystick movement
- menu select
- back
- startup

Provide:

SOUND ON / OFF

Do not autoplay loud audio.

Keep sounds subtle.

==================================================
CODE QUALITY
==================================================

Write clean maintainable React code.

Avoid:

Huge single-file components.

Do not put the entire website inside:

app/page.jsx

Split functionality into components.

Use reusable components.

Use data-driven rendering.

Avoid duplicated JSX.

==================================================
IMPORTANT DESIGN RULE
==================================================

DO NOT TURN THIS INTO A NORMAL PORTFOLIO.

Wrong:

Navbar
Hero
About section
Project cards
Skills grid
Contact footer

Correct:

3D ARCADE
↓
PRESS START
↓
ARCADE MENU
↓
ABOUT
PROJECTS
SKILLS
EXPERIENCE
CONTACT

The arcade is the navigation system.

==================================================
FINAL USER EXPERIENCE
==================================================

User opens:

KHAZ ARCADE

↓

3D arcade appears

↓

PRESS START

↓

User presses physical/visual button

↓

Button physically moves

↓

Screen activates

↓

Camera moves toward screen

↓

Portfolio menu appears

↓

User navigates using joystick / keyboard / mouse / touch

↓

User selects:

ABOUT
PROJECTS
SKILLS
EXPERIENCE
CONTACT

↓

User explores portfolio

↓

User can open:

LIVE DEMO
GITHUB
CONTACT

↓

BACK

↓

Return to arcade menu

==================================================
FINAL QUALITY TARGET
==================================================

The result should feel like:

A premium interactive creative developer portfolio.

Not a template.

Not a generic gaming website.

Not cyberpunk.

Not a SaaS dashboard.

Not AI-generated visual clutter.

The design should communicate:

KHAZ
Creative Developer
Modern Retro
Interactive
3D
Minimal
Playful
Technical
Memorable

The existing arcade 3D model is the centerpiece.

Everything else should support it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
