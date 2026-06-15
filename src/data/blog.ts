import { BlogPost } from "@/lib/types";

const img = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const blogPosts: BlogPost[] = [
  {
    slug: "char-dham-yatra-2026-complete-guide",
    title: "Char Dham Yatra 2026: A Complete Planning Guide",
    category: "Pilgrimage Guides",
    excerpt:
      "Everything you need to know before booking your Char Dham Yatra — best time to visit, registration process, helicopter options and packing essentials.",
    image: img("blog-chardham"),
    author: "GK Travel Editorial",
    date: "2026-01-12",
    readTime: "7 min read",
    content: [
      "The Char Dham Yatra — covering Yamunotri, Gangotri, Kedarnath and Badrinath — is one of the most sacred pilgrimage circuits in India. Planning ahead makes a significant difference to your comfort and safety.",
      "The yatra typically opens in late April/early May and continues until early November, with the best window for comfortable weather being May–June and September–October.",
      "Registration is mandatory for all four shrines and can be completed online. GK Travel handles this registration as part of every Char Dham package.",
      "Helicopter services for Kedarnath significantly reduce trek time and are recommended for senior travellers — GK Travel can arrange this as an optional add-on.",
      "Pack layered clothing, comfortable trekking shoes, rain gear, and any personal medication. Our itineraries include built-in rest days to allow for acclimatisation.",
    ],
  },
  {
    slug: "best-time-to-visit-kashmir",
    title: "Best Time to Visit Kashmir: A Season-by-Season Guide",
    category: "Destination Guides",
    excerpt:
      "From spring blossoms to winter snow — discover which season suits your Kashmir itinerary best.",
    image: img("blog-kashmir"),
    author: "GK Travel Editorial",
    date: "2025-12-02",
    readTime: "5 min read",
    content: [
      "Kashmir is a year-round destination, but each season offers a completely different experience.",
      "Spring (April–May) brings blooming gardens and mild weather — ideal for sightseeing and houseboat stays.",
      "Summer (June–August) is perfect for escaping the heat, with pleasant days in Srinagar, Gulmarg and Pahalgam.",
      "Autumn (September–October) paints the valley in gold — a favourite among photographers.",
      "Winter (December–February) transforms Gulmarg into a snow destination, popular for skiing and snow activities.",
    ],
  },
  {
    slug: "ayodhya-travel-guide-ram-mandir",
    title: "Ayodhya Travel Guide: Planning Your Ram Mandir Darshan",
    category: "Pilgrimage Guides",
    excerpt:
      "Practical tips for visiting the Shri Ram Janmabhoomi Mandir, including timings, nearby temples and how to plan a comfortable trip.",
    image: img("blog-ayodhya"),
    author: "GK Travel Editorial",
    date: "2025-11-18",
    readTime: "4 min read",
    content: [
      "Ayodhya has rapidly developed into a major pilgrimage destination following the consecration of the Shri Ram Janmabhoomi Mandir.",
      "Darshan timings vary by season, and queues can be long during peak periods — early morning visits are recommended.",
      "Beyond the Ram Mandir, don't miss Hanuman Garhi, Kanak Bhawan and the evening aarti on the Sarayu river ghats.",
      "GK Travel's Ayodhya itineraries are designed with senior citizens and families in mind, with comfortable hotels close to the temple complex.",
    ],
  },
  {
    slug: "bali-honeymoon-planning-tips",
    title: "5 Tips for Planning the Perfect Bali Honeymoon",
    category: "Destination Guides",
    excerpt:
      "From choosing between Seminyak and Ubud to the best time for a beach dinner — our top tips for a dreamy Bali honeymoon.",
    image: img("blog-bali"),
    author: "GK Travel Editorial",
    date: "2025-10-25",
    readTime: "6 min read",
    content: [
      "Bali offers a wonderful mix of beach and jungle experiences — splitting your stay between Seminyak and Ubud gives you the best of both.",
      "Private pool villas offer a level of privacy and romance that resort rooms simply can't match.",
      "Book your Jimbaran beach dinner in advance, especially during peak season, to secure the best tables.",
      "April–October offers the driest weather, ideal for outdoor activities and beach time.",
      "Consider adding a couple's spa session — many resorts offer beautiful open-air treatment rooms.",
    ],
  },
  {
    slug: "kerala-backwaters-houseboat-guide",
    title: "Kerala Houseboat Guide: What to Expect on Your Alleppey Cruise",
    category: "Destination Guides",
    excerpt:
      "A first-timer's guide to Kerala's iconic backwater houseboats — what's included, what to pack, and how to choose the right one.",
    image: img("blog-kerala"),
    author: "GK Travel Editorial",
    date: "2025-09-30",
    readTime: "5 min read",
    content: [
      "A houseboat cruise through Alleppey's backwaters is one of Kerala's signature experiences, gliding past paddy fields and village life.",
      "Most premium houseboats include all meals, prepared fresh on board by an onboard chef.",
      "An overnight cruise allows you to experience both the lively daytime backwaters and a peaceful sunset/sunrise on the water.",
      "Pack light, breathable clothing and mosquito repellent for evening hours.",
      "GK Travel partners only with verified, well-maintained houseboats to ensure comfort and safety.",
    ],
  },
  {
    slug: "dubai-first-timers-guide",
    title: "Dubai for First-Timers: A Practical Itinerary Guide",
    category: "Travel Tips",
    excerpt:
      "Planning your first trip to Dubai? Here's how to make the most of your time between iconic landmarks, desert adventures and shopping.",
    image: img("blog-dubai"),
    author: "GK Travel Editorial",
    date: "2025-09-08",
    readTime: "6 min read",
    content: [
      "Dubai rewards a well-planned itinerary — its attractions are spread across the city and a logical route saves significant time.",
      "Visit the Burj Khalifa early in the day or at sunset for the best views and shorter queues.",
      "A desert safari is best experienced in the late afternoon, ending with a BBQ dinner under the stars.",
      "Dubai Mall and the Marina are ideal for an evening of shopping and dining with stunning skyline views.",
      "GK Travel includes visa assistance with every Dubai package, simplifying the entire process.",
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
