// Utility to generate specific LinkedIn profile data for Adeeb Khaja Mohamed
import { getFakeImageUrl } from './fakeImages';

export interface LinkedInProfileData {
  name: string;
  headline: string;
  location: string;
  link: string;
  followers: string;
  connections: string;
  about?: string;
  analytics: {
    profileViews: number;
    postImpressions: number;
    searchAppearances: number;
  };
  activity: Array<{
    type: 'post' | 'comment';
    content: string;
    likes: number;
    comments: number;
    time: string;
    image?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    location?: string;
    logo?: string;
    description?: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    field?: string;
    years?: string;
  }>;
  skills: string[];
  suggestedProfiles: Array<{
    name: string;
    title: string;
    company: string;
    seed: string;
  }>;
}

export const generateLinkedInProfile = (resultId: string): LinkedInProfileData => {
  if (resultId.includes('adeeb')) {
    return {
      name: 'Adeeb Khaja Mohamed',
      headline: 'Graduate Research Assistant @ George Mason University | Data Analytics Engineering',
      location: 'Fairfax, Virginia, United States · Contact info',
      link: 'https://www.adeebkm.in/',
      followers: '875',
      connections: '500+',
      about: 'Currently pursuing a Master of Science in Data Analytics Engineering at George Mason University, I contribute as a Graduate Research Assistant at the Costello College of Business. My work emphasizes data analysis, AI-driven methodologies, and web application development. The role builds upon prior experience in urban air mobility research, where I developed collision-avoidance systems and scalable web applications integrating real-time data processing.',
      analytics: {
        profileViews: 28,
        postImpressions: 32,
        searchAppearances: 19
      },
      activity: [
        {
          type: 'post',
          content: "I'm happy to share that I'm starting a new position as Graduate Research Assistant at George Mason University - Costello College of Business!",
          likes: 90,
          comments: 15,
          time: '5mo',
          image: 'starting-new-position'
        },
        {
          type: 'post',
          content: "Participated in my first hackathon. Gained a lot of knowledge through this hackathon. Hoping to participate in further hackathons. ...more",
          likes: 47,
          comments: 1,
          time: '3yr',
          image: 'hackathon'
        }
      ],
      experience: [
        {
          title: 'Graduate Research Assistant',
          company: 'George Mason University - Costello College of Business · Full-time',
          duration: 'Aug 2025 - Present · 7 mos',
          location: 'Fairfax, Virginia, United States · On-site',
        },
        {
          title: 'Research Intern',
          company: 'Department of Electronic Systems Engineering (DESE, Formerly CEDT), IISc · Internship',
          duration: 'Oct 2023 - Jul 2024 · 10 mos',
          location: 'Bengaluru, Karnataka, India · On-site',
          description: [
            'Contributed to an AI-driven urban air mobility project funded by Boeing at IISc.',
            'Developed collision-avoidance mechanisms using the A* algorithm for air traffic management.'
          ]
        },
        {
          title: 'App Developer',
          company: 'Journyz · Internship',
          duration: 'Jan 2023 - Apr 2023 · 4 mos',
          location: 'Chicago, Illinois, United States'
        },
        {
          title: 'Under 25 Universe · Internship',
          company: 'Internship · 11 mos',
          duration: 'Bengaluru, Karnataka, India',
          description: [
            'Student Leader (Dec 2022 - Mar 2023 · 4 mos)',
            'As a Student Leader, I was responsible for leading a team of hustlers and managing various aspects of the festival. The festival had over 35k+ students attending and featured 7 stages with more than 50C ...see more',
            'Snapchat Opinion Leader (May 2022 - Jan 2023 · 9 mos)',
            'Snapchat Opinion Leaders are students who are at the forefront of building a culture of Augmented Reality (AR) and Snapifying campuses across India. They are some of the smartest minds in the country.'
          ]
        }
      ],
      education: [
        {
          school: 'George Mason University',
          degree: 'Master of Science - MS',
          field: 'Data Analytics Engineering',
          years: 'Aug 2024'
        },
        {
          school: 'Ramaiah Institute Of Technology',
          degree: 'Bachelor of Engineering - BE',
          field: 'Information Science and Engineering',
          years: '2020 - 2024'
        }
      ],
      skills: ['Graphic Design', 'Augmented Reality (AR)', 'Data Analytics', 'Python', 'Machine Learning', 'AI'],
      suggestedProfiles: [
        { name: 'Ayush Daga', title: 'Aspiring Data Analytics & ML Enthusiast | Graduate...', company: '3rd+', seed: 'ayush' },
        { name: 'Akhilesh Kotegar', title: 'Aspiring Software developer |Java Backend Developer |...', company: '3rd+', seed: 'akhilesh' },
        { name: 'Amartya Shome', title: 'Student at George Mason University', company: '3rd+', seed: 'amartya' },
        { name: 'Prothoma Islam', title: 'Student at George Mason University', company: '3rd+', seed: 'prothoma' },
        { name: 'Marisa Parikh', title: 'Former Legal Intern | George Mason University Honors...', company: '3rd+', seed: 'marisa' }
      ]
    };
  }

  // Greg Krieger - Financial Analyst
  if (resultId === 'greg5' || resultId.includes('greg')) {
    return {
      name: 'Greg Krieger',
      headline: 'Financial Analyst | Investment Analysis & Portfolio Management',
      location: 'Chicago, Illinois, United States · Contact info',
      link: 'https://linkedin.com/in/gregkrieger',
      followers: '350',
      connections: '450+',
      about: 'Experienced Financial Analyst with a strong background in investment analysis and portfolio management. I specialize in conducting comprehensive financial analysis, developing investment strategies, and providing data-driven recommendations to support client portfolios. My expertise includes financial modeling, market research, and equity valuation. I am passionate about staying current with market trends and leveraging analytical tools to deliver actionable insights.',
      analytics: {
        profileViews: 45,
        postImpressions: 120,
        searchAppearances: 28
      },
      activity: [
        {
          type: 'post',
          content: 'Excited to share insights from our latest quarterly earnings analysis. The market continues to show interesting trends in the tech sector.',
          likes: 67,
          comments: 8,
          time: '2w',
        },
        {
          type: 'post',
          content: 'Great networking event at the Chicago Financial Analysts Society last week. Always inspiring to connect with fellow professionals in the industry.',
          likes: 42,
          comments: 5,
          time: '1mo',
        }
      ],
      experience: [
        {
          title: 'Financial Analyst',
          company: 'Midwest Capital Advisors · Full-time',
          duration: 'Jan 2020 - Present · 5 yrs 1 mo',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Conduct comprehensive financial analysis and modeling for investment portfolios',
            'Prepare detailed reports on market trends, company performance, and investment opportunities',
            'Collaborate with senior analysts on equity research and valuation projects',
            'Support client presentations and investment recommendations'
          ]
        },
        {
          title: 'Financial Analyst Intern',
          company: 'Chicago Investment Group · Internship',
          duration: 'Jun 2019 - Dec 2019 · 7 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Assisted in financial data collection and analysis',
            'Supported research team with market analysis and report preparation',
            'Participated in client meetings and presentations'
          ]
        }
      ],
      education: [
        {
          school: 'University of Michigan',
          degree: 'Bachelor of Business Administration - BBA',
          field: 'Finance',
          years: '2015 - 2019'
        }
      ],
      skills: ['Financial Analysis', 'Financial Modeling', 'Excel', 'Bloomberg Terminal', 'Portfolio Management', 'Investment Analysis', 'Valuation', 'Risk Management'],
      suggestedProfiles: [
        { name: 'Sarah Chen', title: 'Financial Analyst | Investment Research', company: '2nd', seed: 'sarah' },
        { name: 'Michael Rodriguez', title: 'Senior Financial Analyst | Portfolio Strategy', company: '2nd', seed: 'michael' },
        { name: 'Jennifer Park', title: 'Investment Analyst | Equity Research', company: '3rd+', seed: 'jennifer' },
        { name: 'David Kim', title: 'Financial Analyst | Risk Management', company: '3rd+', seed: 'david' },
        { name: 'Lisa Thompson', title: 'Associate Financial Analyst | Corporate Finance', company: '3rd+', seed: 'lisa' }
      ]
    };
  }

  // Meredith Mueller - Financial Analyst
  if (resultId === 'meredith6' || resultId.includes('meredith')) {
    return {
      name: 'Meredith Mueller',
      headline: 'Financial Analyst | Investment Research & Market Analysis',
      location: 'Chicago, Illinois, United States · Contact info',
      link: 'https://linkedin.com/in/meredithmueller',
      followers: '280',
      connections: '320+',
      about: 'Dedicated Financial Analyst focused on investment research and market analysis. I excel at analyzing financial data, identifying market trends, and developing strategic investment recommendations. My approach combines quantitative analysis with a deep understanding of market dynamics to help clients make informed investment decisions. I am committed to continuous learning and staying abreast of evolving market conditions.',
      analytics: {
        profileViews: 38,
        postImpressions: 95,
        searchAppearances: 22
      },
      activity: [
        {
          type: 'post',
          content: 'Just wrapped up an insightful analysis on emerging market trends. The data tells a fascinating story about consumer behavior shifts.',
          likes: 54,
          comments: 6,
          time: '3w',
        },
        {
          type: 'post',
          content: 'Weekend hike in the mountains - sometimes the best ideas come when you step away from the spreadsheets!',
          likes: 89,
          comments: 12,
          time: '1mo',
          image: 'hiking'
        }
      ],
      experience: [
        {
          title: 'Financial Analyst',
          company: 'Great Lakes Financial Services · Full-time',
          duration: 'Mar 2020 - Present · 4 yrs 11 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Perform in-depth financial analysis and create models for investment decision-making',
            'Research and analyze market conditions, industry trends, and company financials',
            'Develop investment recommendations based on quantitative and qualitative analysis',
            'Prepare comprehensive reports and presentations for management and clients'
          ]
        },
        {
          title: 'Junior Financial Analyst',
          company: 'North Shore Capital Partners · Full-time',
          duration: 'Jul 2019 - Feb 2020 · 8 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Supported senior analysts with financial modeling and data analysis',
            'Assisted in preparing quarterly earnings reports and market research',
            'Maintained financial databases and updated investment tracking systems'
          ]
        }
      ],
      education: [
        {
          school: 'University of Michigan',
          degree: 'Bachelor of Business Administration - BBA',
          field: 'Finance',
          years: '2015 - 2019'
        }
      ],
      skills: ['Financial Analysis', 'Financial Modeling', 'Excel', 'SQL', 'Investment Research', 'Market Analysis', 'Data Analysis', 'PowerPoint'],
      suggestedProfiles: [
        { name: 'Emily Johnson', title: 'Financial Analyst | Equity Research', company: '2nd', seed: 'emily' },
        { name: 'Robert Martinez', title: 'Senior Financial Analyst | Investment Strategy', company: '2nd', seed: 'robert' },
        { name: 'Amanda White', title: 'Investment Analyst | Portfolio Management', company: '3rd+', seed: 'amanda' },
        { name: 'James Wilson', title: 'Financial Analyst | Risk Analysis', company: '3rd+', seed: 'james' },
        { name: 'Rachel Brown', title: 'Associate Financial Analyst | Corporate Finance', company: '3rd+', seed: 'rachel' }
      ]
    };
  }

  // Tremayne Washington - Financial Analyst
  if (resultId === 'tremayne11' || resultId.includes('tremayne')) {
    return {
      name: 'Tremayne Washington',
      headline: 'Financial Analyst | Investment Analysis & Portfolio Management',
      location: 'Chicago, Illinois, United States · Contact info',
      link: 'https://linkedin.com/in/tremaynewashington',
      followers: '290',
      connections: '340+',
      about: 'Experienced Financial Analyst with expertise in investment analysis and portfolio management. I specialize in conducting comprehensive financial research, developing investment strategies, and providing data-driven recommendations. My approach combines quantitative analysis with market insights to help clients achieve their financial goals. Passionate about staying current with market trends and leveraging analytical tools to deliver actionable insights.',
      analytics: {
        profileViews: 41,
        postImpressions: 108,
        searchAppearances: 25
      },
      activity: [
        {
          type: 'post',
          content: 'Excited to share our latest market analysis. The tech sector continues to show strong fundamentals despite recent volatility.',
          likes: 58,
          comments: 7,
          time: '3w',
        },
        {
          type: 'post',
          content: 'Great discussion at the Chicago Financial Analysts Society meeting today. Always valuable to exchange ideas with fellow professionals.',
          likes: 45,
          comments: 6,
          time: '1mo',
        }
      ],
      experience: [
        {
          title: 'Financial Analyst',
          company: 'Chicago Investment Partners · Full-time',
          duration: 'Feb 2020 - Present · 5 yrs',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Conduct comprehensive financial analysis and modeling for investment portfolios',
            'Research and analyze market trends, company performance, and investment opportunities',
            'Prepare detailed reports on equity research and valuation projects',
            'Support client presentations and investment recommendations'
          ]
        },
        {
          title: 'Junior Financial Analyst',
          company: 'Midwest Financial Group · Full-time',
          duration: 'Aug 2019 - Jan 2020 · 6 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Assisted in financial data collection and analysis',
            'Supported research team with market analysis and report preparation',
            'Participated in client meetings and presentations'
          ]
        }
      ],
      education: [
        {
          school: 'University of Michigan',
          degree: 'Bachelor of Business Administration - BBA',
          field: 'Finance',
          years: '2015 - 2019'
        }
      ],
      skills: ['Financial Analysis', 'Financial Modeling', 'Excel', 'Bloomberg Terminal', 'Portfolio Management', 'Investment Analysis', 'Valuation', 'Risk Management'],
      suggestedProfiles: [
        { name: 'Marcus Johnson', title: 'Financial Analyst | Investment Research', company: '2nd', seed: 'marcus' },
        { name: 'Jordan Williams', title: 'Senior Financial Analyst | Portfolio Strategy', company: '2nd', seed: 'jordan' },
        { name: 'Taylor Davis', title: 'Investment Analyst | Equity Research', company: '3rd+', seed: 'taylor' },
        { name: 'Alex Thompson', title: 'Financial Analyst | Risk Management', company: '3rd+', seed: 'alex' },
        { name: 'Casey Brown', title: 'Associate Financial Analyst | Corporate Finance', company: '3rd+', seed: 'casey' }
      ]
    };
  }

  // Tanisha Jefferson - Financial Analyst
  if (resultId === 'tanisha1' || resultId.includes('tanisha')) {
    return {
      name: 'Tanisha Jefferson',
      headline: 'Financial Analyst | Investment Analysis & Strategic Planning',
      location: 'Chicago, Illinois, United States · Contact info',
      link: 'https://linkedin.com/in/tanishajefferson',
      followers: '420',
      connections: '380+',
      about: 'Results-driven Financial Analyst specializing in investment analysis and strategic planning. With expertise in financial modeling, portfolio management, and market research, I help organizations make data-driven investment decisions. I am passionate about combining analytical rigor with strategic thinking to deliver comprehensive financial insights. Always eager to explore new investment opportunities and contribute to long-term financial success.',
      analytics: {
        profileViews: 52,
        postImpressions: 145,
        searchAppearances: 31
      },
      activity: [
        {
          type: 'post',
          content: 'Just finished reading an excellent book on behavioral finance. Always looking to expand my understanding of market psychology and investor behavior.',
          likes: 73,
          comments: 9,
          time: '1w',
        },
        {
          type: 'post',
          content: 'Morning workout complete! Staying active helps me stay sharp for the day ahead. #FitnessGoals',
          likes: 98,
          comments: 15,
          time: '2w',
          image: 'fitness'
        }
      ],
      experience: [
        {
          title: 'Financial Analyst',
          company: 'Chicago Financial Group · Full-time',
          duration: 'Aug 2019 - Present · 5 yrs 6 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Lead financial analysis projects and develop investment strategies for client portfolios',
            'Create detailed financial models and forecasts to support investment decisions',
            'Analyze market trends, economic indicators, and company performance metrics',
            'Present findings and recommendations to senior management and clients'
          ]
        },
        {
          title: 'Financial Analyst Intern',
          company: 'Lakefront Investment Advisors · Internship',
          duration: 'May 2018 - Aug 2018 · 4 mos',
          location: 'Chicago, Illinois, United States · On-site',
          description: [
            'Assisted in financial data analysis and report preparation',
            'Supported investment research team with market analysis',
            'Participated in client meetings and learned investment advisory processes'
          ]
        }
      ],
      education: [
        {
          school: 'University of Michigan',
          degree: 'Bachelor of Business Administration - BBA',
          field: 'Finance',
          years: '2015 - 2019'
        }
      ],
      skills: ['Financial Analysis', 'Financial Modeling', 'Excel', 'Python', 'Investment Analysis', 'Strategic Planning', 'Data Visualization', 'Tableau'],
      suggestedProfiles: [
        { name: 'Jessica Taylor', title: 'Financial Analyst | Investment Research', company: '2nd', seed: 'jessica' },
        { name: 'Christopher Lee', title: 'Senior Financial Analyst | Portfolio Strategy', company: '2nd', seed: 'christopher' },
        { name: 'Nicole Anderson', title: 'Investment Analyst | Equity Research', company: '3rd+', seed: 'nicole' },
        { name: 'Kevin Davis', title: 'Financial Analyst | Risk Management', company: '3rd+', seed: 'kevin' },
        { name: 'Michelle Garcia', title: 'Associate Financial Analyst | Corporate Finance', company: '3rd+', seed: 'michelle' }
      ]
    };
  }

  // Fallback for Michael Johnson
  return {
    name: 'Michael Johnson',
    headline: 'Senior Software Engineer',
    location: 'Seattle, WA',
    link: 'https://linkedin.com/in/mjohnson',
    followers: '1.2K',
    connections: '500+',
    about: 'Experienced software engineer with a passion for building scalable applications and solving complex technical challenges.',
    analytics: { profileViews: 120, postImpressions: 450, searchAppearances: 35 },
    activity: [],
    experience: [],
    education: [],
    skills: [],
    suggestedProfiles: []
  };
};

export const getCompanyLogoUrl = (company: string, size: number = 40) => {
  const domainMap: Record<string, string> = {
    'George Mason University': 'gmu.edu',
    'University of Michigan': 'umich.edu',
    'Midwest Capital Advisors': 'midwestcapital.com',
    'Great Lakes Financial Services': 'greatlakesfinancial.com',
    'Chicago Financial Group': 'chicagofinancial.com',
    'Microsoft': 'microsoft.com',
    'Amazon': 'amazon.com',
    'Google': 'google.com',
    'Apple': 'apple.com',
    'Meta': 'meta.com',
    'Salesforce': 'salesforce.com',
    'Oracle': 'oracle.com',
    'IBM': 'ibm.com',
    'Deloitte': 'deloitte.com'
  };
  
  const domain = domainMap[company] || 'linkedin.com';
  return `https://logo.clearbit.com/${domain}?size=${size}`;
};
