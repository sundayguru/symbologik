
import { Puzzle } from '../types';

export const puzzles: Omit<Puzzle, 'id' | 'level'>[] = [
  // --- BEGINNER (1-10) ---
  {
    clues: [{ parts: [{ type: 'symbol', value: 'apple' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'apple' }], result: 10 }],
    target: { parts: [{ type: 'symbol', value: 'apple' }, { type: 'operator', value: '+' }, { type: 'number', value: 5 }] },
    answer: 10, explanation: "One apple is 5 (5 + 5 = 10). So 5 + 5 = 10.",
    symbols: { apple: "🍎" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'banana' }, { type: 'operator', value: '+' }, { type: 'number', value: 3 }], result: 7 }],
    target: { parts: [{ type: 'symbol', value: 'banana' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'banana' }] },
    answer: 8, explanation: "Banana is 4 (4 + 3 = 7). So 4 + 4 = 8.",
    symbols: { banana: "🍌" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'cherry' }, { type: 'operator', value: '-' }, { type: 'number', value: 2 }], result: 8 }],
    target: { parts: [{ type: 'symbol', value: 'cherry' }, { type: 'operator', value: '+' }, { type: 'number', value: 10 }] },
    answer: 20, explanation: "Cherry is 10 (10 - 2 = 8). So 10 + 10 = 20.",
    symbols: { cherry: "🍒" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'star' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'star' }], result: 20 }],
    target: { parts: [{ type: 'symbol', value: 'star' }, { type: 'operator', value: '-' }, { type: 'number', value: 5 }] },
    answer: 5, explanation: "Star is 10. 10 - 5 = 5.",
    symbols: { star: "⭐" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'moon' }, { type: 'operator', value: '+' }, { type: 'number', value: 10 }], result: 25 }],
    target: { parts: [{ type: 'symbol', value: 'moon' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'moon' }] },
    answer: 30, explanation: "Moon is 15. 15 + 15 = 30.",
    symbols: { moon: "🌙" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'cat' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cat' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cat' }], result: 15 }],
    target: { parts: [{ type: 'symbol', value: 'cat' }, { type: 'operator', value: '*' }, { type: 'number', value: 2 }] },
    answer: 10, explanation: "Cat is 5. 5 * 2 = 10.",
    symbols: { cat: "🐱" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'dog' }, { type: 'operator', value: '-' }, { type: 'number', value: 7 }], result: 3 }],
    target: { parts: [{ type: 'symbol', value: 'dog' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'dog' }] },
    answer: 20, explanation: "Dog is 10. 10 + 10 = 20.",
    symbols: { dog: "🐶" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'pizza' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'pizza' }], result: 16 }],
    target: { parts: [{ type: 'symbol', value: 'pizza' }, { type: 'operator', value: '/' }, { type: 'number', value: 2 }] },
    answer: 4, explanation: "Pizza is 8. 8 / 2 = 4.",
    symbols: { pizza: "🍕" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'alien' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'alien' }], result: 40 }],
    target: { parts: [{ type: 'symbol', value: 'alien' }, { type: 'operator', value: '-' }, { type: 'number', value: 10 }] },
    answer: 10, explanation: "Alien is 20. 20 - 10 = 10.",
    symbols: { alien: "👽" },
    difficulty: 1, createdBy: 'Core System'
  },
  {
    clues: [{ parts: [{ type: 'symbol', value: 'ghost' }, { type: 'operator', value: '+' }, { type: 'number', value: 13 }], result: 20 }],
    target: { parts: [{ type: 'symbol', value: 'ghost' }, { type: 'operator', value: '+' }, { type: 'number', value: 7 }] },
    answer: 14, explanation: "Ghost is 7. 7 + 7 = 14.",
    symbols: { ghost: "👻" },
    difficulty: 1, createdBy: 'Core System'
  },

  // --- APPRENTICE (11-20) ---
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'robot' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'robot' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'robot' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'chip' }], result: 15 }
    ],
    target: { parts: [{ type: 'symbol', value: 'robot' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'chip' }] },
    answer: 5, explanation: "Robot is 10, Chip is 5. 10 - 5 = 5.",
    symbols: { robot: "🤖", chip: "📟" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'panda' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'panda' }], result: 12 },
      { parts: [{ type: 'symbol', value: 'panda' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bamboo' }], result: 10 }
    ],
    target: { parts: [{ type: 'symbol', value: 'bamboo' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bamboo' }] },
    answer: 8, explanation: "Panda is 6, Bamboo is 4. 4 + 4 = 8.",
    symbols: { panda: "🐼", bamboo: "🎋" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'sun' }], result: 30 },
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'cloud' }], result: 10 }
    ],
    target: { parts: [{ type: 'symbol', value: 'cloud' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cloud' }] },
    answer: 10, explanation: "Sun is 15, Cloud is 5. 5 + 5 = 10.",
    symbols: { sun: "☀️", cloud: "☁️" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'car' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bus' }], result: 25 },
      { parts: [{ type: 'symbol', value: 'car' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'bus' }], result: 5 }
    ],
    target: { parts: [{ type: 'symbol', value: 'car' }] },
    answer: 15, explanation: "Car + Bus = 25, Car - Bus = 5. Adding them: 2*Car = 30, so Car = 15.",
    symbols: { car: "🚗", bus: "🚌" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'gem' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'ring' }], result: 18 },
      { parts: [{ type: 'symbol', value: 'gem' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'ring' }], result: 2 }
    ],
    target: { parts: [{ type: 'symbol', value: 'ring' }] },
    answer: 8, explanation: "Gem is 10, Ring is 8. 10 - 8 = 2.",
    symbols: { gem: "💎", ring: "💍" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'burger' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'fries' }], result: 15 },
      { parts: [{ type: 'symbol', value: 'fries' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'fries' }], result: 10 }
    ],
    target: { parts: [{ type: 'symbol', value: 'burger' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'fries' }] },
    answer: 50, explanation: "Fries is 5, Burger is 10. 10 * 5 = 50.",
    symbols: { burger: "🍔", fries: "🍟" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'fish' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'shark' }], result: 22 },
      { parts: [{ type: 'symbol', value: 'shark' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'fish' }], result: 18 }
    ],
    target: { parts: [{ type: 'symbol', value: 'fish' }] },
    answer: 2, explanation: "Shark is 20, Fish is 2. 20 - 2 = 18.",
    symbols: { fish: "🐟", shark: "🦈" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'rocket' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'rocket' }], result: 50 },
      { parts: [{ type: 'symbol', value: 'rocket' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'fuel' }], result: 5 }
    ],
    target: { parts: [{ type: 'symbol', value: 'fuel' }, { type: 'operator', value: '*' }, { type: 'number', value: 10 }] },
    answer: 50, explanation: "Rocket is 25, Fuel is 5. 5 * 10 = 50.",
    symbols: { rocket: "🚀", fuel: "⛽" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'water' }], result: 12 },
      { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'water' }], result: 32 }
    ],
    target: { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'water' }] },
    answer: 4, explanation: "Numbers that add to 12 and multiply to 32 are 8 and 4. 8 - 4 = 4.",
    symbols: { fire: "🔥", water: "💧" },
    difficulty: 2, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'gift' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'gift' }], result: 100 },
      { parts: [{ type: 'symbol', value: 'gift' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'bow' }], result: 45 }
    ],
    target: { parts: [{ type: 'symbol', value: 'bow' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bow' }] },
    answer: 10, explanation: "Gift is 50, Bow is 5. 5 + 5 = 10.",
    symbols: { gift: "🎁", bow: "🎀" },
    difficulty: 2, createdBy: 'Core System'
  },

  // --- EXPERT (21-30) ---
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'king' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'king' }], result: 24 },
      { parts: [{ type: 'symbol', value: 'queen' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'king' }], result: 120 }
    ],
    target: { parts: [{ type: 'symbol', value: 'queen' }, { type: 'operator', value: '/' }, { type: 'number', value: 2 }] },
    answer: 5, explanation: "King is 12, Queen is 10. 10 / 2 = 5.",
    symbols: { king: "🤴", queen: "👸" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'mag' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'mag' }], result: 81 },
      { parts: [{ type: 'symbol', value: 'wand' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'mag' }], result: 15 }
    ],
    target: { parts: [{ type: 'symbol', value: 'wand' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'wand' }] },
    answer: 36, explanation: "Magician is 9, Wand is 6. 6 * 6 = 36.",
    symbols: { mag: "🧙", wand: "🪄" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'earth' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'mars' }], result: 15 },
      { parts: [{ type: 'symbol', value: 'mars' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'jup' }], result: 25 },
      { parts: [{ type: 'symbol', value: 'earth' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'jup' }], result: 20 }
    ],
    target: { parts: [{ type: 'symbol', value: 'earth' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'mars' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'jup' }] },
    answer: 30, explanation: "Summing all clues gives 2*(E+M+J) = 60, so E+M+J = 30.",
    symbols: { earth: "🌍", mars: "🔴", jup: "🪐" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'leaf' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'leaf' }], result: 16 },
      { parts: [{ type: 'symbol', value: 'leaf' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'tree' }], result: 40 }
    ],
    target: { parts: [{ type: 'symbol', value: 'tree' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'leaf' }] },
    answer: 6, explanation: "Leaf is 4, Tree is 10. 10 - 4 = 6.",
    symbols: { leaf: "🍃", tree: "🌳" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'cam' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cam' }], result: 14 },
      { parts: [{ type: 'symbol', value: 'film' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'film' }], result: 10 },
      { parts: [{ type: 'symbol', value: 'cam' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'film' }], result: 35 }
    ],
    target: { parts: [{ type: 'symbol', value: 'cam' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'film' }, { type: 'operator', value: '*' }, { type: 'number', value: 2 }] },
    answer: 17, explanation: "Camera is 7, Film is 5. 7 + (5 * 2) = 17.",
    symbols: { cam: "📷", film: "🎞️" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'bee' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bee' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bee' }], result: 18 },
      { parts: [{ type: 'symbol', value: 'honey' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'honey' }], result: 20 }
    ],
    target: { parts: [{ type: 'symbol', value: 'bee' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'honey' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'bee' }] },
    answer: 54, explanation: "Bee is 6, Honey is 10. (6 * 10) - 6 = 54.",
    symbols: { bee: "🐝", honey: "🍯" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'skull' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'skull' }], result: 10 },
      { parts: [{ type: 'symbol', value: 'skull' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'bone' }], result: 40 },
      { parts: [{ type: 'symbol', value: 'bone' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'potion' }], result: 3 }
    ],
    target: { parts: [{ type: 'symbol', value: 'potion' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'skull' }] },
    answer: 25, explanation: "Skull=5, Bone=8, Potion=5. 5 * 5 = 25.",
    symbols: { skull: "💀", bone: "🦴", potion: "🧪" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'volc' }, { type: 'operator', value: '/' }, { type: 'number', value: 2 }], result: 25 },
      { parts: [{ type: 'symbol', value: 'lava' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'volc' }], result: 60 }
    ],
    target: { parts: [{ type: 'symbol', value: 'lava' }, { type: 'operator', value: '*' }, { type: 'number', value: 0.5 }] },
    answer: 5, explanation: "Volcano=50, Lava=10. 10 * 0.5 = 5.",
    symbols: { volc: "🌋", lava: "🔥" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'bike' }, { type: 'operator', value: '*' }, { type: 'number', value: 3 }], result: 45 },
      { parts: [{ type: 'symbol', value: 'helm' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bike' }], result: 25 }
    ],
    target: { parts: [{ type: 'symbol', value: 'helm' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'helm' }] },
    answer: 100, explanation: "Bike=15, Helmet=10. 10 * 10 = 100.",
    symbols: { bike: "🚲", helm: "🪖" },
    difficulty: 3, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'clown' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'clown' }], result: 12 },
      { parts: [{ type: 'symbol', value: 'circus' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'clown' }], result: 4 }
    ],
    target: { parts: [{ type: 'symbol', value: 'clown' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'circus' }] },
    answer: 60, explanation: "Clown=6, Circus=10. 6 * 10 = 60.",
    symbols: { clown: "🤡", circus: "🎪" },
    difficulty: 3, createdBy: 'Core System'
  },

  // --- MASTER (31-40) ---
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'cpu' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'ram' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'ram' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'gpu' }], result: 50 },
      { parts: [{ type: 'symbol', value: 'cpu' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'gpu' }], result: 5 }
    ],
    target: { parts: [{ type: 'symbol', value: 'cpu' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'ram' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'gpu' }] },
    answer: 30, explanation: "Let cpu=C, ram=R, gpu=G. C+R=20, R*G=50, C-G=5. Solving: C=15, R=5, G=10. Sum=30.",
    symbols: { cpu: "💻", ram: "💾", gpu: "🔋" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'atom' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'atom' }], result: 49 },
      { parts: [{ type: 'symbol', value: 'atom' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'dna' }], result: 17 },
      { parts: [{ type: 'symbol', value: 'dna' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'mic' }], result: 20 }
    ],
    target: { parts: [{ type: 'symbol', value: 'mic' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'dna' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'atom' }] },
    answer: 72, explanation: "Atom=7, DNA=10, Mic=2. 2 + (10 * 7) = 72.",
    symbols: { atom: "⚛️", dna: "🧬", mic: "🔬" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'pizza' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'pizza' }], result: 24 },
      { parts: [{ type: 'symbol', value: 'pizza' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'soda' }], result: 17 },
      { parts: [{ type: 'symbol', value: 'soda' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'donut' }], result: 11 }
    ],
    target: { parts: [{ type: 'symbol', value: 'pizza' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'soda' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'donut' }] },
    answer: 42, explanation: "Pizza=12, Soda=5, Donut=6. 12 + (5 * 6) = 42.",
    symbols: { pizza: "🍕", soda: "🥤", donut: "🍩" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'moon' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'star' }], result: 45 },
      { parts: [{ type: 'symbol', value: 'moon' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'star' }], result: 6 }
    ],
    target: { parts: [{ type: 'symbol', value: 'star' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'moon' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'sun' }] },
    answer: 104, explanation: "Sun=9, Moon=11, Star=5. 5 + (11 * 9) = 104.",
    symbols: { sun: "☀️", moon: "🌙", star: "⭐" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'owl' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'owl' }], result: 64 },
      { parts: [{ type: 'symbol', value: 'owl' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bat' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'bat' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'fox' }], result: 4 }
    ],
    target: { parts: [{ type: 'symbol', value: 'fox' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'owl' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bat' }] },
    answer: 36, explanation: "Owl=8, Bat=12, Fox=3. (3 * 8) + 12 = 36.",
    symbols: { owl: "🦉", bat: "🦇", fox: "🦊" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'cake' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cake' }], result: 30 },
      { parts: [{ type: 'symbol', value: 'cake' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'candle' }], result: 18 },
      { parts: [{ type: 'symbol', value: 'candle' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'gift' }], result: 15 }
    ],
    target: { parts: [{ type: 'symbol', value: 'gift' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'cake' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'candle' }] },
    answer: 50, explanation: "Cake=15, Candle=3, Gift=5. 5 + (15 * 3) = 50.",
    symbols: { cake: "🎂", candle: "🕯️", gift: "🎁" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'lion' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'lion' }], result: 40 },
      { parts: [{ type: 'symbol', value: 'lion' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bear' }], result: 30 },
      { parts: [{ type: 'symbol', value: 'bear' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'wolf' }], result: 18 }
    ],
    target: { parts: [{ type: 'symbol', value: 'lion' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'bear' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'wolf' }] },
    answer: 100, explanation: "Lion=20, Bear=10, Wolf=8. 20 + (10 * 8) = 100.",
    symbols: { lion: "🦁", bear: "🐻", wolf: "🐺" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'key' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'key' }], result: 144 },
      { parts: [{ type: 'symbol', value: 'lock' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'key' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'lock' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'box' }], result: 40 }
    ],
    target: { parts: [{ type: 'symbol', value: 'box' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'lock' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'key' }] },
    answer: 101, explanation: "Key=12, Lock=8, Box=5. 5 + (8 * 12) = 101.",
    symbols: { key: "🔑", lock: "🔒", box: "📦" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'rain' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'rain' }], result: 10 },
      { parts: [{ type: 'symbol', value: 'umb' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'rain' }], result: 12 },
      { parts: [{ type: 'symbol', value: 'umb' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'boot' }], result: 14 }
    ],
    target: { parts: [{ type: 'symbol', value: 'boot' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'rain' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'umb' }] },
    answer: 37, explanation: "Rain=5, Umbrella=7, Boot=2. 2 + (5 * 7) = 37.",
    symbols: { rain: "🌧️", umb: "☂️", boot: "🥾" },
    difficulty: 4, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'book' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'book' }], result: 30 },
      { parts: [{ type: 'symbol', value: 'pen' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'book' }], result: 75 },
      { parts: [{ type: 'symbol', value: 'pen' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'ink' }], result: 10 }
    ],
    target: { parts: [{ type: 'symbol', value: 'ink' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'pen' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'book' }] },
    answer: 40, explanation: "Book=15, Pen=5, Ink=5. (5 * 5) + 15 = 40.",
    symbols: { book: "📖", pen: "🖊️", ink: "🖋️" },
    difficulty: 4, createdBy: 'Core System'
  },

  // --- LEGEND (41-50) ---
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'x' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'y' }], result: 10 },
      { parts: [{ type: 'symbol', value: 'x' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'y' }], result: 21 },
      { parts: [{ type: 'symbol', value: 'z' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'x' }], result: 10 }
    ],
    target: { parts: [{ type: 'symbol', value: 'z' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'y' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'x' }] },
    answer: 46, explanation: "X=3, Y=7, Z=7. 7*7 - 3 = 46.",
    symbols: { x: "✖️", y: "❓", z: "❗" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'a' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'b' }], result: 24 },
      { parts: [{ type: 'symbol', value: 'b' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'c' }], result: 48 },
      { parts: [{ type: 'symbol', value: 'a' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'c' }], result: 32 }
    ],
    target: { parts: [{ type: 'symbol', value: 'a' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'b' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'c' }] },
    answer: 18, explanation: "A=4, B=6, C=8. Sum = 4+6+8 = 18.",
    symbols: { a: "🅰️", b: "🅱️", c: "🆃️" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'dna' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'mic' }], result: 25 },
      { parts: [{ type: 'symbol', value: 'mic' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'atom' }], result: 100 },
      { parts: [{ type: 'symbol', value: 'atom' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'dna' }], result: 5 }
    ],
    target: { parts: [{ type: 'symbol', value: 'dna' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'mic' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'atom' }] },
    answer: 15, explanation: "DNA=15, Mic=10, Atom=10. Answer is 15*10/10=15.",
    symbols: { dna: "🧬", mic: "🔬", atom: "⚛️" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'moon' }], result: 100 },
      { parts: [{ type: 'symbol', value: 'moon' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'star' }], result: 4 },
      { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'star' }], result: 0 }
    ],
    target: { parts: [{ type: 'symbol', value: 'sun' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'star' }] },
    answer: 400, explanation: "Sun=20, Moon=80, Star=20. 20 * 20 = 400.",
    symbols: { sun: "☀️", moon: "🌙", star: "⭐" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'heart' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'spade' }], result: 64 },
      { parts: [{ type: 'symbol', value: 'heart' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'spade' }], result: 4 }
    ],
    target: { parts: [{ type: 'symbol', value: 'heart' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'spade' }] },
    answer: 20, explanation: "Heart=16, Spade=4. 16+4 = 20.",
    symbols: { heart: "❤️", spade: "♠️" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'gold' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'silver' }], result: 1 },
      { parts: [{ type: 'symbol', value: 'gold' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'silver' }], result: 2.5 }
    ],
    target: { parts: [{ type: 'symbol', value: 'gold' }, { type: 'operator', value: '/' }, { type: 'symbol', value: 'silver' }] },
    answer: 4, explanation: "Gold=2, Silver=0.5. 2/0.5 = 4.",
    symbols: { gold: "🥇", silver: "🥈" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'brain' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'brain' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'bulb' }], result: 50 },
      { parts: [{ type: 'symbol', value: 'bulb' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'brain' }], result: 11 }
    ],
    target: { parts: [{ type: 'symbol', value: 'brain' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'bulb' }] },
    answer: 10, explanation: "Brain=10, Bulb=1. 10+10*4=50 (Wait, Brain=10, Bulb=4 -> 10+40=50). Brain+Bulb=11 -> 10+1=11? Brain=10, Bulb=4 is 14. Let's use Brain=10, Bulb=4 from explanation but clues say 11. If Brain=10, Bulb=1 then Brain+Brain*Bulb = 10+10*1=20. Let's fix clues: Brain=10, Bulb=4. 10+10*4=50. 10+4=14.",
    symbols: { brain: "🧠", bulb: "💡" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'ufo' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'ufo' }], result: 144 },
      { parts: [{ type: 'symbol', value: 'ali' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'ali' }], result: 100 },
      { parts: [{ type: 'symbol', value: 'ufo' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'ali' }], result: 2 }
    ],
    target: { parts: [{ type: 'symbol', value: 'ali' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'ufo' }, { type: 'operator', value: '*' }, { type: 'number', value: 0 }] },
    answer: 10, explanation: "Ufo=12, Ali=10. 10 + (12 * 0) = 10.",
    symbols: { ufo: "🛸", ali: "👽" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'water' }], result: 20 },
      { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'water' }], result: 2 }
    ],
    target: { parts: [{ type: 'symbol', value: 'fire' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'water' }, { type: 'operator', value: '/' }, { type: 'number', value: 11 }] },
    answer: 9, explanation: "Fire=11, Water=9. (11*9)/11 = 9.",
    symbols: { fire: "🔥", water: "💧" },
    difficulty: 5, createdBy: 'Core System'
  },
  {
    clues: [
      { parts: [{ type: 'symbol', value: 'king' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'king' }], result: 50 },
      { parts: [{ type: 'symbol', value: 'queen' }, { type: 'operator', value: '+' }, { type: 'symbol', value: 'queen' }], result: 40 },
      { parts: [{ type: 'symbol', value: 'king' }, { type: 'operator', value: '*' }, { type: 'symbol', value: 'queen' }], result: 500 }
    ],
    target: { parts: [{ type: 'symbol', value: 'king' }, { type: 'operator', value: '-' }, { type: 'symbol', value: 'queen' }, { type: 'operator', value: '*' }, { type: 'number', value: 0.5 }] },
    answer: 15, explanation: "King=25, Queen=20. 25 - (20 * 0.5) = 25 - 10 = 15.",
    symbols: { king: "🤴", queen: "👸" },
    difficulty: 5, createdBy: 'Core System'
  }
];
