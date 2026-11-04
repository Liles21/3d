export interface StudentDiscussionItem {
  title: string;
  points: string[];
  slogan: string;
}

export interface StudentProfile {
  id: number;
  name: string;
  role: string;
  outfit: {
    topColor: string;
    bottomColor: string;
    hairColor: string;
  };
  discussions: StudentDiscussionItem[]; // indexed by question index 0..4
}

export const STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 1,
    name: "AYELLA NICOLE MILLAN",
    role: "Project Lead & Architect",
    outfit: { topColor: "#0284c7", bottomColor: "#1e293b", hairColor: "#171717" },
    discussions: [
      {
        title: "Hardware Stewardship",
        points: [
          "Protect solar battery terminals from outdoor humidity.",
          "Perform systematic shutdowns to preserve LiFePO4 cells.",
          "Maintain clean shared keyboard surfaces after field work.",
        ],
        slogan: "Safe Hardware Powers Sustainable Study!",
      },
      {
        title: "Zero E-Waste Mandate",
        points: [
          "Never discard damaged cables or batteries in the forest.",
          "Recycle components through certified Caraga e-waste centers.",
          "Use modular parts designed for easy repair and reuse.",
        ],
        slogan: "Zero E-Waste • Pristine Rainforest!",
      },
      {
        title: "Real-Time Telemetry",
        points: [
          "Stream live soil humidity data into classroom notebooks.",
          "Turn theoretical botany into direct data-driven coding.",
          "Correlate sunlight hours with plant photosynthesis rates.",
        ],
        slogan: "Data-Driven Botanical Discovery!",
      },
      {
        title: "Cognitive Restoration",
        points: [
          "Natural forest canopy lowers screen-induced eye fatigue.",
          "Open airflow increases student oxygenation and alertness.",
          "Biophilic environments reduce academic stress by 35%.",
        ],
        slogan: "Fresh Canopy Air • Limitless Mental Focus!",
      },
      {
        title: "Harmonious Synthesis",
        points: [
          "Yes! Modern clean technology actively protects nature.",
          "Renewable solar power leaves zero fossil carbon footprint.",
          "Sustainable computing proves tech and ecosystems coexist.",
        ],
        slogan: "Technology & Forest in Perfect Balance!",
      },
    ],
  },
  {
    id: 2,
    name: "FRETCHIE MAGUINDA",
    role: "Environmental Analyst",
    outfit: { topColor: "#4f46e5", bottomColor: "#334155", hairColor: "#78350f" },
    discussions: [
      {
        title: "Safe Outdoor Tech",
        points: [
          "Route device cables safely along elevated timber rails.",
          "Cover electronics during sudden tropical forest drizzles.",
          "Keep drinking water away from open keyboard stations.",
        ],
        slogan: "Discipline in the Forest • Safety First!",
      },
      {
        title: "Flora Protection",
        points: [
          "Preserve native Caraga ferns planted inside tables.",
          "Avoid resting warm power bricks against living tree trunks.",
          "Follow leave-no-trace protocols around study platforms.",
        ],
        slogan: "Respect Every Root, Fern & Leaf!",
      },
      {
        title: "Digital Botany Lab",
        points: [
          "Identify indigenous tree species via offline guides.",
          "Document medicinal rainforest herbs in digital archives.",
          "Empower rural students with digital taxonomic tools.",
        ],
        slogan: "Living Flora Meets Digital Intelligence!",
      },
      {
        title: "Stress Reduction",
        points: [
          "Forest phytoncides naturally lower anxiety and pulse rate.",
          "Gentle birdsong replaces disruptive indoor acoustic noise.",
          "Outdoor study restores natural attention spans rapidly.",
        ],
        slogan: "Serenity in Nature Inspires Deeper Thought!",
      },
      {
        title: "Ecosystem Guardianship",
        points: [
          "Digital tools map forest reserves and tree health.",
          "Conservationists use sensor telemetry to safeguard wildlife.",
          "Caraga youth become tech-empowered forest protectors.",
        ],
        slogan: "Technology as the Eyes & Ears of Nature!",
      },
    ],
  },
  {
    id: 3,
    name: "RECHELLE MALBAS",
    role: "IoT Sensor Engineer",
    outfit: { topColor: "#dc2626", bottomColor: "#0f172a", hairColor: "#27272a" },
    discussions: [
      {
        title: "IoT Sensor Protocol",
        points: [
          "Calibrate soil moisture probes before starting classes.",
          "Protect analog sensor wires from physical tension.",
          "Ensure secure 3.3V power rails for microcontrollers.",
        ],
        slogan: "Precision Sensing for Living Agriculture!",
      },
      {
        title: "Non-Invasive IoT",
        points: [
          "Use non-toxic corrosion-free soil telemetry probes.",
          "Deploy solar-powered wireless nodes without trenching.",
          "Gather environmental signals without altering ecosystems.",
        ],
        slogan: "Gentle Telemetry • Harmless Tech Integration!",
      },
      {
        title: "Coding with Nature",
        points: [
          "Students write Python code to monitor soil moisture.",
          "Automate gentle irrigation when soil reaches dry threshold.",
          "Learn GPIO microcontroller programming in the wild.",
        ],
        slogan: "Write Code that Listens to Living Plants!",
      },
      {
        title: "Tactile Learning",
        points: [
          "Transition from computer screen to plant roots instantly.",
          "Observe physical plant reactions to sunlight and watering.",
          "Sensory contact turns abstract code into real outcomes.",
        ],
        slogan: "Hands-on Science at Every Workstation!",
      },
      {
        title: "Low-Power Innovation",
        points: [
          "Energy-efficient chips draw less than 2 watts in standby.",
          "Recycled biodegradable sensor boards minimize footprint.",
          "Green IoT demonstrates how tech preserves natural beauty.",
        ],
        slogan: "Smart Sensors Safeguarding Forest Health!",
      },
    ],
  },
  {
    id: 4,
    name: "RANDOLF MONDEJAR",
    role: "Clean Energy Specialist",
    outfit: { topColor: "#059669", bottomColor: "#1e293b", hairColor: "#451a03" },
    discussions: [
      {
        title: "Clean Energy Rules",
        points: [
          "Monitor 24V solar inverter capacity before high load.",
          "Unplug idle peripherals to conserve battery reserves.",
          "Ensure solar panel surfaces remain clear of fallen leaves.",
        ],
        slogan: "Solar Energy: Clean, Silent & Infinite!",
      },
      {
        title: "100% Solar Power",
        points: [
          "Zero fossil fuels: entire classroom runs off clean sun.",
          "Silent operation avoids disturbing woodland wildlife.",
          "LiFePO4 battery bank guarantees 8+ hours of study time.",
        ],
        slogan: "Powered by the Sun • Protected by the Trees!",
      },
      {
        title: "Renewable Analytics",
        points: [
          "Analyze real-time solar watt-hour generation graphs.",
          "Study solar angle thermodynamics through live metrics.",
          "Master energy budget planning for off-grid communities.",
        ],
        slogan: "Learn Real-World Renewable Energy Systems!",
      },
      {
        title: "Passive Thermal Comfort",
        points: [
          "Bamboo and timber canopy blocks direct solar heat.",
          "Cool mountain breezes eliminate noisy air conditioning.",
          "Natural shade keeps computer hardware cool efficiently.",
        ],
        slogan: "Passive Architecture • Natural Forest Cooling!",
      },
      {
        title: "Circular Energy Cycle",
        points: [
          "The same sun feeding leaves powers our computing tools.",
          "Trees provide clean air; solar microgrid powers study.",
          "Net-zero carbon learning creates an eco-friendly future.",
        ],
        slogan: "Zero Emissions • Infinite Renewable Growth!",
      },
    ],
  },
  {
    id: 5,
    name: "JUSTIN KILARIO",
    role: "Software Developer & UI",
    outfit: { topColor: "#ec4899", bottomColor: "#1e293b", hairColor: "#1c1917" },
    discussions: [
      {
        title: "Cybersecurity & Ethics",
        points: [
          "Use vetted offline learning portals and science libraries.",
          "Never execute unauthorized scripts on shared systems.",
          "Foster respectful and inclusive collaborative teamwork.",
        ],
        slogan: "Ethical Computing Creates Responsible Leaders!",
      },
      {
        title: "Green Computing",
        points: [
          "Optimize frontend code to minimize CPU power spikes.",
          "High-contrast dark-mode displays reduce battery draw.",
          "Paperless cloud workflows save thousands of trees.",
        ],
        slogan: "Efficient Code for a Greener Tomorrow!",
      },
      {
        title: "Offline Learning Hub",
        points: [
          "Cached local encyclopedias provide internet-free study.",
          "Rural students receive equal access to digital knowledge.",
          "3D simulations make complex ecological cycles intuitive.",
        ],
        slogan: "Bridging the Digital Divide with Open Tech!",
      },
      {
        title: "Creative Inspiration",
        points: [
          "Outdoor study spaces stimulate lateral creative thinking.",
          "Expansive natural views encourage broad, ambitious ideas.",
          "Designing solutions in nature makes problems tangible.",
        ],
        slogan: "Nature Sparks Limitless Human Creativity!",
      },
      {
        title: "Digital Conservation",
        points: [
          "Cloud databases connect local Caraga data to global science.",
          "Predictive models forecast microclimate and rainfall trends.",
          "Software empowers community-led conservation movements.",
        ],
        slogan: "Code that Protects our Planet!",
      },
    ],
  },
  {
    id: 6,
    name: "GUADALYN LABASTILLA",
    role: "Curriculum Liaison",
    outfit: { topColor: "#d97706", bottomColor: "#1e293b", hairColor: "#451a03" },
    discussions: [
      {
        title: "Classroom Community",
        points: [
          "Maintain equal access rotations for all rural learners.",
          "Promote peer mentoring during digital coding exercises.",
          "Cultivate a culture of shared responsibility and respect.",
        ],
        slogan: "United in Learning • Rooted in Care!",
      },
      {
        title: "Eco-Stewardship",
        points: [
          "Instill understanding that every digital action has impact.",
          "Organize student-led native tree planting sessions.",
          "Promote sustainable tech habits in homes and towns.",
        ],
        slogan: "Empowering Eco-Stewards of the Caraga Region!",
      },
      {
        title: "Inquiry-Based Learning",
        points: [
          "Formulate science hypotheses and test them outdoors.",
          "Collaborate on real-world community environmental challenges.",
          "Develop critical thinking by interrogating live telemetry.",
        ],
        slogan: "Active Inquiry • Real-World Solutions!",
      },
      {
        title: "Emotional Connection",
        points: [
          "Studying among trees builds profound empathy for nature.",
          "Students develop lifelong commitment to local ecology.",
          "Replaces disconnected schooling with meaningful immersion.",
        ],
        slogan: "Loving Nature Through Direct Daily Discovery!",
      },
      {
        title: "Education Revolution",
        points: [
          "Demonstrates that classrooms need not be concrete boxes.",
          "Pioneers a national model for outdoor rural digital schools.",
          "Inspires children to become environmental technologists.",
        ],
        slogan: "The Forest is our Future Classroom!",
      },
    ],
  },
];

