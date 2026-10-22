const fs = require('fs');
const path = require('path');

// SVG Helper wrapper
function wrapSvg(inner, title) {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" width="100%" height="160" style="background:#09090b;border-radius:10px;font-family:JetBrains Mono, monospace;font-size:11px;color:#fff;">
    <defs>
      <pattern id="grid-eng" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#27272a" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-eng)" />
    <!-- Header title -->
    <text x="14" y="22" fill="#a1a1aa" font-size="10" font-weight="bold" letter-spacing="0.5">${title || 'JEE CBT Visual Diagram'}</text>
    ${inner}
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(fullSvg);
}

// ---------------- MODERN PHYSICS SVGS ----------------
function getModernPhysicsSvg(prompt, qNum, part) {
  const p = prompt.toLowerCase();
  const title = `MODERN PHYSICS PART ${part} • Q${qNum}`;

  if (p.includes('stopping potential') || p.includes('v0') || p.includes('frequency') || p.includes('threshold')) {
    // Stopping potential vs frequency
    return wrapSvg(`
      <line x1="45" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="90" y1="35" x2="90" y2="145" stroke="#71717a" stroke-width="1.5"/>
      <text x="315" y="142" fill="#a1a1aa" font-size="10">ν (Hz)</text>
      <text x="65" y="45" fill="#38bdf8" font-size="10">V₀ (V)</text>
      <!-- Line 1: Metal A -->
      <line x1="130" y1="130" x2="280" y2="45" stroke="#ef4444" stroke-width="2.5"/>
      <circle cx="130" cy="130" r="3.5" fill="#ef4444"/>
      <text x="120" y="144" fill="#ef4444" font-weight="bold">ν₀</text>
      <text x="285" y="45" fill="#ef4444" font-weight="bold">Metal A</text>
      <!-- Line 2: Metal B -->
      <line x1="180" y1="130" x2="310" y2="55" stroke="#38bdf8" stroke-width="2.5"/>
      <circle cx="180" cy="130" r="3.5" fill="#38bdf8"/>
      <text x="175" y="144" fill="#38bdf8" font-weight="bold">ν₀'</text>
      <text x="315" y="60" fill="#38bdf8" font-weight="bold">Metal B</text>
      <!-- Slope formula -->
      <rect x="200" y="85" width="105" height="26" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="208" y="102" fill="#22c55e" font-size="10">Slope = h/e (const)</text>
    `, title + ' — Photoelectric V₀ vs ν Characteristic');
  }

  if (p.includes('photocurrent') || p.includes('saturation') || p.includes('collector potential') || p.includes('intensity')) {
    // Current vs collector potential
    return wrapSvg(`
      <line x1="40" y1="90" x2="330" y2="90" stroke="#71717a" stroke-width="1.5"/>
      <line x1="160" y1="35" x2="160" y2="145" stroke="#71717a" stroke-width="1.5"/>
      <text x="320" y="85" fill="#a1a1aa" font-size="10">+V</text>
      <text x="165" y="45" fill="#38bdf8" font-size="10">Current I (μA)</text>
      <text x="45" y="85" fill="#a1a1aa" font-size="10">-V</text>
      <!-- Curves for I1, I2 -->
      <path d="M 80 90 C 120 90 140 60 210 60 L 310 60" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <path d="M 80 90 C 120 90 150 45 210 45 L 310 45" fill="none" stroke="#22c55e" stroke-width="2.5"/>
      <circle cx="80" cy="90" r="3.5" fill="#fbbf24"/>
      <text x="60" y="105" fill="#fbbf24" font-weight="bold">-V₀ (Stop)</text>
      <text x="315" y="48" fill="#22c55e" font-weight="bold">Intensity I₂</text>
      <text x="315" y="63" fill="#ef4444" font-weight="bold">Intensity I₁</text>
    `, title + ' — Saturation Photocurrent vs Collector Voltage');
  }

  if (p.includes('x-ray') || p.includes('moseley') || p.includes('cutoff') || p.includes('duane') || p.includes('characteristic')) {
    // X-ray spectrum
    return wrapSvg(`
      <line x1="45" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="60" y1="35" x2="60" y2="145" stroke="#71717a" stroke-width="1.5"/>
      <text x="320" y="142" fill="#a1a1aa" font-size="10">λ (Å)</text>
      <text x="65" y="45" fill="#38bdf8" font-size="10">Intensity I</text>
      <!-- Continuous curve with sharp K peaks -->
      <path d="M 95 130 C 110 130 130 65 160 65 L 160 40 L 163 40 L 163 67 L 190 75 L 190 50 L 193 50 L 193 76 C 230 85 270 115 310 128" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
      <circle cx="95" cy="130" r="3.5" fill="#ef4444"/>
      <text x="80" y="145" fill="#ef4444" font-weight="bold">λ_min</text>
      <text x="150" y="35" fill="#fbbf24" font-size="10" font-weight="bold">K_β</text>
      <text x="185" y="45" fill="#22c55e" font-size="10" font-weight="bold">K_α</text>
      <rect x="220" y="45" width="100" height="24" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="228" y="61" fill="#a1a1aa" font-size="9.5">λ_min = hc / (eV)</text>
    `, title + ' — Characteristic & Continuous X-Ray Spectrum');
  }

  if (p.includes('decay') || p.includes('radioactiv') || p.includes('half-life') || p.includes('alpha') || p.includes('beta') || p.includes('gamma') || p.includes('disintegrat')) {
    // Radioactive exponential decay
    return wrapSvg(`
      <line x1="45" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="60" y1="35" x2="60" y2="145" stroke="#71717a" stroke-width="1.5"/>
      <text x="320" y="142" fill="#a1a1aa" font-size="10">Time t</text>
      <text x="65" y="45" fill="#38bdf8" font-size="10">Active Nuclei N(t)</text>
      <!-- Exponential curve -->
      <path d="M 60 45 C 90 75 140 105 200 120 C 240 126 280 129 320 130" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <line x1="60" y1="87" x2="135" y2="87" stroke="#fbbf24" stroke-dasharray="3,3"/>
      <line x1="135" y1="87" x2="135" y2="130" stroke="#fbbf24" stroke-dasharray="3,3"/>
      <text x="40" y="50" fill="#ef4444" font-weight="bold">N₀</text>
      <text x="28" y="90" fill="#fbbf24" font-weight="bold">N₀/2</text>
      <text x="125" y="142" fill="#fbbf24" font-weight="bold">T₁/₂</text>
      <rect x="210" y="55" width="115" height="24" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="218" y="71" fill="#22c55e" font-size="10">N(t) = N₀ e^{-λ t}</text>
    `, title + ' — Law of Radioactive Disintegration');
  }

  if (p.includes('bohr') || p.includes('orbit') || p.includes('energy level') || p.includes('transition') || p.includes('lyman') || p.includes('balmer') || p.includes('hydrogen') || p.includes('paschen')) {
    // Bohr atom energy levels
    return wrapSvg(`
      <!-- Levels -->
      <line x1="50" y1="135" x2="310" y2="135" stroke="#ef4444" stroke-width="2.5"/>
      <text x="318" y="138" fill="#ef4444" font-weight="bold">n=1 (-13.6 eV)</text>
      <line x1="50" y1="95" x2="310" y2="95" stroke="#fbbf24" stroke-width="2"/>
      <text x="318" y="98" fill="#fbbf24" font-weight="bold">n=2 (-3.4 eV)</text>
      <line x1="50" y1="70" x2="310" y2="70" stroke="#38bdf8" stroke-width="1.8"/>
      <text x="318" y="73" fill="#38bdf8" font-weight="bold">n=3 (-1.51 eV)</text>
      <line x1="50" y1="50" x2="310" y2="50" stroke="#a1a1aa" stroke-dasharray="3,3"/>
      <text x="318" y="53" fill="#a1a1aa">n=∞ (0 eV)</text>
      <!-- Transitions -->
      <!-- Lyman -->
      <line x1="90" y1="95" x2="90" y2="135" stroke="#ef4444" stroke-width="2"/>
      <polygon points="90,135 87,127 93,127" fill="#ef4444"/>
      <text x="75" y="118" fill="#ef4444" font-size="10">Lyman</text>
      <!-- Balmer -->
      <line x1="160" y1="70" x2="160" y2="95" stroke="#22c55e" stroke-width="2"/>
      <polygon points="160,95 157,88 163,88" fill="#22c55e"/>
      <text x="145" y="85" fill="#22c55e" font-size="10">Balmer</text>
      <!-- Photon emission -->
      <path d="M 160 82 Q 175 75 190 82 Q 205 90 220 82" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="225" y="85" fill="#fbbf24" font-size="9">hν = ΔE</text>
    `, title + ' — Bohr Quantized Orbital Transition Levels');
  }

  // General Modern Physics quantum interaction / de Broglie
  return wrapSvg(`
    <!-- Matter wave & quantum photon interaction -->
    <path d="M 40 80 Q 60 60 80 80 Q 100 100 120 80 Q 140 60 160 80" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
    <polygon points="165,80 157,75 157,85" fill="#fbbf24"/>
    <text x="80" y="65" fill="#fbbf24" font-weight="bold">Photon hν</text>
    <!-- Target plate / electron -->
    <rect x="180" y="45" width="14" height="75" rx="3" fill="#3f3f46" stroke="#71717a" stroke-width="1.5"/>
    <circle cx="230" cy="70" r="6" fill="#38bdf8"/>
    <line x1="236" y1="70" x2="280" y2="70" stroke="#38bdf8" stroke-width="2"/>
    <polygon points="285,70 277,66 277,74" fill="#38bdf8"/>
    <text x="224" y="90" fill="#38bdf8" font-size="10">e⁻ (K_max)</text>
    <rect x="195" y="115" width="145" height="25" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="202" y="131" fill="#22c55e" font-size="10">K_max = hν - Φ = eV₀</text>
  `, title + ' — Quantum Photoelectric Interaction');
}

