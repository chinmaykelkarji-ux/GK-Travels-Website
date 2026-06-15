import { Destination } from "@/lib/types";

const img = (seed: string, w = 1200, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const destinations: Destination[] = [
  {
    slug: "kashi",
    name: "Kashi (Varanasi)",
    category: "pilgrimage",
    region: "Uttar Pradesh, India",
    image: img("gk-kashi-main"),
    shortDescription:
      "The eternal city — sacred ghats, the Ganga Aarti, and timeless devotion.",
    description:
      "Kashi, the city of Lord Shiva, is one of the oldest living cities in the world. Witness the mesmerising Ganga Aarti at Dashashwamedh Ghat, seek blessings at the Kashi Vishwanath Temple, and experience a spiritual awakening unlike anywhere else.",
    whyVisit: [
      "Darshan at the Kashi Vishwanath Jyotirlinga",
      "The mesmerising evening Ganga Aarti",
      "Boat ride along the sacred ghats at sunrise",
      "Day excursion to Sarnath, the seat of Buddha's first sermon",
    ],
    bestTime: "October to March",
    tourCount: 2,
    featured: true,
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    category: "pilgrimage",
    region: "Uttar Pradesh, India",
    image: img("gk-ayodhya-main"),
    shortDescription:
      "The birthplace of Lord Rama — a journey of devotion and renewal.",
    description:
      "Ayodhya, the sacred birthplace of Lord Rama, has been transformed into a grand pilgrimage destination centred around the magnificent Ram Mandir. Walk the ghats of the Sarayu river and immerse yourself in centuries of devotion.",
    whyVisit: [
      "Darshan at the Shri Ram Janmabhoomi Mandir",
      "Evening aarti on the banks of the Sarayu river",
      "Visit Hanuman Garhi and Kanak Bhawan",
      "Comfortable, well-paced pilgrimage itinerary for all ages",
    ],
    bestTime: "October to March",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "char-dham",
    name: "Char Dham",
    category: "pilgrimage",
    region: "Uttarakhand, India",
    image: img("gk-chardham-main"),
    shortDescription:
      "Yamunotri, Gangotri, Kedarnath & Badrinath — the Himalayan circuit of a lifetime.",
    description:
      "The Char Dham Yatra is the most revered pilgrimage circuit in the Himalayas, covering Yamunotri, Gangotri, Kedarnath and Badrinath. GK Travel handles every detail — from helicopter options to comfortable stays — so you can focus on the journey within.",
    whyVisit: [
      "Visit all four sacred shrines in one curated circuit",
      "Optional helicopter services for Kedarnath",
      "Experienced Himalayan travel support & medical assistance",
      "Comfortable hotel stays at every halt",
    ],
    bestTime: "May to June, September to October",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    category: "domestic",
    region: "Jammu & Kashmir, India",
    image: img("gk-kashmir-main"),
    shortDescription: "Paradise on Earth — snow peaks, shikaras and saffron fields.",
    description:
      "From the houseboats of Dal Lake to the meadows of Gulmarg and Pahalgam, Kashmir is a destination of impossible natural beauty. GK Travel curates a relaxed escape through the valley's most iconic landscapes.",
    whyVisit: [
      "Stay aboard a traditional houseboat on Dal Lake",
      "Gondola ride over the slopes of Gulmarg",
      "Scenic drives through Pahalgam and Sonmarg",
      "Handpicked houseboats and heritage hotels",
    ],
    bestTime: "April to October",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "kerala",
    name: "Kerala",
    category: "domestic",
    region: "Kerala, India",
    image: img("gk-kerala-main"),
    shortDescription: "God's Own Country — backwaters, tea hills and Ayurveda.",
    description:
      "Glide through the tranquil backwaters of Alleppey on a private houseboat, breathe in the cool air of the Munnar tea estates, and unwind with an authentic Ayurvedic experience along Kerala's palm-lined coast.",
    whyVisit: [
      "Overnight private houseboat cruise in Alleppey",
      "Tea plantation walks in Munnar",
      "Authentic Ayurvedic spa experiences",
      "Beach time in Kovalam",
    ],
    bestTime: "September to March",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "goa",
    name: "Goa",
    category: "domestic",
    region: "Goa, India",
    image: img("gk-goa-main"),
    shortDescription: "Sun-soaked beaches, Portuguese charm and laid-back luxury.",
    description:
      "Goa pairs golden beaches with old-world charm — whitewashed churches, spice plantations and beachfront resorts. A perfect short escape for couples, families and friends alike.",
    whyVisit: [
      "Beachfront resort stays in North & South Goa",
      "Sunset cruise on the Mandovi river",
      "Heritage walks through old Goan villages",
      "Curated nightlife & culinary experiences",
    ],
    bestTime: "November to February",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "leh-ladakh",
    name: "Leh Ladakh",
    category: "domestic",
    region: "Ladakh, India",
    image: img("gk-ladakh-main"),
    shortDescription: "High-altitude deserts, turquoise lakes and ancient monasteries.",
    description:
      "Ladakh's stark, lunar landscapes, pristine lakes and centuries-old monasteries make it one of India's most extraordinary destinations — best experienced with an expert local team handling altitude and logistics.",
    whyVisit: [
      "Pangong Tso & Nubra Valley overnight stays",
      "Visit to Shanti Stupa and ancient monasteries",
      "Acclimatisation-friendly itinerary pacing",
      "Experienced high-altitude travel support",
    ],
    bestTime: "May to September",
    tourCount: 1,
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    category: "domestic",
    region: "Rajasthan, India",
    image: img("gk-rajasthan-main"),
    shortDescription: "Palaces, forts and the timeless royal heritage of India.",
    description:
      "Travel through Jaipur, Udaipur and Jodhpur — a land of majestic forts, opulent palaces and rich Rajput heritage, paired with some of India's finest heritage hotels.",
    whyVisit: [
      "Stay in heritage palace hotels",
      "Guided tours of Amber Fort & City Palace",
      "Sunset boat ride on Lake Pichola, Udaipur",
      "Authentic Rajasthani cultural evenings",
    ],
    bestTime: "October to March",
    tourCount: 1,
  },
  {
    slug: "dubai",
    name: "Dubai",
    category: "international",
    region: "United Arab Emirates",
    image: img("gk-dubai-main"),
    shortDescription: "Where modern luxury meets desert adventure.",
    description:
      "Dubai dazzles with record-breaking architecture, world-class shopping and desert adventures. GK Travel's Dubai escapes are designed for travellers who want polish, comfort and a touch of thrill.",
    whyVisit: [
      "Burj Khalifa 'At The Top' experience",
      "Desert safari with BBQ dinner",
      "Dhow cruise along Dubai Marina",
      "Curated shopping & city tours",
    ],
    bestTime: "November to March",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "bali",
    name: "Bali",
    category: "international",
    region: "Indonesia",
    image: img("gk-bali-main"),
    shortDescription: "Lush rice terraces, sacred temples and serene beaches.",
    description:
      "Bali's blend of spiritual culture, tropical landscapes and barefoot-luxury resorts make it one of Asia's most romantic escapes — ideal for honeymoons and milestone celebrations.",
    whyVisit: [
      "Private villa stays with pool",
      "Ubud rice terraces & temple visits",
      "Sunset dinners on Jimbaran beach",
      "Optional couple's spa experiences",
    ],
    bestTime: "April to October",
    tourCount: 1,
    featured: true,
  },
  {
    slug: "thailand",
    name: "Thailand",
    category: "international",
    region: "Thailand",
    image: img("gk-thailand-main"),
    shortDescription: "Island hopping, vibrant cities and warm hospitality.",
    description:
      "From the buzzing streets of Bangkok to the turquoise waters of Phuket and Krabi, Thailand offers a perfect mix of culture, cuisine and coastline — wrapped in legendary hospitality.",
    whyVisit: [
      "Island-hopping speedboat tours",
      "Bangkok city & temple tours",
      "Beachfront resort stays in Phuket/Krabi",
      "Authentic Thai culinary experiences",
    ],
    bestTime: "November to February",
    tourCount: 1,
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    category: "international",
    region: "Vietnam",
    image: img("gk-vietnam-main"),
    shortDescription: "Limestone karsts, ancient towns and unforgettable cruises.",
    description:
      "Vietnam's dramatic Halong Bay, charming Hoi An lanterns and the energy of Hanoi and Ho Chi Minh City combine for a journey full of contrast, culture and natural beauty.",
    whyVisit: [
      "Overnight cruise on Halong Bay",
      "Lantern-lit evenings in Hoi An",
      "Street food & culture tours in Hanoi",
      "Comfortable city-to-city transfers",
    ],
    bestTime: "October to April",
    tourCount: 1,
  },
];

export const getDestinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);
