export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  location: string;
  jobTitle: string;
  company: string;
  bio: string;
  prompts: {
    question: string;
    answer: string;
  }[];
  imageUrl?: string;
  initials: string;
  group: "A" | "B";
  height?: string;
  lifestyle?: string[];
};

export const PROFILES: Profile[] = [
  // Group A (0-7)
  {
    id: "a1",
    firstName: "Michael",
    lastName: "Johnson",
    age: 30,
    location: "Raleigh, NC",
    jobTitle: "Product Manager",
    company: "Acme Corp",
    bio: "Love exploring new places and trying new foods.",
    prompts: [
      {
        question: "A random fact I love",
        answer: "I can solve a Rubik's cube in under two minutes."
      },
      {
        question: "I'm a great plus-one because",
        answer: "I bring good energy and always know the best spots in town."
      }
    ],
    initials: "MJ",
    group: "A",
    height: "5'10\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "a2",
    firstName: "Emily",
    lastName: "Smith",
    age: 29,
    location: "Atlanta, GA",
    jobTitle: "Software Engineer",
    company: "TechFlow",
    bio: "Passionate about coding and coffee.",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Morning coffee, sunset walks, and trying new restaurants."
      },
      {
        question: "I'll fall for you if",
        answer: "You can make me laugh and appreciate good food as much as I do."
      }
    ],
    initials: "ES",
    group: "A",
    height: "5'6\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "a3",
    firstName: "Zephyr",
    lastName: "Washington",
    age: 31,
    location: "Raleigh, NC",
    jobTitle: "Designer",
    company: "Creative Studio",
    bio: "Making the world more beautiful, one design at a time.",
    prompts: [
      {
        question: "My ideal weekend",
        answer: "Brunch with friends, exploring local markets, and live music."
      },
      {
        question: "I'm looking for",
        answer: "Someone who loves adventure and deep conversations over wine."
      }
    ],
    initials: "ZW",
    group: "A",
    height: "6'0\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  },
  {
    id: "a4",
    firstName: "David",
    lastName: "Chen",
    age: 28,
    location: "Chicago, IL",
    jobTitle: "Marketing Director",
    company: "BrandWorks",
    bio: "Storyteller and brand builder.",
    prompts: [
      {
        question: "My love language",
        answer: "Quality time and trying new restaurants together."
      },
      {
        question: "A random fact I love",
        answer: "I've visited 25 countries and counting."
      }
    ],
    initials: "DC",
    group: "A",
    height: "5'11\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "a5",
    firstName: "Sarah",
    lastName: "Williams",
    age: 30,
    location: "Atlanta, GA",
    jobTitle: "Data Scientist",
    company: "Analytics Pro",
    bio: "Turning data into insights and insights into stories.",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Morning coffee, sunset walks, and a good book."
      },
      {
        question: "I'll fall for you if",
        answer: "You're kind, curious, and have a great sense of humor."
      }
    ],
    initials: "SW",
    group: "A",
    height: "5'7\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "a6",
    firstName: "James",
    lastName: "Brown",
    age: 32,
    location: "Raleigh, NC",
    jobTitle: "Consultant",
    company: "Strategy Group",
    bio: "Helping businesses solve complex problems.",
    prompts: [
      {
        question: "My ideal weekend",
        answer: "Hiking, reading, and cooking something new."
      },
      {
        question: "I'm a great plus-one because",
        answer: "I'm a great conversationalist and always up for trying new things."
      }
    ],
    initials: "JB",
    group: "A",
    height: "6'1\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  },
  {
    id: "a7",
    firstName: "Amara",
    lastName: "Kingsley",
    age: 29,
    location: "Chicago, IL",
    jobTitle: "Writer",
    company: "Independent",
    bio: "Words are my playground.",
    prompts: [
      {
        question: "My love language",
        answer: "Words of affirmation and acts of service."
      },
      {
        question: "A random fact I love",
        answer: "I've published two short story collections."
      }
    ],
    initials: "AK",
    group: "A",
    height: "5'5\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "a8",
    firstName: "Ryan",
    lastName: "Martinez",
    age: 31,
    location: "Atlanta, GA",
    jobTitle: "Engineer",
    company: "BuildTech",
    bio: "Building things that matter.",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Weekend projects, good music, and great company."
      },
      {
        question: "I'll fall for you if",
        answer: "You're passionate about something and can teach me about it."
      }
    ],
    initials: "RM",
    group: "A",
    height: "5'9\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  },
  // Group B (8-15)
  {
    id: "b1",
    firstName: "Michael",
    lastName: "Johnson",
    age: 30,
    location: "Raleigh, NC",
    jobTitle: "Sales Manager",
    company: "Growth Co",
    bio: "Connecting people and building relationships.",
    prompts: [
      {
        question: "My ideal weekend",
        answer: "Golf, good food, and time with friends."
      },
      {
        question: "I'm looking for",
        answer: "Someone who shares my love for travel and good conversation."
      }
    ],
    initials: "MJ",
    group: "B",
    height: "5'10\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "b2",
    firstName: "Emily",
    lastName: "Smith",
    age: 29,
    location: "Chicago, IL",
    jobTitle: "Teacher",
    company: "City Schools",
    bio: "Educating the next generation.",
    prompts: [
      {
        question: "My love language",
        answer: "Quality time and thoughtful gestures."
      },
      {
        question: "A random fact I love",
        answer: "I speak three languages fluently."
      }
    ],
    initials: "ES",
    group: "B",
    height: "5'6\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "b3",
    firstName: "Christopher",
    lastName: "Anderson",
    age: 32,
    location: "Raleigh, NC",
    jobTitle: "Financial Analyst",
    company: "Capital Partners",
    bio: "Numbers tell stories, and I love listening.",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Early morning runs, crossword puzzles, and home-cooked meals."
      },
      {
        question: "I'll fall for you if",
        answer: "You're genuine, ambitious, and love a good debate."
      }
    ],
    initials: "CA",
    group: "B",
    height: "6'0\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  },
  {
    id: "b4",
    firstName: "Jessica",
    lastName: "Taylor",
    age: 28,
    location: "Atlanta, GA",
    jobTitle: "Nurse",
    company: "City Hospital",
    bio: "Caring for others is my calling.",
    prompts: [
      {
        question: "My ideal weekend",
        answer: "Yoga, farmers market, and catching up with friends."
      },
      {
        question: "I'm a great plus-one because",
        answer: "I'm easygoing, fun to be around, and always up for an adventure."
      }
    ],
    initials: "JT",
    group: "B",
    height: "5'8\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "b5",
    firstName: "Daniel",
    lastName: "White",
    age: 31,
    location: "Chicago, IL",
    jobTitle: "Chef",
    company: "The Bistro",
    bio: "Food is love, and I love to share it.",
    prompts: [
      {
        question: "A random fact I love",
        answer: "I trained in Paris for two years."
      },
      {
        question: "My love language",
        answer: "Acts of service and cooking for someone special."
      }
    ],
    initials: "DW",
    group: "B",
    height: "5'11\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  },
  {
    id: "b6",
    firstName: "Olivia",
    lastName: "Davis",
    age: 30,
    location: "Raleigh, NC",
    jobTitle: "Photographer",
    company: "Studio O",
    bio: "Capturing moments, one click at a time.",
    prompts: [
      {
        question: "My simple pleasures",
        answer: "Golden hour light, film photography, and quiet mornings."
      },
      {
        question: "I'll fall for you if",
        answer: "You appreciate art, nature, and the little things in life."
      }
    ],
    initials: "OD",
    group: "B",
    height: "5'7\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "b7",
    firstName: "Matthew",
    lastName: "Garcia",
    age: 29,
    location: "Atlanta, GA",
    jobTitle: "Lawyer",
    company: "Legal Partners",
    bio: "Fighting for justice, one case at a time.",
    prompts: [
      {
        question: "My ideal weekend",
        answer: "Reading, hiking, and trying new restaurants."
      },
      {
        question: "I'm looking for",
        answer: "Someone who values integrity and intellectual conversations."
      }
    ],
    initials: "MG",
    group: "B",
    height: "6'2\"",
    lifestyle: ["Non-smoker", "Wants kids"]
  },
  {
    id: "b8",
    firstName: "Sophia",
    lastName: "Rodriguez",
    age: 30,
    location: "Chicago, IL",
    jobTitle: "Architect",
    company: "Design Build",
    bio: "Designing spaces that inspire and connect.",
    prompts: [
      {
        question: "A random fact I love",
        answer: "I've designed buildings in five different countries."
      },
      {
        question: "My love language",
        answer: "Physical touch and quality time exploring new places."
      }
    ],
    initials: "SR",
    group: "B",
    height: "5'6\"",
    lifestyle: ["Non-smoker", "Open to kids"]
  }
];

