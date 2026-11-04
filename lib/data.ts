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
    options: [
      {
        id: "A",
        text: "To limit computer usage so devices are rarely turned on during the day.",
        isCorrect: false,
      },
      {
        id: "B",
        text: "To protect solar hardware, maintain cybersecurity, and ensure respectful shared device stewardship.",
        isCorrect: true,
      },
      {
        id: "C",
        text: "Only to prevent students from playing games during break times.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Because school rules require memorizing ICT manuals without actual computer usage.",
        isCorrect: false,
      },
    ],
    explanation:
      "Following ICT policies protects sensitive solar-powered laptops from hardware damage, safeguards personal digital privacy, and ensures equal access for every student in the forest.",
  },
  {
    id: 2,
    question: "How can we use technology responsibly while protecting nature?",
    category: "Eco-Tech Stewardship",
    badge: "Sustainability",
    options: [
      {
        id: "A",
        text: "By utilizing 100% solar microgrid power, powering down idle devices, and avoiding e-waste in forest habitats.",
        isCorrect: true,
      },
      {
        id: "B",
        text: "By burying depleted batteries under trees so they degrade into the soil.",
        isCorrect: false,
      },
      {
        id: "C",
        text: "By keeping computers running 24/7 on maximum brightness to illuminate the woods.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "By printing all digital lessons on paper instead of viewing them on digital screens.",
        isCorrect: false,
      },
    ],
    explanation:
      "Responsible eco-tech balances digital power with conservation by utilizing clean solar energy, recycling devices, and adhering to strict leave-no-trace protocols in the forest.",
  },
  {
    id: 3,
    question: "How can computers and the internet help students learn in this kind of classroom?",
    category: "Digital Learning & IoT",
    badge: "EdTech Innovation",
    options: [
      {
        id: "A",
        text: "They replace teachers completely so students only interact through automated chatbots.",
        isCorrect: false,
      },
      {
        id: "B",
        text: "By streaming non-educational entertainment all day without curriculum guidelines.",
        isCorrect: false,
      },
      {
        id: "C",
        text: "By analyzing live IoT soil sensor telemetry from the living garden table and accessing offline educational databases.",
        isCorrect: true,
      },
      {
        id: "D",
        text: "By transforming the open forest into an enclosed indoor gaming lounge.",
        isCorrect: false,
      },
    ],
    explanation:
      "Computers connect theoretical science with real-time nature telemetry—reading soil moisture and pH, coding plant dashboards, and accessing offline encyclopedias in rural areas.",
  },
  {
    id: 4,
    question: "What are the advantages of studying in a classroom surrounded by nature?",
    category: "Biophilic Education",
    badge: "Well-Being & Focus",
    options: [
      {
        id: "A",
        text: "It reduces mental fatigue and stress through natural greenery while turning local flora into living science experiments.",
        isCorrect: true,
      },
      {
        id: "B",
        text: "It allows students to skip assignments by wandering into the deep jungle.",
        isCorrect: false,
      },
      {
        id: "C",
        text: "It eliminates the need for books, laptops, and structured learning.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "It makes school days shorter because solar power only lasts 30 minutes.",
        isCorrect: false,
      },
    ],
    explanation:
      "Biophilic learning surrounded by trees lowers stress, restores attention spans, and makes botanical and environmental science direct, tactile, and unforgettable.",
  },
  {
    id: 5,
    question: "Can we use technology while still taking care of our environment? Why?",
    category: "Harmonious Synthesis",
    badge: "Future Outlook",
    options: [
      {
        id: "A",
        text: "No, because all computing technology inevitably harms ecosystems regardless of design.",
        isCorrect: false,
      },
      {
        id: "B",
        text: "Yes, because modern green tech—like solar microgrids, bamboo structures, and IoT sensors—empowers us to monitor and protect ecosystems.",
        isCorrect: true,
      },
      {
        id: "C",
        text: "No, because electronics cannot function safely outdoors in tropical climates.",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Yes, but only if computers are prohibited from scientific study and environmental monitoring.",
        isCorrect: false,
      },
    ],
    explanation:
      "Technology and conservation reinforce each other: renewable energy and environmental IoT tools provide the exact solutions needed to monitor and safeguard biodiversity in Caraga.",
  },
];