export const PRESENTER_DISCUSSIONS = [
  {
    title: "Topic 1: ICT Policies & Safety",
    points: [
      "Why must we safeguard solar and computing gear in the woods?",
      "Students practice device stewardship and digital hygiene.",
      "Ensures equitable, long-lasting tech for rural communities.",
    ],
    slogan: "Foundation of Sustainable Outdoor Education!",
  },
  {
    title: "Topic 2: Responsible Tech & Nature",
    points: [
      "Balancing modern computing with zero-carbon ecological ethics.",
      "100% solar microgrid and zero e-waste leave the forest clean.",
      "Computers should safeguard biodiversity, not displace it.",
    ],
    slogan: "Green Technology for Forest Conservation!",
  },
  {
    title: "Topic 3: Computers & Living IoT",
    points: [
      "Integrating microcontroller soil probes into computer tables.",
      "Students code live dashboards that monitor endemic plants.",
      "Theoretical science becomes tactile, live experimentation.",
    ],
    slogan: "Living Telemetry Meets Practical Programming!",
  },
  {
    title: "Topic 4: Biophilic Benefits",
    points: [
      "Studying beneath forest canopies lowers mental strain and stress.",
      "Natural oxygen and sunlight boost focus and long-term memory.",
      "Surroundings inspire deeper affection for Caraga ecosystems.",
    ],
    slogan: "Healthy Minds Thriving in Living Classrooms!",
  },
  {
    title: "Topic 5: Tech & Nature Harmony",
    points: [
      "Can computing and environmental conservation work together?",
      "Yes! Renewable tech gives us tools to monitor and heal earth.",
      "Our Caraga model proves technology and forest belong together.",
    ],
    slogan: "A New Vision for Philippine Outdoor Education!",
  },
];