// ---------------- GEOMETRICAL OPTICS SVGS ----------------
function getOpticsSvg(prompt, qNum, part) {
  const p = prompt.toLowerCase();
  const title = `GEOMETRICAL OPTICS PART ${part} • Q${qNum}`;

  if (p.includes('prism') || p.includes('deviation') || p.includes('angle of minimum deviation') || p.includes('dispersion')) {
    // Triangular prism
    return wrapSvg(`
      <!-- Prism triangle -->
      <polygon points="180,35 90,135 270,135" fill="#18181b" stroke="#38bdf8" stroke-width="2"/>
      <text x="175" y="30" fill="#38bdf8" font-weight="bold">A</text>
      <!-- Incident ray -->
      <line x1="40" y1="105" x2="135" y2="85" stroke="#ef4444" stroke-width="2"/>
      <polygon points="90,95 82,92 85,99" fill="#ef4444"/>
      <text x="45" y="98" fill="#ef4444" font-size="10">Ray i</text>
      <!-- Refracted inside -->
      <line x1="135" y1="85" x2="225" y2="85" stroke="#22c55e" stroke-width="2"/>
      <polygon points="180,85 174,81 174,89" fill="#22c55e"/>
      <!-- Emergent ray -->
      <line x1="225" y1="85" x2="310" y2="120" stroke="#ef4444" stroke-width="2"/>
      <polygon points="270,103 262,99 265,106" fill="#ef4444"/>
      <text x="295" y="130" fill="#ef4444" font-size="10">Ray e</text>
      <!-- Normals -->
      <line x1="110" y1="65" x2="160" y2="105" stroke="#71717a" stroke-dasharray="3,3"/>
      <line x1="250" y1="65" x2="200" y2="105" stroke="#71717a" stroke-dasharray="3,3"/>
      <rect x="235" y="35" width="110" height="24" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="242" y="51" fill="#fbbf24" font-size="10">δ = i + e - A</text>
    `, title + ' — Ray Refraction Through Triangular Prism');
  }

  if (p.includes('mirror') || p.includes('concave mirror') || p.includes('convex mirror') || p.includes('reflect')) {
    // Concave / convex mirror ray trace
    return wrapSvg(`
      <line x1="30" y1="80" x2="330" y2="80" stroke="#71717a" stroke-width="1.5"/>
      <text x="320" y="95" fill="#a1a1aa" font-size="10">Axis</text>
      <!-- Curved mirror arc -->
      <path d="M 260 25 A 120 120 0 0 0 260 135" fill="none" stroke="#38bdf8" stroke-width="3.5"/>
      <!-- Silvering marks -->
      <path d="M 265 30 L 273 25 M 267 55 L 275 50 M 270 80 L 278 75 M 267 105 L 275 100 M 265 130 L 273 125" stroke="#71717a" stroke-width="1.5"/>
      <!-- Pole, Focus, Center -->
      <circle cx="269" cy="80" r="3" fill="#38bdf8"/>
      <text x="274" y="93" fill="#38bdf8" font-weight="bold">P</text>
      <circle cx="210" cy="80" r="3" fill="#fbbf24"/>
      <text x="207" y="95" fill="#fbbf24" font-weight="bold">F</text>
      <circle cx="150" cy="80" r="3" fill="#22c55e"/>
      <text x="147" y="95" fill="#22c55e" font-weight="bold">C</text>
      <!-- Object -->
      <line x1="90" y1="80" x2="90" y2="45" stroke="#ef4444" stroke-width="2.5"/>
      <polygon points="90,40 86,47 94,47" fill="#ef4444"/>
      <text x="82" y="38" fill="#ef4444" font-weight="bold">Object</text>
      <!-- Ray parallel then through F -->
      <line x1="90" y1="45" x2="265" y2="45" stroke="#ef4444" stroke-width="1.5"/>
      <line x1="265" y1="45" x2="120" y2="115" stroke="#ef4444" stroke-width="1.5"/>
    `, title + ' — Spherical Mirror Ray Tracing & Focal Conjugates');
  }

  if (p.includes('lens') || p.includes('convex lens') || p.includes('concave lens') || p.includes('focal length')) {
    // Thin lens ray trace
    return wrapSvg(`
      <line x1="30" y1="80" x2="330" y2="80" stroke="#71717a" stroke-width="1.5"/>
      <!-- Lens outline -->
      <path d="M 180 25 C 195 50 195 110 180 135 C 165 110 165 50 180 25 Z" fill="#18181b" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Optical center & Foci -->
      <circle cx="180" cy="80" r="3" fill="#38bdf8"/>
      <text x="183" y="95" fill="#38bdf8" font-weight="bold">O</text>
      <circle cx="120" cy="80" r="3" fill="#fbbf24"/>
      <text x="115" y="95" fill="#fbbf24" font-weight="bold">F₁</text>
      <circle cx="240" cy="80" r="3" fill="#fbbf24"/>
      <text x="236" y="95" fill="#fbbf24" font-weight="bold">F₂</text>
      <!-- Object -->
      <line x1="70" y1="80" x2="70" y2="45" stroke="#ef4444" stroke-width="2.5"/>
      <polygon points="70,40 66,47 74,47" fill="#ef4444"/>
      <text x="62" y="38" fill="#ef4444" font-weight="bold">Object</text>
      <!-- Parallel ray through F2 -->
      <line x1="70" y1="45" x2="180" y2="45" stroke="#ef4444" stroke-width="1.5"/>
      <line x1="180" y1="45" x2="290" y2="115" stroke="#ef4444" stroke-width="1.5"/>
      <!-- Ray through optical center O -->
      <line x1="70" y1="45" x2="290" y2="115" stroke="#22c55e" stroke-width="1.5"/>
      <!-- Real inverted image -->
      <line x1="290" y1="80" x2="290" y2="115" stroke="#38bdf8" stroke-width="2.5"/>
      <polygon points="290,120 286,113 294,113" fill="#38bdf8"/>
      <text x="282" y="132" fill="#38bdf8" font-weight="bold">Image</text>
    `, title + ' — Thin Converging Lens Image Formation');
  }

  if (p.includes('slab') || p.includes('apparent depth') || p.includes('shift') || p.includes('glass') || p.includes('snell') || p.includes('refraction')) {
    // Refraction through glass slab
    return wrapSvg(`
      <!-- Slab block -->
      <rect x="110" y="45" width="140" height="70" fill="#18181b" stroke="#38bdf8" stroke-width="2"/>
      <text x="165" y="85" fill="#38bdf8" font-size="11" font-weight="bold">μ (Glass)</text>
      <!-- Air labels -->
      <text x="60" y="85" fill="#a1a1aa">Air (μ=1)</text>
      <text x="260" y="85" fill="#a1a1aa">Air (μ=1)</text>
      <!-- Incident ray -->
      <line x1="50" y1="40" x2="110" y2="65" stroke="#ef4444" stroke-width="2"/>
      <!-- Refracted ray -->
      <line x1="110" y1="65" x2="250" y2="95" stroke="#22c55e" stroke-width="2"/>
      <!-- Emergent parallel ray -->
      <line x1="250" y1="95" x2="310" y2="120" stroke="#ef4444" stroke-width="2"/>
      <!-- Normals -->
      <line x1="110" y1="40" x2="110" y2="90" stroke="#71717a" stroke-dasharray="3,3"/>
      <line x1="250" y1="70" x2="250" y2="120" stroke="#71717a" stroke-dasharray="3,3"/>
      <rect x="230" y="25" width="115" height="24" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="238" y="41" fill="#fbbf24" font-size="10">Shift Δx = t(1 - 1/μ)</text>
    `, title + ' — Lateral Ray Displacement Across Refracting Slab');
  }

  // Optical bench & general optics setup
  return wrapSvg(`
    <line x1="30" y1="90" x2="330" y2="90" stroke="#71717a" stroke-width="1.5"/>
    <path d="M 170 30 C 185 55 185 125 170 150 C 155 125 155 55 170 30 Z" fill="#18181b" stroke="#38bdf8" stroke-width="2"/>
    <line x1="70" y1="90" x2="70" y2="50" stroke="#ef4444" stroke-width="2.5"/>
    <polygon points="70,45 66,52 74,52" fill="#ef4444"/>
    <line x1="70" y1="50" x2="170" y2="50" stroke="#ef4444" stroke-width="1.5"/>
    <line x1="170" y1="50" x2="270" y2="120" stroke="#ef4444" stroke-width="1.5"/>
    <circle cx="170" cy="90" r="3" fill="#38bdf8"/>
    <text x="174" y="105" fill="#38bdf8" font-size="10">Lens (f)</text>
    <text x="65" y="42" fill="#ef4444" font-size="10">Object</text>
    <text x="260" y="132" fill="#38bdf8" font-size="10">Focus Point</text>
  `, title + ' — General Optical Ray Configuration');
}

