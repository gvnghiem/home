// All site content lives here — edit this file to update the page.

export const profile = {
  name: 'Gau Nghiem',
  title: 'Customer Success Engineer',
  subtitle: 'Cloud Platform · AI & Data',
  engineerIn: ['Customer Success', 'Cloud Platform', 'Software', 'System', 'Data', 'AI', 'Solution'],
  summary:
    '15+ years of hands-on engineering across cloud platforms, data pipelines, and observability, applied to enterprise client delivery. I build the platform, then make it work for the business, from a cloud gaming platform at Comcast to Fortune 500 implementations at Quantum Metric.',
  github: 'https://github.com/gvnghiem',
  githubUser: 'gvnghiem',
  linkedin: 'https://www.linkedin.com/in/gaunghiem',
  // Assembled at runtime so the address isn't sitting in the HTML for scrapers.
  emailParts: ['gvnghiem', 'gmail.com'] as const,
  resumePdf: 'Gau_Nghiem_Resume.pdf',
}

export const availability = {
  open: true, // flip to false to show "Not currently looking"
  status: 'Open to new opportunities',
  location: 'Remote, or within ~30 miles of Philadelphia, PA',
  roles: [
    'Customer Success / Solutions Engineering',
    'SRE & Application Support (Sr. / Lead / Manager)',
    'Cloud Platform & DevOps Engineering',
  ],
  // Paste a Calendly / Cal.com / Google Calendar booking link to show a "Book a call" button.
  scheduleUrl: '',
}

export const stats = [
  { value: '15+', label: 'Years of hands-on engineering across cloud, data & enterprise platforms' },
  { value: '10M+', label: 'Daily visitors across the enterprise websites I’ve supported, directly and indirectly' },
]

export const projects = [
  {
    name: 'DevPortal',
    desc: 'Browser dev playground: JS, Python, SQL, Terraform, Ansible & more',
    url: 'https://gvnghiem.github.io/DevPortal/',
    img: `${import.meta.env.BASE_URL}projects/devportal.jpg`,
    tags: ['Dev tools', 'WebAssembly'],
  },
  {
    name: 'Texas Hold’em',
    desc: 'No-limit poker with bot AI, side pots and hot-seat multiplayer',
    url: 'https://gvnghiem.github.io/texasholdem/',
    img: 'https://repository-images.githubusercontent.com/1464820860/33089dd7-51c4-46fd-a57c-a5c5cf10ea57',
    pos: '60% center',
    tags: ['JavaScript', 'Game'],
  },
  {
    name: 'Rubiksports',
    desc: 'Playable 2×2, 3×3 & 4×4 Rubik’s cube with timer and solver (Three.js)',
    url: 'https://gvnghiem.github.io/rubiksports/',
    img: 'https://repository-images.githubusercontent.com/1463431994/da25d193-a88b-4ca4-b1c6-288c414502b0', // repo social preview
    tags: ['Three.js', 'Game'],
  },
  {
    name: 'Bot City HQ',
    desc: 'Chief-driven NPC office sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-city/',
    img: 'https://gvnghiem.github.io/bot-city/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Bot Media Industry HQ',
    desc: 'Content studio NPC sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-media-hq/',
    img: 'https://gvnghiem.github.io/bot-media-hq/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Bot Finance HQ',
    desc: '24/7 investment desk NPC sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-finance-hq/',
    img: 'https://gvnghiem.github.io/bot-finance-hq/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Bot Travel HQ',
    desc: 'Real-time travel deal scouting NPC sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-travel-hq/',
    img: 'https://gvnghiem.github.io/bot-travel-hq/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Bot Deal Community HQ',
    desc: '24/7 affiliate deal sharing NPC sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-deals-hq/',
    img: 'https://gvnghiem.github.io/bot-deals-hq/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Bot University HQ',
    desc: 'Live-teaching studio NPC sim (Three.js)',
    url: 'https://gvnghiem.github.io/bot-university-hq/',
    img: 'https://gvnghiem.github.io/bot-university-hq/screenshot.png',
    tags: ['Three.js', 'Simulation'],
  },
  {
    name: 'Panda Stack',
    desc: 'Stacking game built with JavaScript',
    url: 'https://gvnghiem.github.io/panda-stack/',
    img: 'https://repository-images.githubusercontent.com/948018998/26c9f773-15a9-4cb8-b720-717e0a919667',
    tags: ['JavaScript', 'Game'],
  },
  {
    name: 'Flappy Bird',
    desc: 'Classic arcade clone in JavaScript',
    url: 'https://gvnghiem.github.io/flappy-bird-js/',
    img: 'https://gvnghiem.github.io/flappy-bird-js/screenshot.png',
    tags: ['JavaScript', 'Game'],
  },
  {
    name: 'Sketch Pad',
    desc: 'Browser drawing pad in JavaScript',
    url: 'https://gvnghiem.github.io/sketch-pad/',
    img: 'https://gvnghiem.github.io/sketch-pad/screenshot.png',
    tags: ['JavaScript', 'Canvas'],
  },
]

