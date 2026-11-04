import { ActivityQuestion, Member, ZoneData } from "./types";

export const PROJECT_TITLE = "Nature Table ICT Classroom in the Forest";
export const PROJECT_SUBTITLE = "Eco-Literacy & Digital Inclusion in Caraga";

export const PROJECT_MEMBERS: Member[] = [
  {
    name: "AYELLA NICOLE MILLAN",
    role: "Digital Learning & Library Lead",
    contribution: "Offline digital library resources & educational software curation",
    avatarColor: "from-blue-500 to-indigo-700",
  },
  {
    name: "FRETCHIE MAGUINDA",
    role: "Architectural & Bamboo Design",
    contribution: "Low-impact wooden & bamboo modular architecture layout",
    avatarColor: "from-amber-500 to-yellow-700",
  },
  {
    name: "RECHELLE MALBAS",
    role: "Community & Health Liaison",
    contribution: "First-aid outpost coordination & community outreach in Caraga",
    avatarColor: "from-rose-500 to-red-700",
  },
  {
    name: "RANDOLF MONDEJAR",
    role: "Field Operations & Sustainability",
    contribution: "Forest conservation, leave-no-trace protocols, and durability testing",
    avatarColor: "from-lime-500 to-green-700",
  },
  {
    name: "JUSTIN KILARIO",
    role: "Project Lead & Hardware Systems",
    contribution: "Solar energy integration & low-cost device networking setup",
    avatarColor: "from-emerald-500 to-teal-700",
  },
  {
    name: "GUADALYN LABASTILLA",
    role: "Eco-Curriculum Specialist",
    contribution: "Environmental science curriculum & plant sensor experiment workflows",
    avatarColor: "from-green-500 to-emerald-800",
  },
];

export const PROJECT_CONCEPT = {
  title: "Nature Table ICT Classroom in the Forest",
  tagline: "Nature Table = Bamboo Table + Forest Classroom (Tech Meets Wilderness)",
  why: "Kids today are disconnected from nature while normal ICT classrooms are boxed into concrete rooms. This project breaks those walls by embedding high-tech digital literacy directly within the natural environment.",
  design:
    "100% Solar-powered micro-grid, low-cost robust computing devices, locally sourced bamboo & renewable timber, and strict leave-no-trace principles.",
  lessons:
    "Integrated cross-disciplinary learning: ICT + Science + Math + Arts + Language. Hands-on soil & moisture sensors, GPS forest biodiversity mapping, and multimedia eco-field journaling.",
  outcome:
    "Digitally literate, eco-conscious youth, with a sustainable and highly replicable classroom framework designed for Caraga and rural forest communities.",
};