// ---------------- ELECTROSTATICS SVGS ----------------
function getElectrostaticsSvg(prompt, qNum, part) {
  const p = prompt.toLowerCase();
  const title = `ELECTROSTATICS PART ${part} • Q${qNum}`;

  if (p.includes('capacitor') || p.includes('plate') || p.includes('dielectric')) {
    return wrapSvg(`
      <!-- Parallel Plates -->
      <rect x="100" y="40" width="10" height="80" rx="2" fill="#ef4444"/>
      <rect x="250" y="40" width="10" height="80" rx="2" fill="#38bdf8"/>
      <text x="92" y="32" fill="#ef4444" font-weight="bold">+Q (Plate 1)</text>
      <text x="242" y="32" fill="#38bdf8" font-weight="bold">-Q (Plate 2)</text>
      <!-- Electric field lines -->
      <line x1="115" y1="60" x2="245" y2="60" stroke="#fbbf24" stroke-width="1.8"/>
      <polygon points="185,60 178,57 178,63" fill="#fbbf24"/>
      <line x1="115" y1="80" x2="245" y2="80" stroke="#fbbf24" stroke-width="1.8"/>
      <polygon points="185,80 178,77 178,83" fill="#fbbf24"/>
      <line x1="115" y1="100" x2="245" y2="100" stroke="#fbbf24" stroke-width="1.8"/>
      <polygon points="185,100 178,97 178,103" fill="#fbbf24"/>
      <text x="170" y="115" fill="#fbbf24" font-size="10" font-weight="bold">E = σ / ε₀</text>
      <!-- Plate spacing -->
      <line x1="110" y1="130" x2="250" y2="130" stroke="#71717a" stroke-dasharray="3,3"/>
      <text x="175" y="142" fill="#a1a1aa" font-size="10">Separation d</text>
    `, title + ' — Parallel Plate Capacitor Uniform Field');
  }

  if (p.includes('sphere') || p.includes('shell') || p.includes('concentric')) {
    return wrapSvg(`
      <!-- Inner sphere -->
      <circle cx="180" cy="85" r="30" fill="#18181b" stroke="#ef4444" stroke-width="2.5"/>
      <text x="172" y="88" fill="#ef4444" font-weight="bold">+q₁</text>
      <text x="195" y="70" fill="#ef4444" font-size="9">Radius R₁</text>
      <!-- Outer shell -->
      <circle cx="180" cy="85" r="55" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="210" y="130" fill="#38bdf8" font-size="9">Shell R₂ (+q₂)</text>
      <!-- Field line -->
      <line x1="180" y1="20" x2="180" y2="150" stroke="#71717a" stroke-dasharray="3,3"/>
      <line x1="115" y1="85" x2="245" y2="85" stroke="#71717a" stroke-dasharray="3,3"/>
      <rect x="20" y="45" width="85" height="25" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
      <text x="26" y="61" fill="#22c55e" font-size="9.5">V = k q / r</text>
    `, title + ' — Concentric Spherical Shells Field Configuration');
  }

  // Charge interaction / dipole
  return wrapSvg(`
    <!-- Dipole +q and -q -->
    <circle cx="120" cy="80" r="14" fill="#ef4444"/>
    <text x="113" y="85" fill="#fff" font-weight="bold">+q</text>
    <circle cx="240" cy="80" r="14" fill="#38bdf8"/>
    <text x="234" y="85" fill="#fff" font-weight="bold">-q</text>
    <!-- Field curved lines -->
    <path d="M 120 66 C 150 35 210 35 240 66" fill="none" stroke="#fbbf24" stroke-width="2"/>
    <polygon points="185,42 178,39 178,45" fill="#fbbf24"/>
    <path d="M 120 94 C 150 125 210 125 240 94" fill="none" stroke="#fbbf24" stroke-width="2"/>
    <polygon points="185,118 178,115 178,121" fill="#fbbf24"/>
    <line x1="134" y1="80" x2="226" y2="80" stroke="#fbbf24" stroke-width="2"/>
    <polygon points="185,80 178,77 178,83" fill="#fbbf24"/>
    <text x="160" y="140" fill="#a1a1aa" font-size="10">Separation 2a</text>
  `, title + ' — Electric Dipole Lines of Force & Equipotentials');
}