export const learning = [
  'Agentic AI workflows',
  'LLM-assisted automation',
  'Three.js / WebGL',
  'React + Tailwind + Framer Motion',
]

export type CaseStudy = {
  id: string
  title: string
  context: string
  problem: string
  tradeoffs: string[]
  solution: string
  impact: string
  stack: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'telemetry',
    title: 'Cloud gaming telemetry',
    context: 'Comcast · Cloud Platform Engineer',
    problem:
      'A new cloud gaming platform needed near-real-time visibility into session events and latency across partner integrations, so issues surfaced before players felt them.',
    tradeoffs: [
      'Streaming vs. batch: always-on Kinesis → Lambda ingestion costs more than scheduled ETL, but buys seconds-level anomaly detection.',
      'Server metrics vs. client truth: a custom Python + C++ latency QA tool feeding Elasticsearch shows what players actually experience, at the cost of owning another tool.',
    ],
    solution:
      'An AWS storefront and API Gateway in front of real-time pipelines (Kinesis → Lambda) into ELK/OpenSearch, Grafana dashboards on Linux EC2 for platform analytics, and a latency QA tool wired into the same search stack, backed by a security-first data catalog for third-party partner data.',
    impact: 'Near-instant event processing and anomaly detection across the platform.',
    stack: ['AWS API Gateway', 'AWS Kinesis', 'Lambda', 'OpenSearch / ELK', 'Grafana', 'Python', 'C++'],
  },
  {
    id: 'maas',
    title: 'Monitoring-as-a-Service',
    context: 'Comcast · Software Engineer & Data Analytics',
    problem:
      'Production issues were too often found by users instead of alarms, and every application team onboarded to support in its own way.',
    tradeoffs: [
      'Per-use-case alarms and runbooks vs. one generic template: more upfront work per team, far less alert noise and clearer ownership.',
      'Everything as code (Concourse, IaC) vs. console setup: slower first onboarding, repeatable and reviewable every time after.',
    ],
    solution:
      'A Monitoring-as-a-Service offering on Grafana, fed by Prometheus for infrastructure metrics and by Logstash and Elasticsearch pulling gaming user activity logs from AWS S3, covering alert detection, runbook automation, and a standard application-support onboarding path, with the pipeline defined as infrastructure as code.',
    impact: 'Significantly faster production incident response.',
    stack: ['Grafana', 'Prometheus', 'Elasticsearch', 'Logstash', 'AWS S3', 'Concourse', 'ServiceNow', 'Python'],
  },
  {
    id: 'bopis',
    title: 'Buy Online, Pickup In-Store',
    context: 'Comcast · Digital Order Entry portals',
    problem:
      'Xfinity.com order-entry portals handling 900K+ daily visitors and 11K+ daily orders needed an in-store pickup option without destabilizing the order path.',
    tradeoffs: [
      'Event-driven serverless pieces vs. extending the core order flow: a bit more orchestration to reason about, but the feature can scale and fail independently.',
      'Scheduled processing vs. synchronous calls: slight delay in downstream steps in exchange for resilience at peak traffic.',
    ],
    solution:
      'Delivered end to end on AWS API Gateway, SNS, and a scheduled Python Lambda, integrated with the residential sales channels (Self-Service, Omni, XOE, X1).',
    impact: 'Improved omnichannel experience with measurable conversion uplift.',
    stack: ['API Gateway', 'SNS', 'Lambda', 'Python', 'SQL'],
  },
  {
    id: 'custom-events',
    title: 'Custom analytics events',
    context: 'Quantum Metric · Customer Success Engineer',
    problem:
      'Enterprise clients needed behavior metrics their existing tools (Adobe Analytics, Google Analytics) could not capture, and wanted site issues expressed as dollars, not error counts.',
    tradeoffs: [
      'Scripted capture in the platform vs. waiting on a data-layer release: much faster time-to-insight, with more care needed around fragile selectors and code review.',
      'Depth vs. adoption: richer custom events help power users, but clients only benefit if teams can read the dashboards, so enablement is part of the deliverable.',
    ],
    solution:
      'Wrote custom JavaScript events by scraping on-page signals, triaged problems with the Dev Console, built dashboards, and put a cost on friction points so clients could prioritize fixes and expansion.',
    impact: 'Clients make strategic decisions from metrics they could not see before.',
    stack: ['JavaScript', 'Quantum Metric', 'Adobe Analytics', 'Dev Console'],
  },
]

