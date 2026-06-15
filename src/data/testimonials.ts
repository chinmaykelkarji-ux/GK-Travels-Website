import { Testimonial } from "@/lib/types";

const img = (seed: string, w = 200, h = 200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh & Meena Sharma",
    location: "Delhi",
    rating: 5,
    quote:
      "Our Char Dham Yatra with GK Travel was beyond seamless. From the hotel stays to the helicopter assistance at Kedarnath, every detail was handled with care. Our parents felt completely safe throughout.",
    tour: "Char Dham Yatra",
    image: img("t1"),
  },
  {
    id: "t2",
    name: "Ananya Rao",
    location: "Bengaluru",
    rating: 5,
    quote:
      "Bali was pure magic. The private pool villa, the candlelight dinner on Jimbaran beach — it felt like everything was designed just for us. GK Travel's team was responsive at every step.",
    tour: "Bali Honeymoon Bliss",
    image: img("t2"),
  },
  {
    id: "t3",
    name: "Vikram Malhotra",
    location: "Mumbai",
    rating: 5,
    quote:
      "We've travelled with several agencies over the years, but GK Travel's attention to detail is unmatched. The Kashmir houseboat experience was the highlight of our trip.",
    tour: "Kashmir Paradise Escape",
    image: img("t3"),
  },
  {
    id: "t4",
    name: "Sunita & Family",
    location: "Lucknow",
    rating: 5,
    quote:
      "The Ayodhya darshan tour was perfectly paced for my elderly parents. No rushing, comfortable hotel, and a guide who explained the significance of every site beautifully.",
    tour: "Ayodhya Ram Mandir Darshan",
    image: img("t4"),
  },
  {
    id: "t5",
    name: "Arjun Nair",
    location: "Kochi",
    rating: 5,
    quote:
      "The Dubai trip exceeded expectations — the desert safari and Burj Khalifa visit were unforgettable, and having visa support included made everything so much easier.",
    tour: "Dubai Luxury Escape",
    image: img("t5"),
  },
  {
    id: "t6",
    name: "Priya & Karthik",
    location: "Chennai",
    rating: 4,
    quote:
      "Kerala's backwaters on a private houseboat were straight out of a postcard. GK Travel's local knowledge made all the difference in choosing the right season and route.",
    tour: "Kerala Backwaters & Hills",
    image: img("t6"),
  },
];
