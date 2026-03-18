import React, { useState } from 'react';

type Prompt = {
  question: string;
  answer?: string;
  choices?: string[];
};

type Profile = {
  id: string;
  name: string;
  initials: string;
  age: number;
  height: string;
  location: string;
  job: string;
  imageUrl: string;
  prompts: Prompt[];
};

// Get image path based on profile index
const getImagePath = (index: number) => {
  // First 8 profiles (Group A) use white american images
  // Next 8 profiles (Group B) use african american images
  if (index < 8) {
    return `/images/white american/${(index % 8) + 1}.jpg`;
  } else {
    return `/images/african american/${(index % 8) + 1}.jpg`;
  }
};

const PROFILES: Profile[] = [
  // Group A (0-7)
  {
    id: 'a1',
    name: 'Michael',
    initials: 'MJ',
    age: 30,
    height: "5' 10\"",
    location: 'Raleigh, NC',
    job: 'Product Manager',
    imageUrl: getImagePath(0),
    prompts: [
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      },
      {
        question: 'I want someone who',
        answer: 'Can make me laugh and doesn\'t take life too seriously. Someone who loves good food and great conversations.'
      },
      {
        question: 'The way to win me over is',
        answer: 'Show genuine interest in what I care about, and bring your sense of humor to every conversation.'
      }
    ]
  },
  {
    id: 'a2',
    name: 'Emily',
    initials: 'ES',
    age: 29,
    height: "5' 6\"",
    location: 'Atlanta, GA',
    job: 'Software Engineer',
    imageUrl: getImagePath(1),
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Morning coffee, sunset walks, and trying new restaurants. The little moments that make life beautiful.'
      },
      {
        question: 'I\'ll fall for you if',
        answer: 'You can make me laugh and appreciate good food as much as I do. Bonus points for a great playlist.'
      },
      {
        question: 'The best way to ask me out is',
        choices: ['Over text', 'In person', 'Through a friend']
      }
    ]
  },
  {
    id: 'a3',
    name: 'Zephyr',
    initials: 'ZW',
    age: 31,
    height: "6' 0\"",
    location: 'Raleigh, NC',
    job: 'Designer',
    imageUrl: getImagePath(2),
    prompts: [
      {
        question: 'My ideal weekend',
        answer: 'Brunch with friends, exploring local markets, and live music. Always looking for the next adventure.'
      },
      {
        question: 'I\'m looking for',
        answer: 'Someone who loves adventure and deep conversations over wine. Let\'s explore the world together.'
      },
      {
        question: 'My most irrational fear',
        answer: 'Running out of good coffee. Also, forgetting someone\'s name right after they tell me.'
      }
    ]
  },
  {
    id: 'a4',
    name: 'David',
    initials: 'DC',
    age: 28,
    height: "5' 11\"",
    location: 'Chicago, IL',
    job: 'Marketing Director',
    imageUrl: getImagePath(3),
    prompts: [
      {
        question: 'My love language',
        answer: 'Quality time and trying new restaurants together. Food is definitely a love language.'
      },
      {
        question: 'A random fact I love',
        answer: 'I\'ve visited 25 countries and counting. Always planning the next trip.'
      },
      {
        question: 'The best way to ask me out is',
        choices: ['Over text', 'In person', 'Through a friend']
      }
    ]
  },
  {
    id: 'a5',
    name: 'Sarah',
    initials: 'SW',
    age: 30,
    height: "5' 7\"",
    location: 'Atlanta, GA',
    job: 'Data Scientist',
    imageUrl: getImagePath(4),
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Morning coffee, sunset walks, and a good book. The quiet moments are my favorite.'
      },
      {
        question: 'I\'ll fall for you if',
        answer: 'You\'re kind, curious, and have a great sense of humor. Intelligence is also very attractive.'
      },
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      }
    ]
  },
  {
    id: 'a6',
    name: 'James',
    initials: 'JB',
    age: 32,
    height: "6' 1\"",
    location: 'Raleigh, NC',
    job: 'Consultant',
    imageUrl: getImagePath(5),
    prompts: [
      {
        question: 'My ideal weekend',
        answer: 'Hiking, reading, and cooking something new. Balance is everything.'
      },
      {
        question: 'I\'m a great plus-one because',
        answer: 'I\'m a great conversationalist and always up for trying new things. Plus, I make excellent cocktails.'
      },
      {
        question: 'The way to win me over is',
        answer: 'Show me your favorite local spot and tell me why you love it. I appreciate authenticity.'
      }
    ]
  },
  {
    id: 'a7',
    name: 'Amara',
    initials: 'AK',
    age: 29,
    height: "5' 5\"",
    location: 'Chicago, IL',
    job: 'Writer',
    imageUrl: getImagePath(6),
    prompts: [
      {
        question: 'My love language',
        answer: 'Words of affirmation and acts of service. Show me you care through both words and actions.'
      },
      {
        question: 'A random fact I love',
        answer: 'I\'ve published two short story collections. Writing is my passion and my escape.'
      },
      {
        question: 'The best way to ask me out is',
        choices: ['Over text', 'In person', 'Through a friend']
      }
    ]
  },
  {
    id: 'a8',
    name: 'Ryan',
    initials: 'RM',
    age: 31,
    height: "5' 9\"",
    location: 'Atlanta, GA',
    job: 'Engineer',
    imageUrl: getImagePath(7),
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Weekend projects, good music, and great company. Life\'s about the simple things.'
      },
      {
        question: 'I\'ll fall for you if',
        answer: 'You\'re passionate about something and can teach me about it. I love learning from people.'
      },
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      }
    ]
  },
  // Group B (8-15)
  {
    id: 'b1',
    name: 'Michael',
    initials: 'MJ',
    age: 30,
    height: "5' 10\"",
    location: 'Raleigh, NC',
    job: 'Sales Manager',
    imageUrl: getImagePath(8),
    prompts: [
      {
        question: 'My ideal weekend',
        answer: 'Golf, good food, and time with friends. Always up for a good time.'
      },
      {
        question: 'I\'m looking for',
        answer: 'Someone who shares my love for travel and good conversation. Let\'s explore together.'
      },
      {
        question: 'My most irrational fear',
        answer: 'Running out of good coffee. Also, being stuck in traffic with no music.'
      }
    ]
  },
  {
    id: 'b2',
    name: 'Emily',
    initials: 'ES',
    age: 29,
    height: "5' 6\"",
    location: 'Chicago, IL',
    job: 'Teacher',
    imageUrl: getImagePath(9),
    prompts: [
      {
        question: 'My love language',
        answer: 'Quality time and thoughtful gestures. It\'s the little things that matter most.'
      },
      {
        question: 'A random fact I love',
        answer: 'I speak three languages fluently. Always learning something new.'
      },
      {
        question: 'The best way to ask me out is',
        choices: ['Over text', 'In person', 'Through a friend']
      }
    ]
  },
  {
    id: 'b3',
    name: 'Christopher',
    initials: 'CA',
    age: 32,
    height: "6' 0\"",
    location: 'Raleigh, NC',
    job: 'Financial Analyst',
    imageUrl: getImagePath(10),
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Early morning runs, crossword puzzles, and home-cooked meals. Routine brings me peace.'
      },
      {
        question: 'I\'ll fall for you if',
        answer: 'You\'re genuine, ambitious, and love a good debate. Intellectual connection is key.'
      },
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      }
    ]
  },
  {
    id: 'b4',
    name: 'Jessica',
    initials: 'JT',
    age: 28,
    height: "5' 8\"",
    location: 'Atlanta, GA',
    job: 'Nurse',
    imageUrl: getImagePath(11),
    prompts: [
      {
        question: 'My ideal weekend',
        answer: 'Yoga, farmers market, and catching up with friends. Self-care is important to me.'
      },
      {
        question: 'I\'m a great plus-one because',
        answer: 'I\'m easygoing, fun to be around, and always up for an adventure. Let\'s make memories.'
      },
      {
        question: 'The way to win me over is',
        answer: 'Show me kindness and respect. Those qualities go a long way with me.'
      }
    ]
  },
  {
    id: 'b5',
    name: 'Daniel',
    initials: 'DW',
    age: 31,
    height: "5' 11\"",
    location: 'Chicago, IL',
    job: 'Chef',
    imageUrl: getImagePath(12),
    prompts: [
      {
        question: 'A random fact I love',
        answer: 'I trained in Paris for two years. Food is my passion and my art.'
      },
      {
        question: 'My love language',
        answer: 'Acts of service and cooking for someone special. Food brings people together.'
      },
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      }
    ]
  },
  {
    id: 'b6',
    name: 'Olivia',
    initials: 'OD',
    age: 30,
    height: "5' 7\"",
    location: 'Raleigh, NC',
    job: 'Photographer',
    imageUrl: getImagePath(13),
    prompts: [
      {
        question: 'My simple pleasures',
        answer: 'Golden hour light, film photography, and quiet mornings. Beauty is everywhere.'
      },
      {
        question: 'I\'ll fall for you if',
        answer: 'You appreciate art, nature, and the little things in life. Let\'s capture moments together.'
      },
      {
        question: 'My most irrational fear',
        answer: 'Running out of film. Also, missing the perfect shot because I was too busy talking.'
      }
    ]
  },
  {
    id: 'b7',
    name: 'Matthew',
    initials: 'MG',
    age: 29,
    height: "6' 2\"",
    location: 'Atlanta, GA',
    job: 'Lawyer',
    imageUrl: getImagePath(14),
    prompts: [
      {
        question: 'My ideal weekend',
        answer: 'Reading, hiking, and trying new restaurants. Balance between work and play.'
      },
      {
        question: 'I\'m looking for',
        answer: 'Someone who values integrity and intellectual conversations. Let\'s challenge each other.'
      },
      {
        question: 'The best way to ask me out is',
        choices: ['Over text', 'In person', 'Through a friend']
      }
    ]
  },
  {
    id: 'b8',
    name: 'Sophia',
    initials: 'SR',
    age: 30,
    height: "5' 6\"",
    location: 'Chicago, IL',
    job: 'Architect',
    imageUrl: getImagePath(15),
    prompts: [
      {
        question: 'A random fact I love',
        answer: 'I\'ve designed buildings in five different countries. Architecture is my passion.'
      },
      {
        question: 'My love language',
        answer: 'Physical touch and quality time exploring new places. Let\'s build something together.'
      },
      {
        question: 'The best spot in town for pizza is',
        choices: ['Tony\'s Pizzeria', 'The Corner Slice', 'Mario\'s Italian Kitchen']
      }
    ]
  }
];