// ---------------- KINEMATICS SVGS ----------------
function getKinematicsSvg(prompt, qNum, part) {
  const p = prompt.toLowerCase();
  const title = `KINEMATICS PART ${part} • Q${qNum}`;

  if (p.includes('projectile') || p.includes('trajectory') || p.includes('incline') || p.includes('angle')) {
    return wrapSvg(`
      <line x1="40" y1="130" x2="320" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="50" y1="35" x2="50" y2="140" stroke="#71717a" stroke-width="1.5"/>
      <!-- Parabola -->
      <path d="M 50 130 Q 185 30 310 130" fill="none" stroke="#22c55e" stroke-width="2.5"/>
      <!-- Initial velocity vector -->
      <line x1="50" y1="130" x2="105" y2="75" stroke="#ef4444" stroke-width="2.5"/>
      <polygon points="110,70 101,75 106,81" fill="#ef4444"/>
      <text x="95" y="65" fill="#ef4444" font-weight="bold">u</text>
      <path d="M 75 130 A 25 25 0 0 0 70 110" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="78" y="122" fill="#fbbf24" font-size="10">θ</text>
      <!-- Apex H_max -->
      <line x1="180" y1="55" x2="180" y2="130" stroke="#38bdf8" stroke-dasharray="3,3"/>
      <text x="185" y="90" fill="#38bdf8" font-size="10" font-weight="bold">H_max</text>
      <text x="290" y="142" fill="#22c55e" font-weight="bold">Range R</text>
    `, title + ' — 2D Projectile Parabolic Trajectory');
  }

  // Velocity time graph
  return wrapSvg(`
    <line x1="45" y1="130" x2="320" y2="130" stroke="#71717a" stroke-width="1.5"/>
    <line x1="55" y1="35" x2="55" y2="140" stroke="#71717a" stroke-width="1.5"/>
    <text x="310" y="142" fill="#a1a1aa" font-size="10">Time t (s)</text>
    <text x="60" y="45" fill="#38bdf8" font-size="10">Velocity v (m/s)</text>
    <!-- Graph -->
    <path d="M 55 130 L 130 55 L 230 55 L 300 130 Z" fill="#18181b" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="165" y="90" fill="#22c55e" font-size="10" font-weight="bold">Area = Δx</text>
    <line x1="130" y1="55" x2="130" y2="130" stroke="#71717a" stroke-dasharray="2,2"/>
    <line x1="230" y1="55" x2="230" y2="130" stroke="#71717a" stroke-dasharray="2,2"/>
    <text x="122" y="142" fill="#a1a1aa" font-size="9.5">t₁</text>
    <text x="222" y="142" fill="#a1a1aa" font-size="9.5">t₂</text>
    <text x="292" y="142" fill="#a1a1aa" font-size="9.5">t₃</text>
  `, title + ' — Kinematics Velocity-Time (v-t) Motion Analysis');
}