export const experience = [
  {
    role: 'Customer Success Engineer',
    company: 'Quantum Metric',
    where: 'Remote',
    when: 'Apr 2025 — Present',
    points: [
      'Own the post-sales lifecycle for enterprise clients: onboarding, implementation, configuration, adoption and expansion.',
      'Architect client implementations: custom JavaScript analytics and real-time dashboards for Fortune 500 brands.',
      'Trusted advisor and escalation point; run Executive Business Reviews tying platform value to client KPIs.',
    ],
  },
  {
    role: 'Eng 4 · Cloud Platform Engineer',
    company: 'Comcast',
    where: 'Philadelphia, PA',
    when: 'Aug 2022 — Nov 2024',
    points: [
      'Co-built Comcast’s Cloud Gaming Platform from the ground up in a startup-style team: infrastructure, partner data integrations, customer-facing APIs.',
      'Built Kinesis → Lambda pipelines and ELK/OpenSearch stacks for real-time event processing and anomaly detection.',
      'Established a data governance framework and security-first data catalog; ran CI/CD on GitHub Actions and Concourse.',
    ],
  },
  {
    role: 'Eng 4 · Software Engineer & Data Analytics',
    company: 'Comcast',
    where: 'Greater Philadelphia',
    when: 'Apr 2015 — Aug 2022',
    points: [
      'Senior engineer for Digital Order Entry portals (900K+ daily visitors, 11K+ orders/day); shipped BOPIS end to end.',
      'Implemented Monitoring-as-a-Service: alert detection, runbook automation, application-support onboarding.',
      'Built data extraction pipelines and DevOps tooling; mentored junior engineers on code quality and incident management.',
    ],
  },
  {
    role: 'AVP, Service Delivery — IT Analyst & SQL Developer',
    company: 'BNP Paribas Securities Services',
    where: 'King of Prussia, PA',
    when: 'Aug 2013 — Apr 2015',
    points: [
      'Led a 3-person team delivering a Follow-the-Sun global operations strategy for French-built pricing applications.',
      'Daily SQL extractions on multi-million-row tables supporting accurate BID/ASK/NAV values.',
    ],
  },
  {
    role: 'Sr. Production Support Engineer',
    company: 'CitiPrepaid Services, Citigroup',
    where: 'West Conshohocken, PA',
    when: 'Oct 2011 — Aug 2013',
    points: [
      'Supported multi-client prepaid solutions: site health, batch scheduling (ActiveBatch), client API and authentication integrations.',
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Customer Success',
    items: ['Onboarding', 'Implementation & Config', 'Executive Business Reviews', 'Adoption & Expansion', 'Technical Training'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Concourse', 'Jenkins', 'CI/CD'],
  },
  {
    group: 'Observability & Data',
    items: ['Grafana', 'Prometheus', 'ELK / OpenSearch', 'Kibana', 'Splunk', 'SQL', 'Adobe Analytics', 'ServiceNow'],
  },
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'SQL', 'C++', 'PowerShell', 'English', 'Chinese'],
  },
]

export const credentials = {
  education: [
    { name: 'B.S. IT Software Engineering', org: 'University of Phoenix', when: '2007 — 2011' },
    { name: 'A.A. IT Software Engineering', org: 'Western International University', when: '2005 — 2007' },
  ],
  certs: [
    { name: 'Reinforcement Learning', org: 'AI Academy at Comcast', when: 'Aug 2023' },
    { name: 'Decision Tree & Model Applications for Network Engineers', org: 'AI Academy at Comcast', when: 'Aug 2023' },
    { name: 'Machine Learning Tree Model', org: 'AI Academy at Comcast', when: 'Aug 2023' },
    { name: 'Quantum Metric Platform Certification', org: 'Quantum Metric', when: 'Oct 2019' },
  ],
}

export function email(): string {
  return profile.emailParts.join('@')
}