const HingeMock: React.FC = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const currentProfile = PROFILES[currentProfileIndex];

  const handleAction = () => {
    setCurrentProfileIndex((prev) => (prev + 1) % PROFILES.length);
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex items-center justify-center p-4">
      {/* Phone Container */}
      <div className="w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden" style={{ height: '844px', width: '390px' }}>
        {/* Top Navigation Bar */}
        <div className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">h</span>
            </div>
            <span className="text-xl font-bold text-gray-900 lowercase">hinge</span>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="bg-[#F5F5F5] overflow-y-auto" style={{ height: 'calc(844px - 60px - 100px)' }}>
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Photo Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: '4/5' }}>
              <img
                src={currentProfile.imageUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover blur-md"
              />
            </div>

            {/* Prompt Cards */}
            {currentProfile.prompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                {/* Prompt Question */}
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  {prompt.question}
                </p>

                {/* Answer or Choices */}
                {prompt.choices ? (
                  <div className="space-y-3">
                    {prompt.choices.map((choice, choiceIdx) => (
                      <button
                        key={choiceIdx}
                        className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-left transition-colors"
                      >
                        <p className="text-lg font-semibold text-gray-900">
                          {choice}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg text-gray-900 leading-relaxed font-medium">
                    {prompt.answer}
                  </p>
                )}
              </div>
            ))}

            {/* Attribute Row Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              {/* Initials */}
              <div className="flex items-center justify-center mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{currentProfile.initials}</span>
                </div>
              </div>
              
              {/* First Row: Age, Height, Location */}
              <div className="flex items-center justify-around mb-4">
                {/* Age */}
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{currentProfile.age}</span>
                </div>

                {/* Height */}
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{currentProfile.height}</span>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center gap-1">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{currentProfile.location}</span>
                </div>
              </div>

              {/* Job Row */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{currentProfile.job}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="h-[100px] bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center gap-3 px-6">
          {/* Rewind Button */}
          <button
            disabled
            className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>

          {/* Red X Button */}
          <button
            onClick={handleAction}
            className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 text-red-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Blue Star Button */}
          <button
            onClick={handleAction}
            className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 text-blue-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>

          {/* Green Heart Button */}
          <button
            onClick={handleAction}
            className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 text-green-500 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Sparkles Button */}
          <button
            disabled
            className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HingeMock;