// ---------------- INTEGRATION SVGS ----------------
function getIntegrationSvg(prompt, qNum, part) {
  const title = `INTEGRATION PART ${part} • Q${qNum}`;
  return wrapSvg(`
    <line x1="40" y1="130" x2="320" y2="130" stroke="#71717a" stroke-width="1.5"/>
    <line x1="60" y1="35" x2="60" y2="140" stroke="#71717a" stroke-width="1.5"/>
    <text x="310" y="142" fill="#a1a1aa" font-size="10">x</text>
    <text x="65" y="45" fill="#38bdf8" font-size="10">y = f(x)</text>
    <!-- Shaded area under curve -->
    <path d="M 100 130 L 100 85 Q 160 45 220 70 L 220 130 Z" fill="#27272a" stroke="#22c55e" stroke-width="2"/>
    <!-- Strip dx -->
    <rect x="155" y="58" width="10" height="72" fill="#ef4444" opacity="0.6"/>
    <text x="150" y="50" fill="#ef4444" font-size="9.5">y dx</text>
    <text x="95" y="142" fill="#fbbf24" font-weight="bold">a</text>
    <text x="215" y="142" fill="#fbbf24" font-weight="bold">b</text>
    <rect x="235" y="45" width="105" height="25" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="242" y="61" fill="#22c55e" font-size="10">Area = ∫ₐᵇ f(x) dx</text>
  `, title + ' — Definite Integral Bounded Geometric Area');
}

