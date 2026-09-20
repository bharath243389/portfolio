// Central place for every piece of real portfolio content. Every section in
// App.jsx imports from here instead of hardcoding copy — edit a value once
// and it updates everywhere it's used.
//
// Anything still wrapped in [BRACKETS] is a clearly-marked placeholder that
// has not been supplied yet — replace it with the real value when you have
// it. Nothing in this file is invented; unsupplied fields are left as
// placeholders rather than guessed.

export const portfolio = {
  name: 'Bharath A',
  role: 'AI/ML Engineer',
  location: 'Thoothukudi, Tamil Nadu, India',
  bio: 'AI/ML engineer from Thoothukudi, currently pursuing a BCA. I build things from scratch — from a from-the-ground-up LLM inference engine for Qwen2.5-0.5B to real-time computer vision apps like MeowCam.',

  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Shri Nehru Maha Vidyalaya',
    status: 'Currently pursuing',
  },

  email: 'bharathgm24@gmail.com',
  github: 'https://github.com/bharath243389',
  linkedin: 'https://www.linkedin.com/in/bharath243389',
  resumeUrl: 'https://drive.google.com/file/d/1OgisFt775PfAuA3Wp0e7phTWLCE1rSou/view?usp=drivesdk',

  experience: [
    {
      company: 'Meesho',
      role: 'Pickup Associate (Part-time)',
      dates: '2025 — 2026',
      description: 'Working under a seller partner, handling order scanning and packaging.',
    },
  ],

  projects: [
    {
      number: 1,
      title: 'Qwen LLM Inference Engine',
      description: 'A transformer inference engine built from scratch for Qwen2.5-0.5B-Instruct — no PyTorch, Transformers, or llama.cpp. Includes a hand-written safetensors parser, a custom BPE tokenizer with zero non-stdlib dependencies, a forward pass verified against HuggingFace Transformers (max diff 0.000045), KV caching, sampling, and quantization — all in pure NumPy.',
      technologies: ['Python', 'NumPy', 'FastAPI', 'Docker'],
      impact: '[ADD IMPACT / RESULT]',
      github: 'https://github.com/bharath243389/qwen-interface-engine',
      live: null,
      image: 'gear5.png',
    },
    {
      number: 2,
      title: 'MeowCam',
      description: 'A real-time AI webcam app that detects face and hand gestures via MediaPipe and reacts with matching meme-cat animations. Split-screen UI, Google login via Firebase, image saving, native sharing, comments section.',
      technologies: ['React', 'TypeScript', 'Vite', 'MediaPipe', 'Firebase'],
      impact: '[ADD IMPACT / RESULT]',
      github: 'https://github.com/bharath243389/meowcam-live',
      live: 'https://meowcam-live.vercel.app/',
      image: 'wanted.jpg',
    },
    {
      number: 3,
      title: 'Radha Krishna Drawing Animation',
      description: 'A React app that takes an uploaded image and renders it as a hand-drawing animation, redrawing the image stroke by stroke.',
      technologies: ['React'],
      impact: '[ADD IMPACT / RESULT]',
      github: 'https://github.com/bharath243389/Radha-krishna-drawing-animation',
      live: null,
      image: 'luffy-style.png',
    },
  ],

  skills: [
    { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
    { category: 'AI/ML', items: ['LLM inference from scratch (tokenization, forward pass, KV caching, sampling, quantization)', 'NumPy'] },
    { category: 'Frontend', items: ['React', 'Vite'] },
    { category: 'Backend', items: ['FastAPI'] },
    { category: 'Computer Vision', items: ['MediaPipe'] },
    { category: 'Tools & Platforms', items: ['Git/GitHub', 'Docker', 'Vercel', 'Render', 'Firebase'] },
  ],
}
