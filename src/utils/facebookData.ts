// Utility to generate specific Facebook profile data for Adeeb Khaja Mohamed
import { getFakeImageUrl } from './fakeImages';

export interface FacebookProfileData {
  name: string;
  friends: string;
  photos: number;
  posts: Array<{
    author: string;
    authorAvatar: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
    shares?: number;
    image?: string;
  }>;
  about: {
    work?: string[];
    education?: string[];
    places?: string[];
    contact?: string;
    basic?: string[];
  };
  friendsList: Array<{
    name: string;
    avatar: string;
  }>;
  peopleYouMayKnow: Array<{
    name: string;
    avatar: string;
  }>;
}

export const generateFacebookProfile = (resultId: string): FacebookProfileData => {
  // If it's the specific Adeeb result, return exact data from screenshot
  if (resultId === 'adeeb1' || resultId === 'adeeb2' || resultId === 'adeeb3' || resultId.includes('adeeb')) {
    return {
      name: 'Adeeb Khaja Mohamed',
      friends: '31 friends',
      photos: 45,
      posts: [
        {
          author: 'Adeeb Khaja Mohamed',
          authorAvatar: 'adeeb-avatar',
          time: '5mo',
          content: '',
          likes: 90,
          comments: 15,
          image: 'adeeb-stranger-things' // Reference to the image in screenshot
        },
        {
          author: 'Adeeb Khaja Mohamed',
          authorAvatar: 'adeeb-avatar',
          time: '11 April 2002',
          content: 'Born on 11 April 2002',
          likes: 45,
          comments: 2,
          shares: 0
        }
      ],
      about: {
        work: ['Graduate Research Assistant at George Mason University'],
        education: ['George Mason University'],
        places: ['Washington D.C.'],
        basic: ['Born on April 11, 2002']
      },
      friendsList: [
        { name: 'Sarmad Talpur', avatar: 'sarmad' },
        { name: 'Mohammed Sajeed', avatar: 'mohammed' },
        { name: 'Emily Pan', avatar: 'emily' },
        { name: 'Saif Ali Khan', avatar: 'saif' },
        { name: 'Aryan Oberoi', avatar: 'aryan' },
        { name: 'Rayyan S Rnz', avatar: 'rayyan' },
        { name: 'Chirag Pm', avatar: 'chirag' },
        { name: 'Hammad Feroz', avatar: 'hammad' },
        { name: 'Ajay Kumar G', avatar: 'ajay' }
      ],
      peopleYouMayKnow: [
        { name: 'Person 1', avatar: 'p1' },
        { name: 'Person 2', avatar: 'p2' },
        { name: 'Person 3', avatar: 'p3' },
        { name: 'Person 4', avatar: 'p4' },
        { name: 'Person 5', avatar: 'p5' }
      ]
    };
  }

  // Greg Krieger - Financial Analyst (Sports, travel, friends)
  if (resultId === 'greg6' || resultId.includes('greg')) {
    return {
      name: 'Greg Krieger',
      friends: '420 friends',
      photos: 156,
      posts: [
        {
          author: 'Greg Krieger',
          authorAvatar: 'greg-avatar',
          time: '3d',
          content: 'Great game last night! Pulled through in the final quarter. Nothing beats watching football with friends.',
          likes: 87,
          comments: 12,
          shares: 3,
          image: 'football-game'
        },
        {
          author: 'Greg Krieger',
          authorAvatar: 'greg-avatar',
          time: '1w',
          content: 'Just got back from an amazing trip to Colorado. The mountains never disappoint! Already planning the next adventure.',
          likes: 124,
          comments: 18,
          shares: 5,
          image: 'colorado-trip'
        },
        {
          author: 'Greg Krieger',
          authorAvatar: 'greg-avatar',
          time: '2w',
          content: 'Weekend golf with the guys. Perfect weather and great company!',
          likes: 65,
          comments: 8,
          shares: 1,
          image: 'golf'
        }
      ],
      about: {
        work: ['Financial Analyst at Midwest Capital Advisors'],
        education: ['University of Michigan'],
        places: ['Chicago, Illinois'],
        basic: ['Born on March 15, 1997']
      },
      friendsList: [
        { name: 'Mike Thompson', avatar: 'mike' },
        { name: 'Chris Anderson', avatar: 'chris' },
        { name: 'Ryan Martinez', avatar: 'ryan' },
        { name: 'David Chen', avatar: 'david' },
        { name: 'Tom Wilson', avatar: 'tom' },
        { name: 'Steve Johnson', avatar: 'steve' },
        { name: 'Matt Brown', avatar: 'matt' },
        { name: 'Alex Taylor', avatar: 'alex' },
        { name: 'Nick Davis', avatar: 'nick' }
      ],
      peopleYouMayKnow: [
        { name: 'Sarah Miller', avatar: 'sarah' },
        { name: 'John Smith', avatar: 'john' },
        { name: 'Lisa Johnson', avatar: 'lisa' },
        { name: 'Mark Williams', avatar: 'mark' },
        { name: 'Amy Rodriguez', avatar: 'amy' }
      ]
    };
  }

  // Meredith Mueller - Financial Analyst (Hiking, brunch, pets)
  if (resultId === 'meredith2' || resultId.includes('meredith')) {
    return {
      name: 'Meredith Mueller',
      friends: '380 friends',
      photos: 142,
      posts: [
        {
          author: 'Meredith Mueller',
          authorAvatar: 'meredith-avatar',
          time: '2d',
          content: 'Sunday brunch with the best crew! 🥐☕ Nothing beats good food and great conversation.',
          likes: 112,
          comments: 15,
          shares: 4,
          image: 'brunch'
        },
        {
          author: 'Meredith Mueller',
          authorAvatar: 'meredith-avatar',
          time: '5d',
          content: 'Morning hike at Starved Rock State Park. The fall colors are absolutely stunning! Nature never fails to recharge me.',
          likes: 156,
          comments: 22,
          shares: 7,
          image: 'hiking'
        },
        {
          author: 'Meredith Mueller',
          authorAvatar: 'meredith-avatar',
          time: '1w',
          content: 'My little fur baby being adorable as always. How can you resist that face? 🐕',
          likes: 203,
          comments: 31,
          shares: 2,
          image: 'dog'
        }
      ],
      about: {
        work: ['Financial Analyst at Great Lakes Financial Services'],
        education: ['University of Michigan'],
        places: ['Chicago, Illinois'],
        basic: ['Born on June 22, 1997']
      },
      friendsList: [
        { name: 'Emma Johnson', avatar: 'emma' },
        { name: 'Sophie Williams', avatar: 'sophie' },
        { name: 'Olivia Brown', avatar: 'olivia' },
        { name: 'Grace Martinez', avatar: 'grace' },
        { name: 'Lily Anderson', avatar: 'lily' },
        { name: 'Chloe Taylor', avatar: 'chloe' },
        { name: 'Maya Davis', avatar: 'maya' },
        { name: 'Ava Garcia', avatar: 'ava' },
        { name: 'Zoe Rodriguez', avatar: 'zoe' }
      ],
      peopleYouMayKnow: [
        { name: 'Rachel Green', avatar: 'rachel' },
        { name: 'Jessica White', avatar: 'jessica' },
        { name: 'Amanda Lee', avatar: 'amanda' },
        { name: 'Nicole Kim', avatar: 'nicole' },
        { name: 'Michelle Park', avatar: 'michelle' }
      ]
    };
  }

  // Tremayne Washington - Financial Analyst (Music, food, family)
  if (resultId === 'tremayne7' || resultId.includes('tremayne')) {
    return {
      name: 'Tremayne Washington',
      friends: '390 friends',
      photos: 148,
      posts: [
        {
          author: 'Tremayne Washington',
          authorAvatar: 'tremayne-avatar',
          time: '2d',
          content: 'Weekend vibes with some good music and great food! Nothing beats spending time with family and friends. 🎵🍕',
          likes: 95,
          comments: 14,
          shares: 3,
          image: 'music-food'
        },
        {
          author: 'Tremayne Washington',
          authorAvatar: 'tremayne-avatar',
          time: '5d',
          content: 'Family dinner tonight! So grateful for these moments. Food always tastes better when shared with loved ones.',
          likes: 112,
          comments: 18,
          shares: 4,
          image: 'family-dinner'
        },
        {
          author: 'Tremayne Washington',
          authorAvatar: 'tremayne-avatar',
          time: '1w',
          content: 'New music discovery of the week - always on the lookout for fresh sounds! What are you listening to?',
          likes: 78,
          comments: 12,
          shares: 2,
          image: 'music'
        }
      ],
      about: {
        work: ['Financial Analyst at Chicago Investment Partners'],
        education: ['University of Michigan'],
        places: ['Chicago, Illinois'],
        basic: ['Born on November 18, 1997']
      },
      friendsList: [
        { name: 'Marcus Johnson', avatar: 'marcus' },
        { name: 'Jordan Williams', avatar: 'jordan' },
        { name: 'Taylor Davis', avatar: 'taylor' },
        { name: 'Alex Thompson', avatar: 'alex' },
        { name: 'Casey Brown', avatar: 'casey' },
        { name: 'Jamal Washington', avatar: 'jamal' },
        { name: 'Devin Harris', avatar: 'devin' },
        { name: 'Kendrick Moore', avatar: 'kendrick' },
        { name: 'Terrell Jackson', avatar: 'terrell' }
      ],
      peopleYouMayKnow: [
        { name: 'Michael Brown', avatar: 'michael' },
        { name: 'David Wilson', avatar: 'david' },
        { name: 'Chris Anderson', avatar: 'chris' },
        { name: 'Ryan Martinez', avatar: 'ryan' },
        { name: 'Kevin Taylor', avatar: 'kevin' }
      ]
    };
  }

  // Tanisha Jefferson - Financial Analyst (Books, fitness, friends)
  if (resultId === 'tanisha3' || resultId.includes('tanisha')) {
    return {
      name: 'Tanisha Jefferson',
      friends: '450 friends',
      photos: 178,
      posts: [
        {
          author: 'Tanisha Jefferson',
          authorAvatar: 'tanisha-avatar',
          time: '1d',
          content: 'Just finished "The Intelligent Investor" - such a timeless classic! Always learning something new about value investing. 📚',
          likes: 94,
          comments: 11,
          shares: 3,
          image: 'book'
        },
        {
          author: 'Tanisha Jefferson',
          authorAvatar: 'tanisha-avatar',
          time: '4d',
          content: 'Morning run complete! 5 miles before work. Starting the day strong! 💪 #FitnessJourney',
          likes: 128,
          comments: 19,
          shares: 5,
          image: 'running'
        },
        {
          author: 'Tanisha Jefferson',
          authorAvatar: 'tanisha-avatar',
          time: '1w',
          content: 'Book club night! Discussing "Thinking, Fast and Slow" - fascinating insights into behavioral economics and decision-making.',
          likes: 76,
          comments: 14,
          shares: 2,
          image: 'book-club'
        },
        {
          author: 'Tanisha Jefferson',
          authorAvatar: 'tanisha-avatar',
          time: '2w',
          content: 'Gym session with my workout buddy! Accountability makes all the difference. 🏋️‍♀️',
          likes: 102,
          comments: 16,
          shares: 4,
          image: 'gym'
        }
      ],
      about: {
        work: ['Financial Analyst at Chicago Financial Group'],
        education: ['University of Michigan'],
        places: ['Chicago, Illinois'],
        basic: ['Born on September 8, 1997']
      },
      friendsList: [
        { name: 'Keisha Williams', avatar: 'keisha' },
        { name: 'Jasmine Moore', avatar: 'jasmine' },
        { name: 'Aaliyah Jackson', avatar: 'aaliyah' },
        { name: 'Nia Robinson', avatar: 'nia' },
        { name: 'Maya Thompson', avatar: 'maya' },
        { name: 'Zara Mitchell', avatar: 'zara' },
        { name: 'Imani Davis', avatar: 'imani' },
        { name: 'Sanaa Brown', avatar: 'sanaa' },
        { name: 'Kiana Taylor', avatar: 'kiana' }
      ],
      peopleYouMayKnow: [
        { name: 'Monique Johnson', avatar: 'monique' },
        { name: 'Danielle White', avatar: 'danielle' },
        { name: 'Brittany Harris', avatar: 'brittany' },
        { name: 'Tiffany Lewis', avatar: 'tiffany' },
        { name: 'Crystal Young', avatar: 'crystal' }
      ]
    };
  }

  // Fallback for other Michael Johnson results (as previously implemented)
  return {
    name: 'Michael Johnson',
    friends: '1.2K friends',
    photos: 120,
    posts: [
      {
        author: 'Michael Johnson',
        authorAvatar: resultId,
        time: '2h',
        content: 'Just finished a great workout!',
        likes: 120,
        comments: 12,
        shares: 5
      }
    ],
    about: {
      work: ['Software Engineer at Tech Corp'],
      education: ['University of Washington'],
      places: ['Seattle, WA']
    },
    friendsList: [],
    peopleYouMayKnow: []
  };
};
