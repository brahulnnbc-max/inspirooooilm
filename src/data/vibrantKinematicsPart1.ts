import { Question } from '../types/exam';

// Helper for clean inline SVG diagrams with dark theme for Kinematics
export const createKinematicsSvg = (svgContent: string): string => {
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" width="100%" height="160" style="background:#09090b;border-radius:10px;font-family:sans-serif;font-size:12px;color:#fff;">
    <defs>
      <pattern id="grid-kin" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#27272a" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-kin)" />
    ${svgContent}
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(fullSvg);
};

// =========================================================================
// VIBRANT KOTA KINEMATICS PART 1: QUESTIONS 1 TO 50 (180 Mins, 200 Marks)
// Covering Exercise-I (Q1-Q21), Exercise-II (Q22-Q32), and Exercise-III (Q33-Q50)
// =========================================================================
export const KINEMATICS_PART_1_QUESTIONS: Question[] = [
  // --- EXERCISE-I: Q1 to Q21 ---
  {
    id: 'kin-p1-q1',
    sectionId: 'physics',
    questionNumber: 1,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A car accelerates from rest at a constant rate $\\alpha$ for some time, after which it decelerates at a constant rate $\\beta$ to come to rest. If $T$ is the total time elapsed, then the maximum speed of the car during this time is:',
    options: [
      { id: 'A', labelLatex: '$v = \\frac{\\alpha \\beta}{\\alpha + \\beta} T$' },
      { id: 'B', labelLatex: '$v = \\frac{\\alpha \\beta}{\\alpha - \\beta} T$' },
      { id: 'C', labelLatex: '$v = \\frac{\\beta^2}{\\alpha^2 - \\beta^2} T$' },
      { id: 'D', labelLatex: '$v = \\frac{\\alpha^2}{\\alpha^2 + \\beta^2} T$' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'Let $t_1$ be the acceleration time and $t_2$ deceleration time. $v_{\\max} = \\alpha t_1 = \\beta t_2$. Hence $t_1 = \\frac{v_{\\max}}{\\alpha}$ and $t_2 = \\frac{v_{\\max}}{\\beta}$. Total time $T = t_1 + t_2 = v_{\\max}\\left(\\frac{1}{\\alpha} + \\frac{1}{\\beta}\\right) = v_{\\max} \\frac{\\alpha + \\beta}{\\alpha \\beta} \\implies v_{\\max} = \\frac{\\alpha \\beta}{\\alpha + \\beta} T$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q2',
    sectionId: 'physics',
    questionNumber: 2,
    type: 'SINGLE_CORRECT',
    promptLatex: 'The distances travelled by a body falling freely from rest in the first, second, and third seconds are in the ratio:',
    options: [
      { id: 'A', labelLatex: '$1 : 3 : 5$' },
      { id: 'B', labelLatex: '$1 : 2 : 3$' },
      { id: 'C', labelLatex: '$1 : 5 : 13$' },
      { id: 'D', labelLatex: '$1 : 4 : 9$' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'Distance in the $n^{\\text{th}}$ second for motion from rest under constant acceleration is $s_n = u + \\frac{1}{2}g(2n-1) = \\frac{1}{2}g(2n-1)$. For $n = 1, 2, 3$, $s_1 : s_2 : s_3 = 1 : 3 : 5$ (Galileo\'s Law of Odd Numbers).',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q3',
    sectionId: 'physics',
    questionNumber: 3,
    type: 'SINGLE_CORRECT',
    promptLatex: 'An object has the acceleration versus time ($a-t$) graph shown. When does the object return to its initial velocity?',
    imageUrl: createKinematicsSvg(`
      <line x1="40" y1="80" x2="320" y2="80" stroke="#71717a" stroke-width="1.5"/>
      <line x1="60" y1="20" x2="60" y2="140" stroke="#71717a" stroke-width="1.5"/>
      <text x="50" y="25" fill="#ef4444" font-weight="bold">a (m/s²)</text>
      <text x="325" y="85" fill="#a1a1aa">t (s)</text>
      <line x1="60" y1="40" x2="160" y2="40" stroke="#22c55e" stroke-width="3"/>
      <line x1="160" y1="40" x2="160" y2="120" stroke="#71717a" stroke-dasharray="3,3"/>
      <line x1="160" y1="120" x2="300" y2="120" stroke="#3b82f6" stroke-width="3"/>
      <text x="45" y="44" fill="#22c55e">+2</text>
      <text x="45" y="84" fill="#a1a1aa">0</text>
      <text x="45" y="124" fill="#3b82f6">-2</text>
      <text x="155" y="95" fill="#a1a1aa">4</text>
      <text x="225" y="95" fill="#a1a1aa">7</text>
      <text x="295" y="95" fill="#a1a1aa">8</text>
    `),
    options: [
      { id: 'A', labelLatex: 'At $t = 4\\text{ s}$' },
      { id: 'B', labelLatex: 'At $t = 7\\text{ s}$' },
      { id: 'C', labelLatex: 'At $t = 8\\text{ s}$' },
      { id: 'D', labelLatex: 'Impossible to determine from the given information' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Change in velocity is equal to the area under the $a-t$ curve: $\\Delta v = \\int a\\,dt$. Positive area from $0$ to $4\\text{ s}$ is balanced when the negative area equals it. According to the graph data, the net area becomes zero at $t = 7\\text{ s}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q4',
    sectionId: 'physics',
    questionNumber: 4,
    type: 'SINGLE_CORRECT',
    promptLatex: 'For the same object with the acceleration versus time graph shown in the previous question, when is the object at rest?',
    options: [
      { id: 'A', labelLatex: 'At $t = 0\\text{ s}$' },
      { id: 'B', labelLatex: 'At $t = 4\\text{ s}$' },
      { id: 'C', labelLatex: 'Between $t = 4\\text{ s}$ and $t = 8\\text{ s}$' },
      { id: 'D', labelLatex: 'Impossible to determine from the given information' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'The acceleration-time curve only specifies the changes in velocity $(\\Delta v = v(t) - v_0)$. Since the initial velocity $v_0$ is unknown, the instantaneous velocity $v(t) = v_0 + \\Delta v$ cannot be determined, making it impossible to know when the object is at rest.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q5',
    sectionId: 'physics',
    questionNumber: 5,
    type: 'SINGLE_CORRECT',
    promptLatex: 'At $t = 0$, a projectile is fired from a point $O$ (taken as origin) on the ground with a speed of $50\\text{ m/s}$ at an angle of $53^\\circ$ with the horizontal. It just passes two points $A$ and $B$, each at a height of $75\\text{ m}$ above the horizontal. The horizontal separation between the points $A$ and $B$ is:',
    imageUrl: createKinematicsSvg(`
      <line x1="30" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="2"/>
      <path d="M 40 130 Q 180 10 320 130" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <line x1="40" y1="130" x2="70" y2="90" stroke="#22c55e" stroke-width="2"/>
      <text x="30" y="145" fill="#a1a1aa">O (0,0)</text>
      <text x="45" y="115" fill="#22c55e">53°</text>
      <text x="75" y="85" fill="#22c55e">50 m/s</text>
      <line x1="80" y1="85" x2="280" y2="85" stroke="#ef4444" stroke-dasharray="4,4"/>
      <circle cx="100" cy="85" r="4" fill="#3b82f6"/>
      <text x="95" y="75" fill="#3b82f6" font-weight="bold">A</text>
      <circle cx="260" cy="85" r="4" fill="#3b82f6"/>
      <text x="255" y="75" fill="#3b82f6" font-weight="bold">B</text>
      <line x1="300" y1="130" x2="300" y2="85" stroke="#a1a1aa" stroke-width="1.5"/>
      <text x="305" y="110" fill="#a1a1aa">75 m</text>
    `),
    options: [
      { id: 'A', labelLatex: '$30\\text{ m}$' },
      { id: 'B', labelLatex: '$60\\text{ m}$' },
      { id: 'C', labelLatex: '$90\\text{ m}$' },
      { id: 'D', labelLatex: 'None' },
    ],
    correctAnswer: 'B',
    explanationLatex: '$u_x = 50\\cos 53^\\circ = 30\\text{ m/s}$, $u_y = 50\\sin 53^\\circ = 40\\text{ m/s}$. The vertical equation: $75 = 40t - 5t^2 \\implies t^2 - 8t + 15 = 0 \\implies (t-3)(t-5) = 0$. Thus $t_A = 3\\text{ s}$ and $t_B = 5\\text{ s}$. The horizontal separation $\\Delta x = u_x (t_B - t_A) = 30 \\times (5-3) = 60\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q6',
    sectionId: 'physics',
    questionNumber: 6,
    type: 'SINGLE_CORRECT',
    promptLatex: 'For the projectile in the previous question, the distance (in metres) of the particle from the origin at $t = 2\\text{ sec}$ is:',
    options: [
      { id: 'A', labelLatex: '$60\\sqrt{2}$' },
      { id: 'B', labelLatex: '$100$' },
      { id: 'C', labelLatex: '$60$' },
      { id: 'D', labelLatex: '$120$' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'At $t = 2\\text{ s}$: $x = u_x t = 30 \\times 2 = 60\\text{ m}$. $y = u_y t - \\frac{1}{2}g t^2 = 40(2) - 5(4) = 80 - 20 = 60\\text{ m}$. Distance from origin $r = \\sqrt{x^2 + y^2} = \\sqrt{60^2 + 60^2} = 60\\sqrt{2}\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q7',
    sectionId: 'physics',
    questionNumber: 7,
    type: 'SINGLE_CORRECT',
    promptLatex: 'The acceleration versus velocity graph of a particle moving in a straight line starting from rest is shown. The corresponding velocity-time ($v-t$) graph would be:',
    imageUrl: createKinematicsSvg(`
      <line x1="60" y1="130" x2="280" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="60" y1="20" x2="60" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <text x="50" y="25" fill="#ef4444" font-weight="bold">a</text>
      <text x="285" y="135" fill="#a1a1aa">v</text>
      <line x1="60" y1="35" x2="220" y2="130" stroke="#3b82f6" stroke-width="3"/>
      <circle cx="60" cy="35" r="3" fill="#ef4444"/>
      <circle cx="220" cy="130" r="3" fill="#3b82f6"/>
    `),
    options: [
      { id: 'A', labelLatex: 'Line rising then completely horizontal flat' },
      { id: 'B', labelLatex: 'Concave upward parabolic curve' },
      { id: 'C', labelLatex: 'Wave-like oscillatory curve' },
      { id: 'D', labelLatex: 'Concave downward curve flattening asymptotically to a horizontal limit' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'From the given $a-v$ line: $a = a_0 - kv$. Since $a = \\frac{dv}{dt}$, we have $\\frac{dv}{dt} = a_0 - kv \\implies v(t) = \\frac{a_0}{k}\\left(1 - e^{-kt}\\right)$. The slope $\\frac{dv}{dt}$ is initially maximum and decreases continuously to zero, which is a concave downward curve asymptotic to $v = \\frac{a_0}{k}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q8',
    sectionId: 'physics',
    questionNumber: 8,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A particle is projected from a horizontal plane ($x-z$ plane) such that its velocity vector at time $t$ is given by $\\vec{V} = a\\hat{i} + (b - ct)\\hat{j}$. Its range on the horizontal plane is given by:',
    options: [
      { id: 'A', labelLatex: '$\\frac{ba}{c}$' },
      { id: 'B', labelLatex: '$\\frac{2ba}{c}$' },
      { id: 'C', labelLatex: '$\\frac{3ba}{c}$' },
      { id: 'D', labelLatex: 'None' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Here $v_y = b - ct$. The vertical displacement $y = bt - \\frac{1}{2}ct^2$. Landing occurs when $y = 0 \\implies t\\left(b - \\frac{1}{2}ct\\right) = 0 \\implies T = \\frac{2b}{c}$. Horizontal velocity $v_x = a$ is constant. Range $R = v_x T = a \\times \\frac{2b}{c} = \\frac{2ba}{c}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q9',
    sectionId: 'physics',
    questionNumber: 9,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A projectile is fired with a speed $u$ at an angle $\\theta$ with the horizontal. Its speed when its direction of motion makes an angle $\\alpha$ with the horizontal is:',
    options: [
      { id: 'A', labelLatex: '$u \\sec \\theta \\cos \\alpha$' },
      { id: 'B', labelLatex: '$u \\sec \\theta \\sin \\alpha$' },
      { id: 'C', labelLatex: '$u \\cos \\theta \\sec \\alpha$' },
      { id: 'D', labelLatex: '$u \\sin \\theta \\sec \\alpha$' },
    ],
    correctAnswer: 'C',
    explanationLatex: 'Horizontal velocity remains constant throughout projectile motion: $v_x = u\\cos\\theta$. When the velocity makes angle $\\alpha$ with horizontal, $v\\cos\\alpha = u\\cos\\theta \\implies v = u\\cos\\theta\\sec\\alpha$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q10',
    sectionId: 'physics',
    questionNumber: 10,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Two projectiles $A$ and $B$ are thrown with the same speed such that $A$ makes angle $\\theta$ with the horizontal and $B$ makes angle $\\theta$ with the vertical. Then:',
    options: [
      { id: 'A', labelLatex: 'Both must have same time of flight' },
      { id: 'B', labelLatex: 'Both must achieve same maximum height' },
      { id: 'C', labelLatex: '$A$ must have more horizontal range than $B$' },
      { id: 'D', labelLatex: 'Both may have same time of flight' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Angle of $B$ with horizontal is $90^\\circ - \\theta$. The ranges are equal because $\\sin 2\\theta = \\sin 2(90^\\circ - \\theta)$. The time of flight of $A$ is $T_A = \\frac{2u\\sin\\theta}{g}$ and $T_B = \\frac{2u\\cos\\theta}{g}$. If $\\theta = 45^\\circ$, then $\\sin\\theta = \\cos\\theta$, so both may have the same time of flight.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q11',
    sectionId: 'physics',
    questionNumber: 11,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Suppose a player hits several baseballs. Which baseball will be in the air for the longest time?',
    options: [
      { id: 'A', labelLatex: 'The one with the farthest range.' },
      { id: 'B', labelLatex: 'The one which reaches maximum height.' },
      { id: 'C', labelLatex: 'The one with the greatest initial velocity.' },
      { id: 'D', labelLatex: 'The one leaving the bat at $45^\\circ$ with respect to the ground.' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Time of flight $T = \\frac{2u_y}{g} = 2\\sqrt{\\frac{2H}{g}} = \\sqrt{\\frac{8H}{g}}$. Therefore, time of flight depends exclusively on the maximum vertical height $H$ reached.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q12',
    sectionId: 'physics',
    questionNumber: 12,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Time taken by the projectile projected from $P$ with a velocity $v$ perpendicular to the incline of angle $\\theta$ to reach $Q$ is $t$. Then the length $PQ$ along the incline equals:',
    imageUrl: createKinematicsSvg(`
      <line x1="40" y1="130" x2="300" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="40" y1="130" x2="260" y2="30" stroke="#a1a1aa" stroke-width="2"/>
      <text x="80" y="125" fill="#a1a1aa">θ</text>
      <circle cx="210" cy="53" r="4" fill="#ef4444"/>
      <text x="215" y="48" fill="#ef4444" font-weight="bold">P</text>
      <circle cx="120" cy="94" r="4" fill="#3b82f6"/>
      <text x="110" y="85" fill="#3b82f6" font-weight="bold">Q</text>
      <line x1="210" y1="53" x2="235" y2="20" stroke="#22c55e" stroke-width="2"/>
      <text x="240" y="25" fill="#22c55e">v</text>
      <path d="M 210 53 Q 180 30 120 94" fill="none" stroke="#f59e0b" stroke-dasharray="3,3" stroke-width="1.5"/>
    `),
    options: [
      { id: 'A', labelLatex: '$t v \\cos \\theta$' },
      { id: 'B', labelLatex: '$t v \\sin \\theta$' },
      { id: 'C', labelLatex: '$t v \\sec \\theta$' },
      { id: 'D', labelLatex: '$t v \\tan \\theta$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Along the inclined plane and perpendicular to it: $u_\\perp = v$, $a_\\perp = -g\\cos\\theta$. Time of flight $t = \\frac{2v}{g\\cos\\theta}$. The acceleration down the plane is $g\\sin\\theta$. Distance $PQ = \\frac{1}{2}(g\\sin\\theta)t^2 = \\frac{1}{2}g\\sin\\theta \\cdot t \\cdot \\frac{2v}{g\\cos\\theta} = t v \\tan\\theta$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q13',
    sectionId: 'physics',
    questionNumber: 13,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A boat having a speed of $5\\text{ km/hr}$ in still water crosses a river of width $1\\text{ km}$ along the shortest possible path in $15\\text{ minutes}$. The speed of the river in $\\text{km/hr}$ is:',
    options: [
      { id: 'A', labelLatex: '$1$' },
      { id: 'B', labelLatex: '$3$' },
      { id: 'C', labelLatex: '$4$' },
      { id: 'D', labelLatex: '$\\sqrt{41}$' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Shortest path means straight across with zero drift. Net speed across $v_{\\text{net}} = \\frac{d}{t} = \\frac{1\\text{ km}}{15/60\\text{ hr}} = 4\\text{ km/hr}$. Since $v_{\\text{net}} = \\sqrt{v_b^2 - v_r^2}$, we have $4 = \\sqrt{5^2 - v_r^2} \\implies 16 = 25 - v_r^2 \\implies v_r = 3\\text{ km/hr}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q14',
    sectionId: 'physics',
    questionNumber: 14,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A flag is mounted on a car moving due North with a velocity of $20\\text{ km/hr}$. Strong winds are blowing due East with a velocity of $20\\text{ km/hr}$. The flag will point in the direction:',
    options: [
      { id: 'A', labelLatex: 'East' },
      { id: 'B', labelLatex: 'North - East' },
      { id: 'C', labelLatex: 'South - East' },
      { id: 'D', labelLatex: 'South - West' },
    ],
    correctAnswer: 'C',
    explanationLatex: 'The flag flutters in the direction of the wind relative to the car: $\\vec{v}_{w/c} = \\vec{v}_w - \\vec{v}_c = 20\\hat{i} - 20\\hat{j}$. Here $+x$ is East and $+y$ is North, so $\\hat{i} - \\hat{j}$ points South-East.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q15',
    sectionId: 'physics',
    questionNumber: 15,
    type: 'SINGLE_CORRECT',
    promptLatex: 'If a boat can travel with a speed of $v$ in still water, which of the following trips will take the least amount of time?',
    options: [
      { id: 'A', labelLatex: 'Traveling a distance of $2d$ in still water' },
      { id: 'B', labelLatex: 'Traveling a distance of $2d$ across (perpendicular to) the current w.r.t. a stream' },
      { id: 'C', labelLatex: 'Traveling a distance $d$ downstream and returning a distance $d$ upstream' },
      { id: 'D', labelLatex: 'Traveling a distance $d$ upstream and returning a distance $d$ downstream' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'In still water, $t_A = \\frac{2d}{v}$. Across the stream with current $u$: $t_B = \\frac{2d}{\\sqrt{v^2-u^2}} > \\frac{2d}{v}$. Upstream + downstream: $t_C = t_D = \\frac{d}{v+u} + \\frac{d}{v-u} = \\frac{2dv}{v^2-u^2} > \\frac{2d}{v}$. Therefore, still water requires the least time.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q16',
    sectionId: 'physics',
    questionNumber: 16,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Two identical balls are released simultaneously from equal heights $h$. Ball $A$ is thrown horizontally with velocity $v$ and ball $B$ is just dropped from rest. Choose the alternative that best represents the motion of $A$ and $B$ with respect to an observer who moves with velocity $v/2$ to the right with respect to the ground.',
    imageUrl: createKinematicsSvg(`
      <line x1="30" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="2"/>
      <line x1="80" y1="30" x2="80" y2="130" stroke="#52525b" stroke-dasharray="2,2"/>
      <circle cx="80" cy="30" r="5" fill="#ef4444"/>
      <text x="75" y="20" fill="#ef4444" font-weight="bold">A (v →)</text>
      <circle cx="240" cy="30" r="5" fill="#3b82f6"/>
      <text x="235" y="20" fill="#3b82f6" font-weight="bold">B (↓)</text>
      <circle cx="160" cy="90" r="8" fill="#10b981"/>
      <line x1="160" y1="98" x2="160" y2="130" stroke="#10b981" stroke-width="2"/>
      <text x="140" y="80" fill="#10b981">Observer (v/2 →)</text>
    `),
    options: [
      { id: 'A', labelLatex: 'Both curve towards the right' },
      { id: 'B', labelLatex: 'Both drop vertically straight down' },
      { id: 'C', labelLatex: '$A$ curves to the right while $B$ curves to the left symmetrically' },
      { id: 'D', labelLatex: '$A$ drops straight down while $B$ curves to the left' },
    ],
    correctAnswer: 'C',
    explanationLatex: 'Relative to observer moving at $+v/2$: $v_{Ax, \\text{rel}} = v - v/2 = +v/2$ (curves to the right). $v_{Bx, \\text{rel}} = 0 - v/2 = -v/2$ (curves to the left). Both fall with the same vertical acceleration $g$, producing mirror-image parabolic curves.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q17',
    sectionId: 'physics',
    questionNumber: 17,
    type: 'MULTIPLE_CORRECT',
    promptLatex: 'A particle moves with constant speed $v$ along a regular hexagon $ABCDEF$ in the same order. Then the magnitude of the average velocity for its motion from $A$ to:',
    options: [
      { id: 'A', labelLatex: '$F$ is $v/5$' },
      { id: 'B', labelLatex: '$D$ is $v/3$' },
      { id: 'C', labelLatex: '$C$ is $v\\sqrt{3}/2$' },
      { id: 'D', labelLatex: '$B$ is $v$' },
    ],
    correctAnswer: 'A,C,D',
    explanationLatex: 'Let side of hexagon be $a$. Motion $A \\to F$: path length $5a$, time $5a/v$. Displacement $= |\\vec{AF}| = a$. $v_{\\text{avg}} = a/(5a/v) = v/5$ (A is correct). $A \\to D$: path length $3a$, displacement $= 2a$. $v_{\\text{avg}} = 2a/(3a/v) = 2v/3$ (B is false). $A \\to C$: path length $2a$, displacement $= a\\sqrt{3}$. $v_{\\text{avg}} = a\\sqrt{3}/(2a/v) = v\\sqrt{3}/2$ (C is correct). $A \\to B$: displacement $a$, time $a/v \\implies v_{\\text{avg}} = v$ (D is correct).',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q18',
    sectionId: 'physics',
    questionNumber: 18,
    type: 'MULTIPLE_CORRECT',
    promptLatex: 'An observer moves with a constant speed along the line joining two stationary objects. He will observe that the two objects:',
    options: [
      { id: 'A', labelLatex: 'have the same speed' },
      { id: 'B', labelLatex: 'have the same velocity' },
      { id: 'C', labelLatex: 'move in the same direction' },
      { id: 'D', labelLatex: 'move in opposite directions' },
    ],
    correctAnswer: 'A,B,C',
    explanationLatex: 'Let the observer\'s velocity be $\\vec{v}_0$. For both stationary objects $\\vec{v} = 0$, their velocities relative to the observer are $\\vec{v}_{\\text{rel}} = 0 - \\vec{v}_0 = -\\vec{v}_0$. Hence both have the same speed, same velocity vector, and move in the same direction.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q19',
    sectionId: 'physics',
    questionNumber: 19,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A particle is projected from the ground with velocity $u$ at angle $\\theta$ with horizontal. The horizontal range, maximum height and time of flight are $R, H$ and $T$ respectively: $R = \\frac{u^2 \\sin 2\\theta}{g}$, $H = \\frac{u^2 \\sin^2 \\theta}{2g}$, $T = \\frac{2u \\sin \\theta}{g}$. Now keeping $u$ fixed, $\\theta$ is varied from $30^\\circ$ to $60^\\circ$. Then:',
    options: [
      { id: 'A', labelLatex: '$R$ will first increase then decrease, $H$ will increase and $T$ will decrease' },
      { id: 'B', labelLatex: '$R$ will first increase then decrease while $H$ and $T$ both will increase' },
      { id: 'C', labelLatex: '$R$ will decrease while $H$ and $T$ will increase' },
      { id: 'D', labelLatex: '$R$ will increase while $H$ and $T$ will increase' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'As $\\theta$ increases from $30^\\circ$ to $60^\\circ$: $2\\theta$ goes from $60^\\circ$ to $120^\\circ$, passing $90^\\circ$ where $\\sin 2\\theta = 1$, so $R$ first increases to maximum at $45^\\circ$ then decreases. Both $\\sin\\theta$ and $\\sin^2\\theta$ strictly increase from $30^\\circ$ to $60^\\circ$, so $H$ and $T$ both strictly increase.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q20',
    sectionId: 'physics',
    questionNumber: 20,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Trajectories are shown in the figure for three kicked footballs. Initial vertical and horizontal velocity components are $u_y$ and $u_x$ respectively. All three attain the same maximum height. Match Column-I with Column-II:\\nColumn-I: (A) Time of flight, (B) $u_y / u_x$, (C) $u_x$, (D) $u_x u_y$\\nColumn-II: (P) greatest for A only, (Q) greatest for C only, (R) equal for A, B, and C, (S) equal for B and C',
    imageUrl: createKinematicsSvg(`
      <line x1="30" y1="130" x2="330" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <path d="M 40 130 Q 80 15 120 130" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <text x="80" y="25" fill="#ef4444" font-weight="bold">A</text>
      <path d="M 40 130 Q 120 15 200 130" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="120" y="25" fill="#f59e0b" font-weight="bold">B</text>
      <path d="M 40 130 Q 170 15 300 130" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="170" y="25" fill="#3b82f6" font-weight="bold">C</text>
    `),
    options: [
      { id: 'A', labelLatex: 'A – R ; B – P ; C – Q ; D – Q' },
      { id: 'B', labelLatex: 'A – P ; B – Q ; C – R ; D – S' },
      { id: 'C', labelLatex: 'A – R ; B – Q ; C – P ; D – S' },
      { id: 'D', labelLatex: 'A – Q ; B – P ; C – R ; D – P' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'Same maximum height means identical vertical component: $u_y = \\sqrt{2gH}$ is equal for all three. Hence time of flight $T = 2u_y/g$ is equal for all three (A-R). Range $R = u_x T$ is greatest for $C$, so $u_x$ is greatest for $C$ (C-Q). Ratio $u_y/u_x$ is greatest for smallest $u_x$, which is $A$ (B-P). Product $u_x u_y$ is proportional to $u_x$, so greatest for $C$ (D-Q).',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q21',
    sectionId: 'physics',
    questionNumber: 21,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A man starting from the bank of a river wants to cross the river. Let $\\vec{v}_{m\\omega}$ be velocity of man relative to water, $\\vec{v}_\\omega$ velocity of water, $\\vec{v}_m$ velocity of man relative to ground, and $\\theta$ the angle between $\\vec{v}_{m\\omega}$ and the normal to river flow. Match conditions for minimum drift and crossing time:\\n(A) If $v_{m\\omega} > v_\\omega$, for drift along river to be minimum\\n(B) If $v_{m\\omega} > v_\\omega$, for time to cross river to be minimum\\n(C) If $v_{m\\omega} < v_\\omega$, for drift along river to be minimum\\n(D) If $v_{m\\omega} < v_\\omega$, for time to cross river to be minimum',
    options: [
      { id: 'A', labelLatex: 'A – (Q,S); B – R; C – P; D – R' },
      { id: 'B', labelLatex: 'A – P; B – Q; C – R; D – S' },
      { id: 'C', labelLatex: 'A – R; B – P; C – Q; D – S' },
      { id: 'D', labelLatex: 'A – S; B – P; C – R; D – Q' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'When $v_{m\\omega} > v_\\omega$: drift can be zero by aiming upstream such that $\\sin\\theta = v_\\omega / v_{m\\omega}$ and $\\vec{v}_m \\cdot \\vec{v}_\\omega = 0$ (perpendicular to bank). Minimum time is always achieved by swimming directly across ($\\theta = 0$, so $\\vec{v}_{m\\omega} \\cdot \\vec{v}_\\omega = 0$). When $v_{m\\omega} < v_\\omega$: minimum drift occurs when $\\sin\\theta = v_{m\\omega} / v_\\omega$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },

  // --- EXERCISE-II: Q22 to Q32 ---
  {
    id: 'kin-p1-q22',
    sectionId: 'physics',
    questionNumber: 22,
    type: 'NUMERICAL',
    promptLatex: 'A car traveling at a constant speed of $10\\text{ m/s}$ on a straight road passes a point (origin) at time $t = 0$, and $5\\text{ s}$ later another car passes the same point travelling at $20\\text{ m/s}$ in the same direction. Find the time $t$ (in seconds from $t=0$) when the second car overtakes the first.',
    correctAnswer: '10',
    explanationLatex: 'Position of first car: $x_1 = 10t$. Position of second car for $t \\ge 5\\text{ s}$: $x_2 = 20(t - 5)$. At overtaking: $10t = 20(t - 5) \\implies 10t = 20t - 100 \\implies 10t = 100 \\implies t = 10\\text{ s}$. The distance travelled is $100\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q23',
    sectionId: 'physics',
    questionNumber: 23,
    type: 'NUMERICAL',
    promptLatex: 'A particle goes from $A$ to $B$ with a speed of $40\\text{ km/h}$ and $B$ to $C$ with a speed of $60\\text{ km/h}$. If $AB = 6BC$, the average speed in $\\text{km/h}$ between $A$ and $C$ is:',
    correctAnswer: '42',
    explanationLatex: 'Let $BC = d$, then $AB = 6d$ and total distance $s = 7d$. Time $t = \\frac{6d}{40} + \\frac{d}{60} = d\\left(\\frac{3}{20} + \\frac{1}{60}\\right) = d\\left(\\frac{9+1}{60}\\right) = \\frac{10d}{60} = \\frac{d}{6}$. Average speed $v_{\\text{avg}} = \\frac{7d}{d/6} = 42\\text{ km/h}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q24',
    sectionId: 'physics',
    questionNumber: 24,
    type: 'NUMERICAL',
    promptLatex: 'A train moves from one station to another rectilinearly in two hours. Its velocity increases linearly from 0 to $20\\text{ km/h}$ in $0.25\\text{ h}$, remains constant at $20\\text{ km/h}$ until $0.75\\text{ h}$, accelerates linearly to $60\\text{ km/h}$ at $1.00\\text{ h}$, and decelerates linearly to rest at $2.00\\text{ h}$. Calculate the maximum acceleration during the journey (in $\\text{km/hr}^2$).',
    correctAnswer: '160',
    explanationLatex: 'Accelerations in intervals: (1) $0$ to $0.25\\text{ h}$: $a_1 = \\frac{20 - 0}{0.25} = 80\\text{ km/h}^2$. (2) $0.75$ to $1.00\\text{ h}$: $a_2 = \\frac{60 - 20}{0.25} = 160\\text{ km/h}^2$. (3) $1.00$ to $2.00\\text{ h}$: deceleration $= \\frac{0 - 60}{1.00} = -60\\text{ km/h}^2$. Maximum acceleration $= 160\\text{ km/h}^2$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q25',
    sectionId: 'physics',
    questionNumber: 25,
    type: 'NUMERICAL',
    promptLatex: 'A particle is projected horizontally from the top of an incline making $37^\\circ$ with the horizontal. At the same time, a flat trolley is released from a point $27\\text{ m}$ down the incline which goes down without friction starting from rest. If the particle lands in the trolley, find the speed (in $\\text{m/s}$) with which the particle was projected. (Take $g = 10\\text{ m/s}^2$)',
    correctAnswer: '15',
    explanationLatex: 'Trolley acceleration down incline: $a_T = g\\sin 37^\\circ = 6\\text{ m/s}^2$. Distance along incline of landing: $s_T = 27 + \\frac{1}{2}(6)t^2 = 27 + 3t^2$. Particle coordinates: $x = ut$, $y = \\frac{1}{2}gt^2 = 5t^2$. Since it lands on incline: $x = s_T \\cos 37^\\circ$, $y = s_T \\sin 37^\\circ$. $5t^2 = (27 + 3t^2)(3/5) \\implies 25t^2 = 81 + 9t^2 \\implies 16t^2 = 81 \\implies t = 9/4 = 2.25\\text{ s}$. Then $u t = (27 + 3(81/16))(4/5) \\implies u = 15\\text{ m/s}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q26',
    sectionId: 'physics',
    questionNumber: 26,
    type: 'NUMERICAL',
    promptLatex: 'A particle is projected upwards with a velocity of $100\\text{ m/s}$ at an angle of $60^\\circ$ with the vertical. Find the time (in seconds) when the particle will move perpendicular to its initial direction. (Take $g = 10\\text{ m/s}^2$)',
    correctAnswer: '20',
    explanationLatex: 'Angle with horizontal $\\theta = 90^\\circ - 60^\\circ = 30^\\circ$. The condition for velocity $\\vec{v}$ to be perpendicular to initial velocity $\\vec{u}$ is $\\vec{u} \\cdot \\vec{v} = 0 \\implies t = \\frac{u}{g\\sin\\theta} = \\frac{100}{10 \\times \\sin 30^\\circ} = \\frac{10}{0.5} = 20\\text{ s}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q27',
    sectionId: 'physics',
    questionNumber: 27,
    type: 'NUMERICAL',
    promptLatex: 'Find the range (in metres) of a projectile on an inclined plane of inclination $37^\\circ$, which is projected perpendicular to the inclined plane with velocity $20\\text{ m/s}$. (Take $g = 10\\text{ m/s}^2$)',
    correctAnswer: '75',
    explanationLatex: 'Coordinates along and perpendicular to incline: $u_\\perp = 20\\text{ m/s}$, $a_\\perp = -g\\cos 37^\\circ = -8\\text{ m/s}^2$. Time of flight $T = \\frac{2 u_\\perp}{|a_\\perp|} = \\frac{2 \\times 20}{8} = 5\\text{ s}$. Acceleration along incline $a_\\parallel = g\\sin 37^\\circ = 6\\text{ m/s}^2$. Initial velocity along incline $u_\\parallel = 0$. Range $R = \\frac{1}{2} a_\\parallel T^2 = \\frac{1}{2} \\times 6 \\times 5^2 = 75\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q28',
    sectionId: 'physics',
    questionNumber: 28,
    type: 'NUMERICAL',
    promptLatex: 'A ball is thrown horizontally from a cliff such that it strikes the ground after $5\\text{ sec}$. The line of sight from the point of projection to the point of hitting makes an angle of $37^\\circ$ with the horizontal. What is the initial velocity of projection (in $\\text{m/s}$)? (Take $g = 10\\text{ m/s}^2$)',
    correctAnswer: '33.33',
    explanationLatex: 'Height of cliff $h = \\frac{1}{2}gt^2 = \\frac{1}{2}(10)(5^2) = 125\\text{ m}$. Horizontal distance $x = ut = 5u$. Line of sight angle $\\tan 37^\\circ = \\frac{h}{x} = \\frac{3}{4} \\implies \\frac{125}{5u} = \\frac{3}{4} \\implies \\frac{25}{u} = \\frac{3}{4} \\implies u = \\frac{100}{3} \\approx 33.33\\text{ m/s}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q29',
    sectionId: 'physics',
    questionNumber: 29,
    type: 'NUMERICAL',
    promptLatex: 'A row-boat is observed travelling downstream on a flowing river at a speed of $8\\text{ m/s}$ with respect to the shore. A motor-boat comes from the opposite direction at a speed of $10\\text{ m/s}$ with respect to the water. $10\\text{ seconds}$ after meeting each other, they are at $160\\text{ metres}$ apart. What is the speed of the river flow (in $\\text{m/s}$)?',
    correctAnswer: '2',
    explanationLatex: 'Let river speed be $v_r$ and row-boat still-water speed be $v_b$. Downstream speed of row-boat: $v_b + v_r = 8\\text{ m/s}$. Motor-boat moves upstream with relative speed $10\\text{ m/s}$ w.r.t water, so its speed relative to water is $10\\text{ m/s}$, and row-boat relative to water is $v_b$. Their relative separation speed in water is $v_b + 10$. In $10\\text{ s}$, separation $= (v_b + 10) \\times 10 = 160 \\implies v_b + 10 = 16 \\implies v_b = 6\\text{ m/s}$. Hence river flow speed $v_r = 8 - 6 = 2\\text{ m/s}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q30',
    sectionId: 'physics',
    questionNumber: 30,
    type: 'NUMERICAL',
    promptLatex: 'A man crosses a river in a boat. If he crosses the river in minimum time he takes $10\\text{ minutes}$ with a drift of $120\\text{ m}$. If he crosses the river taking the shortest path, he takes $12.5\\text{ minutes}$. Find the width of the river (in metres).',
    correctAnswer: '200',
    explanationLatex: 'Minimum time: $t_1 = \\frac{d}{v_b} = 10\\text{ min} \\implies d = 10 v_b$. Drift $= v_r t_1 = 120\\text{ m} \\implies v_r = 12\\text{ m/min}$. Shortest path: $t_2 = \\frac{d}{\\sqrt{v_b^2 - v_r^2}} = 12.5\\text{ min}$. $\\frac{t_1}{t_2} = \\frac{\\sqrt{v_b^2 - v_r^2}}{v_b} = \\frac{10}{12.5} = \\frac{4}{5} \\implies 1 - \\frac{v_r^2}{v_b^2} = \\frac{16}{25} \\implies \\frac{v_r}{v_b} = \\frac{3}{5}$. Since $v_r = 12\\text{ m/min}$, $v_b = 20\\text{ m/min}$. River width $d = 10 \\times 20 = 200\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q31',
    sectionId: 'physics',
    questionNumber: 31,
    type: 'NUMERICAL',
    promptLatex: 'A man swims at $5\\text{ km/hr}$ with respect to a river. He wants to cross a canal $120\\text{ m}$ wide, so that his velocity with respect to ground is perpendicular to the water flow. If the canal flows at $4\\text{ km/hr}$, how long will he take to cross the canal (in seconds)?',
    correctAnswer: '144',
    explanationLatex: 'To move perpendicularly, the upstream component must cancel river flow: $v_{m\\omega} \\sin \\theta = v_r \\implies 5\\sin\\theta = 4 \\implies \\sin\\theta = 4/5$, so $\\theta = 53^\\circ$ upstream of normal (angle with flow $= 90^\\circ + 53^\\circ = 143^\\circ$). Net crossing speed across canal: $v_{\\text{net}} = \\sqrt{5^2 - 4^2} = 3\\text{ km/hr} = 3 \\times \\frac{5}{18} = \\frac{5}{6}\\text{ m/s}$. Time taken $t = \\frac{120}{5/6} = 144\\text{ seconds}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q32',
    sectionId: 'physics',
    questionNumber: 32,
    type: 'NUMERICAL',
    promptLatex: 'A rocket is launched at an angle $53^\\circ$ to the horizontal with an initial speed of $100\\text{ m/s}$. It moves along its initial line of motion with an acceleration of $30\\text{ m/s}^2$ for $3\\text{ seconds}$, after which its engine shuts down and it proceeds under gravity ($g = 10\\text{ m/s}^2$). Find the maximum altitude reached by the rocket (in metres, rounded to nearest integer).',
    correctAnswer: '1503',
    explanationLatex: 'At engine shutdown ($t = 3\\text{ s}$): velocity $v_1 = 100 + 30(3) = 190\\text{ m/s}$ along $53^\\circ$. Distance travelled along line: $s_1 = 100(3) + \\frac{1}{2}(30)(9) = 300 + 135 = 435\\text{ m}$. Height at cutoff $h_1 = 435 \\sin 53^\\circ = 435 \\times 0.8 = 348\\text{ m}$. Vertical velocity $v_{1y} = 190 \\sin 53^\\circ = 152\\text{ m/s}$. Free flight height gain $\\Delta h = \\frac{v_{1y}^2}{2g} = \\frac{152^2}{20} = \\frac{23104}{20} = 1155.2\\text{ m}$. Maximum altitude $H = 348 + 1155.2 = 1503.2\\text{ m} \\approx 1503\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },

  // --- EXERCISE-III: Q33 to Q50 (PYQ Collection) ---
  {
    id: 'kin-p1-q33',
    sectionId: 'physics',
    questionNumber: 33,
    type: 'MULTIPLE_CORRECT',
    promptLatex: 'Starting at time $t = 0$ from the origin with speed $1\\text{ m/s}$, a particle follows a two-dimensional trajectory in the $x-y$ plane so that its coordinates are related by the equation $y = \\frac{x^2}{2}$. The $x$ and $y$ components of its acceleration are denoted by $\\alpha_x$ and $\\alpha_y$, respectively. Then: [IIT Advanced 2020]',
    options: [
      { id: 'A', labelLatex: '$\\alpha_x = 1\\text{ ms}^{-2}$ implies that when the particle is at the origin, $\\alpha_y = 1\\text{ ms}^{-2}$' },
      { id: 'B', labelLatex: '$\\alpha_x = 0$ implies $\\alpha_y = 1\\text{ ms}^{-2}$ at all times' },
      { id: 'C', labelLatex: 'At $t = 0$, the particle\'s velocity points in the $x$-direction' },
      { id: 'D', labelLatex: '$\\alpha_x = 0$ implies that at $t = 1\\text{ s}$, the angle between the particle\'s velocity and the $x$ axis is $45^\\circ$' },
    ],
    correctAnswer: 'A,B,C,D',
    explanationLatex: '$y = x^2/2 \\implies \\dot{y} = x\\dot{x}$, $\\ddot{y} = \\dot{x}^2 + x\\ddot{x}$. At $(0,0)$, $\\dot{y} = 0$, so velocity is entirely along $x$, giving $v_x(0) = 1\\text{ m/s}$ (C is correct). At origin, $\\ddot{y} = \\dot{x}^2 + 0 = 1^2 = 1\\text{ m/s}^2$ regardless of $\\ddot{x}$ (A is correct). If $\\ddot{x} = 0$, $\\dot{x} = 1\\text{ m/s}$ constant, so $\\ddot{y} = 1^2 + 0 = 1\\text{ m/s}^2$ at all times (B is correct). At $t = 1\\text{ s}$, $x = 1$, $\\dot{y} = 1(1) = 1\\text{ m/s}$, so $\\tan\\theta = v_y/v_x = 1/1 = 1 \\implies \\theta = 45^\\circ$ (D is correct).',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q34',
    sectionId: 'physics',
    questionNumber: 34,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Water drops are falling from a nozzle of a shower onto the floor, from a height of $9.8\\text{ m}$. The drops fall at a regular interval of time. When the first drop strikes the floor, at that instant, the third drop begins to fall. Locate the position of the second drop from the floor when the first drop strikes the floor. [JEE MAIN ONLINE-2021]',
    options: [
      { id: 'A', labelLatex: '$4\\text{ m}$' },
      { id: 'B', labelLatex: '$2.45\\text{ m}$' },
      { id: 'C', labelLatex: '$2.94\\text{ m}$' },
      { id: 'D', labelLatex: '$7.35\\text{ m}$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Time for 1st drop to strike: $H = \\frac{1}{2}g T^2 \\implies 9.8 = \\frac{1}{2}(9.8)T^2 \\implies T = \\sqrt{2}\\text{ s}$. The time interval between drops is $\\Delta t = T/2$. In time $\\Delta t$, the 2nd drop has fallen for $T/2$: $y_2 = \\frac{1}{2}g(T/2)^2 = \\frac{H}{4} = \\frac{9.8}{4} = 2.45\\text{ m}$ from the top. Height from the floor $= 9.8 - 2.45 = 7.35\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q35',
    sectionId: 'physics',
    questionNumber: 35,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A player kicks a football with an initial speed of $25\\text{ ms}^{-1}$ at an angle of $45^\\circ$ from the ground. What are the maximum height and the time taken by the football to reach at the highest point during motion? (Take $g = 10\\text{ ms}^{-2}$) [JEE MAIN ONLINE-2021]',
    options: [
      { id: 'A', labelLatex: '$h_{\\max} = 15.625\\text{ m},\\; T = 3.54\\text{ s}$' },
      { id: 'B', labelLatex: '$h_{\\max} = 10\\text{ m},\\; T = 2.5\\text{ s}$' },
      { id: 'C', labelLatex: '$h_{\\max} = 15.625\\text{ m},\\; T = 1.77\\text{ s}$' },
      { id: 'D', labelLatex: '$h_{\\max} = 3.54\\text{ m},\\; T = 0.125\\text{ s}$' },
    ],
    correctAnswer: 'C',
    explanationLatex: '$u_y = 25\\sin 45^\\circ = \\frac{25}{\\sqrt{2}}\\text{ m/s}$. $h_{\\max} = \\frac{u_y^2}{2g} = \\frac{625/2}{20} = \\frac{625}{40} = 15.625\\text{ m}$. Time to apex $t = \\frac{u_y}{g} = \\frac{25}{10\\sqrt{2}} = \\frac{2.5}{1.414} \\approx 1.77\\text{ s}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q36',
    sectionId: 'physics',
    questionNumber: 36,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A helicopter is flying horizontally with a speed $v$ at an altitude $h$. It has to drop a food packet for a man on the ground. What is the distance of the helicopter from the man when the food packet is dropped? [JEE MAIN ONLINE-2021]',
    options: [
      { id: 'A', labelLatex: '$\\sqrt{\\frac{2gh}{v^2} + h^2}$' },
      { id: 'B', labelLatex: '$\\sqrt{\\frac{2v^2 h}{g} + h^2}$' },
      { id: 'C', labelLatex: '$\\sqrt{2ghv^2 + h^2}$' },
      { id: 'D', labelLatex: '$\\sqrt{\\frac{2ghv^2+1}{h^2}}$' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Time to hit ground $t = \\sqrt{\\frac{2h}{g}}$. Horizontal distance traversed by packet $x = v t = v\\sqrt{\\frac{2h}{g}}$. The initial direct distance of the helicopter from the man is $D = \\sqrt{x^2 + h^2} = \\sqrt{v^2 \\frac{2h}{g} + h^2} = \\sqrt{\\frac{2v^2 h}{g} + h^2}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q37',
    sectionId: 'physics',
    questionNumber: 37,
    type: 'SINGLE_CORRECT',
    promptLatex: 'The ranges and heights for two projectiles projected with the same initial velocity at angles $42^\\circ$ and $48^\\circ$ with the horizontal are $R_1, R_2$ and $H_1, H_2$ respectively. Choose the correct option: [JEE MAIN ONLINE-2021]',
    options: [
      { id: 'A', labelLatex: '$R_1 > R_2$ and $H_1 = H_2$' },
      { id: 'B', labelLatex: '$R_1 < R_2$ and $H_1 < H_2$' },
      { id: 'C', labelLatex: '$R_1 = R_2$ and $H_1 = H_2$' },
      { id: 'D', labelLatex: '$R_1 = R_2$ and $H_1 < H_2$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Angles $42^\\circ$ and $48^\\circ$ are complementary $(\\theta_1 + \\theta_2 = 90^\\circ)$, so their ranges are identical: $R_1 = R_2$. Maximum height $H = \\frac{u^2 \\sin^2 \\theta}{2g}$. Since $\\sin 42^\\circ < \\sin 48^\\circ$, we have $H_1 < H_2$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q38',
    sectionId: 'physics',
    questionNumber: 38,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A bomb is dropped by a fighter plane flying horizontally. To an observer sitting in the plane, the trajectory of the bomb is: [JEE MAIN ONLINE-2021]',
    options: [
      { id: 'A', labelLatex: 'A parabola in the direction of motion of plane' },
      { id: 'B', labelLatex: 'A parabola in a direction opposite to the motion of plane' },
      { id: 'C', labelLatex: 'A hyperbola' },
      { id: 'D', labelLatex: 'A straight line vertically down the plane' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Both the airplane and the bomb maintain the exact same horizontal velocity component $v_x = v$. Relative to the pilot, horizontal relative velocity and acceleration are zero, so the bomb falls straight vertically downwards.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q39',
    sectionId: 'physics',
    questionNumber: 39,
    type: 'NUMERICAL',
    promptLatex: 'Two spherical balls having equal masses with radius of $5\\text{ cm}$ each are thrown upwards along the same vertical direction at an interval of $3\\text{ s}$ with the same initial velocity of $35\\text{ m/s}$. Then these balls collide at a height of _____ $\\text{m}$. (take $g = 10\\text{ m/s}^2$) [JEE MAIN ONLINE-2021]',
    correctAnswer: '50.00',
    explanationLatex: 'Let 1st ball travel for time $t$. Position $y_1 = 35t - 5t^2$. 2nd ball travels for time $t-3$: $y_2 = 35(t-3) - 5(t-3)^2$. Equating $y_1 = y_2$: $35(3) - 5[t^2 - (t-3)^2] = 0 \\implies 105 - 5(6t - 9) = 0 \\implies 105 = 30t - 45 \\implies 30t = 150 \\implies t = 5\\text{ s}$. Collision height $y = 35(5) - 5(25) = 175 - 125 = 50.00\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q40',
    sectionId: 'physics',
    questionNumber: 40,
    type: 'NUMERICAL',
    promptLatex: 'A particle is moving with constant acceleration $a$. The graph shows $v^2$ versus $x$ (displacement) plot. The acceleration of the particle is _____ $\\text{m/s}^2$.',
    imageUrl: createKinematicsSvg(`
      <line x1="50" y1="130" x2="290" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <line x1="50" y1="20" x2="50" y2="130" stroke="#71717a" stroke-width="1.5"/>
      <text x="35" y="25" fill="#ef4444" font-weight="bold">v² (m/s)²</text>
      <text x="295" y="135" fill="#a1a1aa">x (m)</text>
      <line x1="50" y1="105" x2="250" y2="25" stroke="#22c55e" stroke-width="3"/>
      <text x="30" y="108" fill="#a1a1aa">20</text>
      <text x="30" y="70" fill="#a1a1aa">40</text>
      <text x="30" y="30" fill="#a1a1aa">60</text>
      <line x1="150" y1="130" x2="150" y2="65" stroke="#71717a" stroke-dasharray="3,3"/>
      <text x="145" y="145" fill="#a1a1aa">20</text>
      <line x1="50" y1="65" x2="150" y2="65" stroke="#71717a" stroke-dasharray="3,3"/>
    `),
    correctAnswer: '1.00',
    explanationLatex: 'From third equation of motion: $v^2 = u^2 + 2ax$. Comparing with straight line equation $Y = mX + C$: slope $m = 2a$. From graph, when $x = 0$, $v^2 = 20$; when $x = 20\\text{ m}$, $v^2 = 60$. Slope $= \\frac{60 - 20}{20} = \\frac{40}{20} = 2$. Therefore $2a = 2 \\implies a = 1.00\\text{ m/s}^2$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q41',
    sectionId: 'physics',
    questionNumber: 41,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A juggler throws balls vertically upwards with same initial velocity in air. When the first ball reaches its highest position, he throws the next ball. Assuming the juggler throws $n$ balls per second, the maximum height the balls can reach is: [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$\\frac{g}{2n}$' },
      { id: 'B', labelLatex: '$\\frac{g}{n}$' },
      { id: 'C', labelLatex: '$2gn$' },
      { id: 'D', labelLatex: '$\\frac{g}{2n^2}$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Time interval between successive throws is $\\Delta t = 1/n$. Time to reach highest position $t = u/g$. Thus $u/g = 1/n \\implies u = g/n$. Maximum height $H = \\frac{u^2}{2g} = \\frac{(g/n)^2}{2g} = \\frac{g^2}{2g n^2} = \\frac{g}{2n^2}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q42',
    sectionId: 'physics',
    questionNumber: 42,
    type: 'SINGLE_CORRECT',
    promptLatex: 'An NCC parade is going at a uniform speed of $9\\text{ km/h}$ under a mango tree on which a monkey is sitting at a height of $19.6\\text{ m}$. At any particular instant, the monkey drops a mango. A cadet will receive the mango whose distance from the tree at time of drop is: (Given $g = 9.8\\text{ m/s}^2$) [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$5\\text{ m}$' },
      { id: 'B', labelLatex: '$10\\text{ m}$' },
      { id: 'C', labelLatex: '$19.8\\text{ m}$' },
      { id: 'D', labelLatex: '$24.5\\text{ m}$' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'Time for mango to reach ground: $h = \\frac{1}{2}gt^2 \\implies 19.6 = \\frac{1}{2}(9.8)t^2 \\implies t^2 = 4 \\implies t = 2\\text{ s}$. Speed of cadet $= 9\\text{ km/h} = 9 \\times \\frac{5}{18} = 2.5\\text{ m/s}$. Distance travelled by cadet in $2\\text{ s}$ is $d = 2.5 \\times 2 = 5\\text{ m}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q43',
    sectionId: 'physics',
    questionNumber: 43,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A ball is released from a height $h$. If $t_1$ and $t_2$ be the time required to complete the first half and second half of the distance respectively, then choose the correct relation between $t_1$ and $t_2$: [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$t_1 = (\\sqrt{2})t_2$' },
      { id: 'B', labelLatex: '$t_1 = (\\sqrt{2} - 1)t_2$' },
      { id: 'C', labelLatex: '$t_2 = (\\sqrt{2} + 1)t_1$' },
      { id: 'D', labelLatex: '$t_2 = (\\sqrt{2} - 1)t_1$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Time for first half: $h/2 = \\frac{1}{2}g t_1^2 \\implies t_1 = \\sqrt{\\frac{h}{g}}$. Total time for full distance: $h = \\frac{1}{2}g(t_1 + t_2)^2 \\implies t_1 + t_2 = \\sqrt{\\frac{2h}{g}} = \\sqrt{2} t_1$. Therefore $t_2 = (\\sqrt{2} - 1)t_1$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q44',
    sectionId: 'physics',
    questionNumber: 44,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A bullet is shot vertically downwards with an initial velocity of $100\\text{ m/s}$ from a certain height. Within $10\\text{ s}$, the bullet reaches the ground and instantaneously comes to rest due to a perfectly inelastic collision. The velocity-time curve for total time $t = 20\\text{ s}$ will be: (Take $g = 10\\text{ m/s}^2$) [JEE MAIN ONLINE-2022]',
    imageUrl: createKinematicsSvg(`
      <line x1="40" y1="40" x2="300" y2="40" stroke="#71717a" stroke-width="1.5"/>
      <line x1="40" y1="20" x2="40" y2="140" stroke="#71717a" stroke-width="1.5"/>
      <text x="30" y="25" fill="#ef4444" font-weight="bold">v</text>
      <text x="305" y="45" fill="#a1a1aa">t</text>
      <line x1="40" y1="70" x2="160" y2="120" stroke="#3b82f6" stroke-width="2.5"/>
      <line x1="160" y1="120" x2="160" y2="40" stroke="#ef4444" stroke-dasharray="2,2"/>
      <line x1="160" y1="40" x2="280" y2="40" stroke="#22c55e" stroke-width="3"/>
      <text x="150" y="30" fill="#a1a1aa">10s</text>
      <text x="270" y="30" fill="#a1a1aa">20s</text>
      <text x="5" y="75" fill="#3b82f6">-100</text>
      <text x="5" y="125" fill="#3b82f6">-200</text>
    `),
    options: [
      { id: 'A', labelLatex: 'Starts at $-100\\text{ m/s}$, linearly reaches $-200\\text{ m/s}$ at $10\\text{ s}$, jumps to $0$ and remains $0$ up to $20\\text{ s}$' },
      { id: 'B', labelLatex: 'Starts at $+100\\text{ m/s}$, descends to $-200\\text{ m/s}$' },
      { id: 'C', labelLatex: 'Triangular wave between $+100$ and $-100$' },
      { id: 'D', labelLatex: 'Parabolic curve from $-100$ to $0$' },
    ],
    correctAnswer: 'A',
    explanationLatex: 'Taking downward as negative: $v(0) = -100\\text{ m/s}$. Under gravity $a = -g = -10\\text{ m/s}^2$, $v(10) = -100 - 10(10) = -200\\text{ m/s}$. Upon perfectly inelastic collision at $10\\text{ s}$, velocity drops abruptly to zero and remains zero from $10\\text{ s}$ to $20\\text{ s}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q45',
    sectionId: 'physics',
    questionNumber: 45,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A ball is projected from the ground with a speed $15\\text{ ms}^{-1}$ at an angle $\\theta$ with horizontal so that its range and maximum height are equal, then $\\tan\\theta$ will be equal to: [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$1/4$' },
      { id: 'B', labelLatex: '$1/2$' },
      { id: 'C', labelLatex: '$2$' },
      { id: 'D', labelLatex: '$4$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'For any projectile: $R = 4H\\cot\\theta \\implies \\frac{R}{H} = \\frac{4}{\\tan\\theta}$. Given $R = H \\implies 1 = \\frac{4}{\\tan\\theta} \\implies \\tan\\theta = 4$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q46',
    sectionId: 'physics',
    questionNumber: 46,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A body of mass $10\\text{ kg}$ is projected at an angle of $45^\\circ$ with the horizontal. The trajectory of the body is observed to pass through a point $(20, 10)$. If $T$ is the time of flight, then its momentum vector at time $t = \\frac{T}{\\sqrt{2}}$ is: [Take $g = 10\\text{ m/s}^2$] [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$100\\hat{i} + (100\\sqrt{2} - 200)\\hat{j}$' },
      { id: 'B', labelLatex: '$100\\sqrt{2}\\hat{i} + (100 - 200\\sqrt{2})\\hat{j}$' },
      { id: 'C', labelLatex: '$100\\hat{i} + (100 - 200\\sqrt{2})\\hat{j}$' },
      { id: 'D', labelLatex: '$100\\sqrt{2}\\hat{i} + (100\\sqrt{2} - 200)\\hat{j}$' },
    ],
    correctAnswer: 'D',
    explanationLatex: 'Trajectory equation: $y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta} \\implies 10 = 20(1) - \\frac{10(400)}{2u^2(1/2)} \\implies 10 = 20 - \\frac{4000}{u^2} \\implies \\frac{4000}{u^2} = 10 \\implies u = 20\\text{ m/s}$. Time of flight $T = \\frac{2u\\sin 45^\\circ}{g} = \\frac{40(1/\\sqrt{2})}{10} = 2\\sqrt{2}\\text{ s}$. At $t = T/\\sqrt{2} = 2\\text{ s}$: $v_x = 20\\cos 45^\\circ = 10\\sqrt{2}\\text{ m/s}$. $v_y = 20\\sin 45^\\circ - 10(2) = 10\\sqrt{2} - 20\\text{ m/s}$. Momentum $\\vec{p} = m\\vec{v} = 10(10\\sqrt{2}\\hat{i} + (10\\sqrt{2}-20)\\hat{j}) = 100\\sqrt{2}\\hat{i} + (100\\sqrt{2}-200)\\hat{j}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q47',
    sectionId: 'physics',
    questionNumber: 47,
    type: 'SINGLE_CORRECT',
    promptLatex: 'Two projectiles are thrown with the same initial velocity making angles of $45^\\circ$ and $30^\\circ$ with the horizontal respectively. The ratio of their respective ranges will be: [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: '$1 : \\sqrt{2}$' },
      { id: 'B', labelLatex: '$\\sqrt{2} : 1$' },
      { id: 'C', labelLatex: '$2 : \\sqrt{3}$' },
      { id: 'D', labelLatex: '$\\sqrt{3} : 2$' },
    ],
    correctAnswer: 'C',
    explanationLatex: 'Horizontal range $R = \\frac{u^2 \\sin 2\\theta}{g}$. The ratio $\\frac{R_1}{R_2} = \\frac{\\sin(2 \\times 45^\\circ)}{\\sin(2 \\times 30^\\circ)} = \\frac{\\sin 90^\\circ}{\\sin 60^\\circ} = \\frac{1}{\\sqrt{3}/2} = \\frac{2}{\\sqrt{3}} = 2 : \\sqrt{3}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q48',
    sectionId: 'physics',
    questionNumber: 48,
    type: 'SINGLE_CORRECT',
    promptLatex: 'A ball is projected with kinetic energy $E$, at an angle of $60^\\circ$ to the horizontal. The kinetic energy of this ball at the highest point of its flight will become: [JEE MAIN ONLINE-2022]',
    options: [
      { id: 'A', labelLatex: 'Zero' },
      { id: 'B', labelLatex: '$E/2$' },
      { id: 'C', labelLatex: '$E/4$' },
      { id: 'D', labelLatex: '$E$' },
    ],
    correctAnswer: 'C',
    explanationLatex: 'At the highest point, vertical velocity is zero and horizontal velocity is $u\\cos 60^\\circ = u/2$. Kinetic energy at top $E\' = \\frac{1}{2}m(u/2)^2 = \\frac{1}{4}\\left(\\frac{1}{2}mu^2\\right) = \\frac{E}{4}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'kin-p1-q49',
    sectionId: 'physics',
    questionNumber: 49,
    type: 'NUMERICAL',
    promptLatex: 'A projectile is fired from horizontal ground with speed $v$ and projection angle $\\theta$. When the acceleration due to gravity is $g$, the range of the projectile is $d$. If at the highest point in its trajectory, the projectile enters a different region where the effective acceleration due to gravity is $g\' = \\frac{g}{0.81}$, then the new range is $d\' = nd$. The value of $n$ is _____. [IIT Advanced 2022]',
    correctAnswer: '0.95',
    explanationLatex: 'The first half of the trajectory up to the highest point takes place under gravity $g$, covering horizontal distance $d_1 = d/2$. For the second half, the projectile starts from height $H = \\frac{v^2 \\sin^2 \\theta}{2g}$ with horizontal speed $v_x = v\\cos\\theta$ and falls under $g\'$: time to fall $t_2 = \\sqrt{\\frac{2H}{g\'}} = \\sqrt{\\frac{2}{g\'} \\frac{v^2 \\sin^2 \\theta}{2g}} = \\frac{v\\sin\\theta}{\\sqrt{g g\'}} = \\frac{v\\sin\\theta}{g} \\sqrt{\\frac{g}{g\'}} = t_1 \\sqrt{0.81} = 0.9 t_1$. Horizontal distance in second half $d_2 = v_x t_2 = 0.9 d_1 = 0.9(d/2) = 0.45 d$. Total range $d\' = d_1 + d_2 = 0.5 d + 0.45 d = 0.95 d \\implies n = 0.95$.',
    positiveMarks: 4,
    negativeMarks: 0,
  },
  {
    id: 'kin-p1-q50',
    sectionId: 'physics',
    questionNumber: 50,
    type: 'SINGLE_CORRECT',
    promptLatex: 'At any instant the velocity of a particle of mass $500\\text{ g}$ is $(2t\\hat{i} + 3t^2\\hat{j})\\text{ ms}^{-1}$. If the force acting on the particle at $t = 1\\text{ s}$ is $(\\hat{i} + x\\hat{j})\\text{ N}$, then the value of $x$ will be: [JEE MAIN ONLINE-2023]',
    options: [
      { id: 'A', labelLatex: '$6$' },
      { id: 'B', labelLatex: '$3$' },
      { id: 'C', labelLatex: '$4$' },
      { id: 'D', labelLatex: '$2$' },
    ],
    correctAnswer: 'B',
    explanationLatex: 'Acceleration $\\vec{a} = \\frac{d\\vec{v}}{dt} = 2\\hat{i} + 6t\\hat{j}$. At $t = 1\\text{ s}$, $\\vec{a} = 2\\hat{i} + 6\\hat{j}\\text{ m/s}^2$. Mass $m = 0.5\\text{ kg}$. Force $\\vec{F} = m\\vec{a} = 0.5(2\\hat{i} + 6\\hat{j}) = \\hat{i} + 3\\hat{j}\\text{ N}$. Comparing with $\\hat{i} + x\\hat{j}$, we find $x = 3$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
];