export const ZONES: ZoneData[] = [
  {
    id: "overview",
    name: "Forest Clearing Sanctuary",
    shortName: "Overview",
    tagline: "Panoramic View of the Eco-ICT Ecosystem",
    description:
      "A scenic overview of the outdoor learning clearing nestled beneath towering forest trees, connecting the central Nature Table classroom, the School Library pavilion, the Health Outpost, and the Project Billboard along winding dirt trails.",
    cameraPosition: [0, 18, 26],
    targetPosition: [0, 1, 0],
    details: {
      iconName: "Compass",
      purpose: "Comprehensive view of all modular eco-structures and natural forest pathways.",
      features: [
        "Natural canopy shelter providing shade and fresh air circulation",
        "Winding dirt paths connecting all four educational zones",
        "Zero-emission solar microgrid powering the entire compound",
        "Biodiverse rainforest surroundings in the Caraga region",
      ],
      specs: [
        { label: "Clearing Radius", value: "45 Meters" },
        { label: "Eco-Footprint", value: "Net Negative Carbon" },
        { label: "Power Source", value: "100% Off-Grid Solar" },
        { label: "Location Model", value: "Caraga, Philippines" },
      ],
    },
  },
  {
    id: "classroom",
    name: "Nature Table ICT Classroom",
    shortName: "Classroom",
    tagline: "Outdoor Digital Learning Workstation",
    description:
      "The flagship bamboo and timber learning station featuring a central square desk with an inner live garden planter, low-cost student laptops, wooden benches, and an overhead angled bamboo roof fitted with high-efficiency solar panels.",
    cameraPosition: [0, 6.2, 13.0],
    targetPosition: [0, 1.2, 0],
    details: {
      iconName: "Monitor",
      purpose: "Provide modern digital computer literacy immersed directly inside a living forest environment.",
      features: [
        "Handcrafted bamboo and reclaimed timber large square study platform",
        "Multi-seat student perimeter with low-cost, energy-efficient laptops",
        "Integrated central soil and garden bed with live ferns, herbs, and flowers",
        "Wooden log stools and benches for collaborative teamwork",
        "Rear auxiliary workstation bench for group research and device charging",
      ],
      specs: [
        { label: "Student Capacity", value: "12-16 Students" },
        { label: "Material", value: "Treated Bamboo & Timber" },
        { label: "Hardware", value: "Low-Cost Energy-Efficient Laptops" },
        { label: "Connectivity", value: "Local Mesh / Offline LMS" },
      ],
    },
  },
  {
    id: "nature-table",
    name: "Living Garden Nature Table",
    shortName: "Nature Table",
    tagline: "Central Biophilic Centerpiece & IoT Soil Lab",
    description:
      "The heart of the classroom: a raised tiered planter box built directly into the center of the computer table. Filled with endemic ferns, medicinal herbs, and flowering plants, wired with IoT soil sensors connected to student laptops.",
    cameraPosition: [0, 5.0, 7.8],
    targetPosition: [0, 1.1, 0],
    details: {
      iconName: "Sprout",
      purpose: "Connect tech education with direct hands-on botanical and environmental sciences.",
      features: [
        "Living garden bed featuring local ferns, citronella, oregano, and orchids",
        "Microcontroller-connected IoT moisture, pH, and soil temperature probes",
        "Live data telemetry streamed directly to student coding dashboards",
        "Natural air-purifying foliage cooling students during study sessions",
      ],
      specs: [
        { label: "Bed Dimensions", value: "2.4m x 2.4m Sunken Box" },
        { label: "Plant Varieties", value: "8+ Local Endemic Species" },
        { label: "Sensors", value: "Moisture, Humidity & Light IoT" },
        { label: "Watering", value: "Passive Drip Rainwater System" },
      ],
    },
  },
  {
    id: "solar-roof",
    name: "Photovoltaic Bamboo Canopy",
    shortName: "Solar Roof",
    tagline: "Renewable Energy Off-Grid Microgrid",
    description:
      "An engineered bamboo and timber truss structure sheltering the back workstation, fitted with 6 polycrystalline solar panels angled towards the sun, feeding high-capacity lithium battery storage for continuous outdoor learning.",
    cameraPosition: [3.2, 6.8, 6.5],
    targetPosition: [1.8, 3.2, -1.8],
    details: {
      iconName: "Sun",
      purpose: "Supply 100% clean, silent solar electricity to power student laptops, lighting, and IoT devices.",
      features: [
        "Lightweight triangular bamboo truss with weatherproof treated joints",
        "6 High-efficiency monocrystalline solar panels with anti-reflective glass",
        "Safe low-voltage DC bus bar system and weatherproof charging stations",
        "Provides rain shelter and passive cooling for outdoor students",
      ],
      specs: [
        { label: "Panel Capacity", value: "1,200W Peak Array" },
        { label: "Battery Bank", value: "2.4kWh LiFePO4 Storage" },
        { label: "Runtime", value: "8+ Hours Daily Full Load" },
        { label: "Tilt Angle", value: "15° South-Facing" },
      ],
    },
  },
  {
    id: "library",
    name: "Forest School Library Pavilion",
    shortName: "Library",
    tagline: "Open-Air Reading Haven & Offline Knowledge Hub",
    description:
      "A peaceful wooden pavilion surrounded by tall trees. Houses handcrafted cedar bookshelves filled with reference texts, field guides, local literature, digital e-readers, and cozy reading benches overlooking the greenery.",
    cameraPosition: [-16, 5.8, 4.5],
    targetPosition: [-16, 2.2, -8],
    details: {
      iconName: "BookOpen",
      purpose: "Encourage literacy, quiet reflection, and access to curated offline knowledge databases.",
      features: [
        "Open-air modular bamboo pavilion with 360-degree forest ventilation",
        "Hardwood bookshelves loaded with science, literature, and nature field guides",
        "Offline digital content server (Wikipedia Offline, Khan Academy Lite, RACHEL)",
        "Reading table with warm lantern lighting for overcast days",
      ],
      specs: [
        { label: "Book Capacity", value: "350+ Volumes & Field Guides" },
        { label: "Digital Server", value: "Offline Raspberry Pi Hotspot" },
        { label: "Structure", value: "Modular Bamboo Frame" },
        { label: "Flooring", value: "Raised Teak Wood Decking" },
      ],
    },
  },
  {
    id: "medical",
    name: "Health & First-Aid Outpost",
    shortName: "Health Outpost",
    tagline: "Forest Clinic & Community Wellness Station",
    description:
      "A clean, functional bamboo health pavilion equipped for emergency first-aid, vital health screenings, and herbal medicine studies, serving both students and surrounding rural forest community members.",
    cameraPosition: [16, 5.8, 4.5],
    targetPosition: [16, 2.2, -8],
    details: {
      iconName: "HeartPulse",
      purpose: "Provide rapid emergency response, health education, and herbal remedy learning for students.",
      features: [
        "Emergency examination cot with clean linens and sanitization supplies",
        "Fully stocked emergency first-aid chest, trauma kit, and stethoscope",
        "Herbal apothecary shelf with local Caraga medicinal plants and tinctures",
        "Solar-powered mini refrigerator for temperature-sensitive medications",
      ],
      specs: [
        { label: "Capacity", value: "2 Triage Cots + Medic Desk" },
        { label: "Power", value: "Dedicated Solar Back-up" },
        { label: "Equipment", value: "BP Monitor, Pulse Ox, First-Aid" },
        { label: "Community Reach", value: "School & Local Forest Environs" },
      ],
    },
  },
  {
    id: "billboard",
    name: "Official Project Billboard",
    shortName: "Members Billboard",
    tagline: "Project Title & Project Team Roster",
    description:
      "A prominent timber signboard marking the entrance of the forest classroom. Displays the project title, vision statement, and the official team members who designed and created this innovative educational concept.",
    cameraPosition: [-8, 2.8, 12.5],
    targetPosition: [-8, 2.0, 7],
    details: {
      iconName: "Users",
      purpose: "Honor the project concept creators and showcase the mission of the Caraga Eco-ICT initiative.",
      features: [
        "Rustic timber post structure with hand-carved wood grain paneling",
        "Nighttime warm hanging lanterns illuminating the roster",
        "Complete official list of the 6 core project members",
        "Direct link to the handwritten project concept blueprint and outcomes",
      ],
      specs: [
        { label: "Project Title", value: "Nature Table ICT Classroom in the Forest" },
        { label: "Team Count", value: "6 Core Members" },
        { label: "Region", value: "Caraga, Philippines" },
        { label: "Focus", value: "Sustainable EdTech & Conservation" },
      ],
    },
  },
];

