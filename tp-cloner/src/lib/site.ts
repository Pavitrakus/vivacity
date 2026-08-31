export const SITE_URL = "https://tryvivacity.com";
export const SITE_NAME = "Vivacity";
export const SITE_EMAIL = "help@tryvivacity.com";
export const SITE_TAGLINE = "Simulation runtime for AI agents.";
export const SITE_DESCRIPTION =
  "Vivacity is a simulation runtime for AI agents. One interface to instantiate a world, inspect state, take actions, fork alternatives, route each branch to the right simulator or world model, verify outcomes, and render observations.";

export const site = {
  name: SITE_NAME,
  email: SITE_EMAIL,
  url: SITE_URL,
  tagline: SITE_TAGLINE,
};

export const SITE_KEYWORDS = [
  "Vivacity",
  "simulation runtime",
  "AI agents",
  "world state",
  "fork simulate verify",
  "agent infrastructure",
  "execution layer",
] as const;

export const VERBS = [
  {
    name: "create",
    blurb: "Compile a spec into a domain schema and a live world.",
  },
  {
    name: "observe",
    blurb: "Read state, or a view of it. Pixels are optional.",
  },
  {
    name: "act",
    blurb: "Apply an action to the current world. The next state is computed, not guessed.",
  },
  {
    name: "simulate",
    blurb: "Step a horizon on a chosen backend. Cheap when exact. Honest when learned.",
  },
  {
    name: "fork",
    blurb: "Open addressable alternatives without destroying the parent.",
  },
  {
    name: "rollback",
    blurb: "Return to a prior world. Memory is a feature of the runtime.",
  },
  {
    name: "verify",
    blurb: "Numerical checks: conservation, clearance, units, constraints.",
  },
  {
    name: "commit",
    blurb: "Promote a branch that passed. The live world moves.",
  },
  {
    name: "render",
    blurb: "Produce an observation. Never a substitute for state.",
  },
  {
    name: "route",
    blurb: "Send the step to physics, a solver, a robot sim, or a world model.",
  },
] as const;

export const BACKENDS = [
  {
    name: "Exact physics",
    note: "Conserved quantities. Orbits, rigid bodies, circuits — where the law is known.",
  },
  {
    name: "Scientific solvers",
    note: "Domain codes that already exist. Chemistry, fluids, materials, finite elements.",
  },
  {
    name: "Robotics sims",
    note: "Contact, kinematics, sensors. Isaac, MuJoCo, and the rest of that shelf.",
  },
  {
    name: "World models",
    note: "Genie, Cosmos, World Labs, Decart — when the scene is visual and the law is not.",
  },
  {
    name: "Game engines",
    note: "Interactive geometry at interactive rates. Not a physics paper. Still a world.",
  },
  {
    name: "Private backends",
    note: "The plant model, the warehouse, the proprietary solver you will not put on the internet.",
  },
] as const;

export const TEAM = [
  {
    name: "Aditya Bhatia",
    role: "CEO · Systems",
    note: "IIT Kanpur. Cryptography research, CUDA systems, runtime architecture.",
  },
  {
    name: "Tanish Anand",
    role: "CTO · Research",
    note: "IIT Kanpur. Reasoning stacks, discrete diffusion, simulation infrastructure.",
  },
  {
    name: "Pavitra Kushwaha",
    role: "CPO · Pipelines",
    note: "IIT Kanpur. Production systems, pipelines, MPC research.",
  },
] as const;

export const FAQS = [
  {
    q: "What is Vivacity?",
    a: "A simulation runtime for AI agents. create, observe, act, simulate, fork, verify, commit. Domain schemas underneath. Exact simulators and learned world models behind a router.",
  },
  {
    q: "Do you train a world model?",
    a: "No. World Labs, Decart, Genie, Cosmos and domain solvers already exist. Agents will not use one of them for every problem. Vivacity is the state and action layer that routes each execution.",
  },
  {
    q: "How is this different from a code sandbox?",
    a: "A sandbox runs a program. A runtime holds a world: persistent state, actions, forks, and checks. Agents that plan in environments need the second thing.",
  },
  {
    q: "Who is this for?",
    a: "Teams building agents, robotics, scientific tools, and autonomy — anyone whose model needs a world it can act on, fork, and check.",
  },
  {
    q: "Is there self-serve access?",
    a: "Not yet. Book a demo. We take a small number of design-partner conversations.",
  },
] as const;

export const POSITION = [
  {
    they: "World models",
    theyNote: "Generate the next frame. Useful when the scene is visual and the law is unknown.",
    we: "Vivacity holds the world those frames are about.",
  },
  {
    they: "Code sandboxes",
    theyNote: "Execute a program in isolation. Necessary. Not a substitute for environment state.",
    we: "Vivacity is the environment the program is acting on.",
  },
  {
    they: "Game engines",
    theyNote: "Interactive geometry. Excellent backends. Poor as the only contract an agent sees.",
    we: "Vivacity sits in front and routes the step.",
  },
] as const;

export const verbs = VERBS;
export const backends = BACKENDS;
export const team = TEAM;
export const faqs = FAQS;