// ---------------- VECTORS & 3D SVGS ----------------
function getVectors3DSvg(prompt, qNum, part) {
  const title = `VECTORS & 3D PART ${part} • Q${qNum}`;
  return wrapSvg(`
    <!-- 3D Axes -->
    <line x1="180" y1="90" x2="180" y2="30" stroke="#71717a" stroke-width="1.8"/>
    <polygon points="180,25 176,33 184,33" fill="#71717a"/>
    <text x="185" y="35" fill="#38bdf8" font-weight="bold">Z</text>
    <line x1="180" y1="90" x2="280" y2="120" stroke="#71717a" stroke-width="1.8"/>
    <polygon points="285,121 277,117 279,124" fill="#71717a"/>
    <text x="290" y="125" fill="#ef4444" font-weight="bold">Y</text>
    <line x1="180" y1="90" x2="100" y2="135" stroke="#71717a" stroke-width="1.8"/>
    <polygon points="95,138 103,137 101,130" fill="#71717a"/>
    <text x="85" y="145" fill="#22c55e" font-weight="bold">X</text>
    <!-- Vector r -->
    <line x1="180" y1="90" x2="245" y2="55" stroke="#fbbf24" stroke-width="2.5"/>
    <polygon points="250,52 240,53 244,60" fill="#fbbf24"/>
    <circle cx="245" cy="55" r="3" fill="#fbbf24"/>
    <text x="252" y="55" fill="#fbbf24" font-weight="bold">P(x,y,z)</text>
    <rect x="25" y="45" width="120" height="25" rx="4" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    <text x="32" y="61" fill="#fbbf24" font-size="10">r⃗ = x î + y ĵ + z k̂</text>
  `, title + ' — 3D Cartesian Vector Coordinate Space');
}