export const ACTIVITY_QUESTIONS: ActivityQuestion[] = [
  {
    id: 1,
    question: "Why should we follow ICT policies in the classroom?",
    category: "Digital Citizenship & Ethics",
    badge: "Policy & Safety",
    hint: "Think about device longevity, personal data safety, and respectful collaborative equipment sharing in a community learning hub.",
    keyPoints: [
      "Protects expensive solar-powered computers and sensitive IoT hardware from physical and electrical damage.",
      "Ensures cybersecurity, online privacy, and fair internet bandwidth distribution for all students.",
      "Cultivates ethical digital citizenship and discipline necessary for modern professional workplaces.",
    ],
  },
  {
    id: 2,
    question: "How can we use technology responsibly while protecting nature?",
    category: "Eco-Tech Stewardship",
    badge: "Sustainability",
    hint: "Consider energy management, reducing e-waste, respecting wildlife, and applying leave-no-trace ethics with battery devices.",
    keyPoints: [
      "Power devices exclusively with renewable solar energy and power-down during inactivity to conserve battery storage.",
      "Avoid single-use tech waste and practice responsible e-waste recycling and modular hardware re-use.",
      "Maintain quiet study volumes and minimal cable footprints to protect forest wildlife habitats.",
    ],
  },
  {
    id: 3,
    question: "How can computers and the internet help students learn in this kind of classroom?",
    category: "Digital Learning & IoT",
    badge: "EdTech Innovation",
    hint: "Connect classroom laptops to offline knowledge servers (RACHEL/Wikipedia), environmental sensors, and multimedia field journals.",
    keyPoints: [
      "Allows real-time sensor data analysis of soil moisture, pH, and photosynthesis from the living garden table.",
      "Provides offline access to vast global encyclopedias, digital simulations, and educational field guides in remote areas.",
      "Enables students to code eco-monitoring programs and create digital maps of local forest biodiversity.",
    ],
  },
  {
    id: 4,
    question: "What are the advantages of studying in a classroom surrounded by nature?",
    category: "Biophilic Education",
    badge: "Well-Being & Focus",
    hint: "Reflect on how natural sunlight, fresh air, and greenery reduce cognitive fatigue and improve critical thinking.",
    keyPoints: [
      "Natural oxygen and greenery reduce mental fatigue, stress, and anxiety compared to enclosed concrete rooms.",
      "Immediate hands-on contact with plants and trees turns theoretical science into living interactive experiments.",
      "Deepens emotional empathy and personal stewardship toward forest conservation in the Caraga region.",
    ],
  },
  {
    id: 5,
    question: "Can we use technology while still taking care of our environment? Why?",
    category: "Harmonious Synthesis",
    badge: "Future Outlook",
    hint: "Consider sustainable architecture, biodegradable materials, solar microgrids, and tech-driven environmental conservation.",
    keyPoints: [
      "YES: Technology and nature are not opposites—tech provides the monitoring tools needed to safeguard ecosystems.",
      "Solar-powered microgrids and modular bamboo architecture prove high-tech facilities can have net-negative carbon footprints.",
      "Educating youth with eco-integrated ICT prepares future innovators to build sustainable climate and conservation solutions.",
    ],
  },
];