// ---------------- FILE UPDATERS ----------------
function enrichFile(filePath, svgGenerator, partNum) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  let updatedCount = 0;
  // Match question blocks: id: '...', ... promptLatex: '...'
  // If it doesn't already have imageUrl:
  const qBlockRegex = /(\{\s*id:\s*'([^']+)'[\s\S]*?questionNumber:\s*(\d+)[\s\S]*?promptLatex:\s*'((?:[^'\\]|\\.)*)')([\s\S]*?options:)/g;

  content = content.replace(qBlockRegex, (match, prefix, qId, qNumStr, promptEsc, middle) => {
    // Check if middle already has imageUrl
    if (middle.includes('imageUrl:')) {
      return match;
    }
    const promptUnesc = promptEsc.replace(/\\'/g, "'").replace(/\\n/g, "\n");
    const qNum = parseInt(qNumStr, 10);
    const svgData = svgGenerator(promptUnesc, qNum, partNum);
    updatedCount++;
    return `${prefix},\n    imageUrl: '${svgData}'${middle}`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Enriched ${filePath}: added diagrams to ${updatedCount} questions.`);
}

// Enrich Modern Physics (Parts 1 to 5)
for (let p = 1; p <= 5; p++) {
  enrichFile(`src/data/vibrantModernPhysicsPart${p}.ts`, getModernPhysicsSvg, p);
}

// Enrich Geometrical Optics (Parts 1 to 5)
for (let p = 1; p <= 5; p++) {
  enrichFile(`src/data/vibrantGeometricalOpticsPart${p}.ts`, getOpticsSvg, p);
}

// Enrich Electrostatics (Parts 2 to 6)
for (let p = 2; p <= 6; p++) {
  enrichFile(`src/data/vibrantElectrostaticsPart${p}.ts`, getElectrostaticsSvg, p);
}

// Enrich Kinematics (Parts 1 and 2)
enrichFile(`src/data/vibrantKinematicsPart1.ts`, getKinematicsSvg, 1);
enrichFile(`src/data/vibrantKinematicsPart2.ts`, getKinematicsSvg, 2);

// Enrich Integration (Parts 1 to 4)
for (let p = 1; p <= 4; p++) {
  enrichFile(`src/data/vibrantIntegrationPart${p}.ts`, getIntegrationSvg, p);
}

// Enrich Vectors & 3D (Parts 1 to 3)
for (let p = 1; p <= 3; p++) {
  enrichFile(`src/data/vibrantVectors3DPart${p}.ts`, getVectors3DSvg, p);
}

console.log('Finished enriching diagrams across all chapter files!');
