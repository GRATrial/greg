import React from 'react';
import type { Profile } from '../profiles';

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  // Generate a gradient color based on profile id
  const getGradientColor = (id: string) => {
    const colors = [
      'from-purple-400 to-pink-400',
      'from-blue-400 to-cyan-400',
      'from-green-400 to-emerald-400',
      'from-orange-400 to-red-400',
      'from-indigo-400 to-purple-400',
      'from-pink-400 to-rose-400',
      'from-teal-400 to-blue-400',
      'from-yellow-400 to-orange-400',
    ];
    const index = parseInt(id.slice(1)) % colors.length;
    return colors[index];
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* Photo Section - 60% of height */}
      <div className="relative w-full flex-shrink-0" style={{ height: '60%' }}>
        {/* Placeholder image with gradient and initials */}
        <div className={`w-full h-full bg-gradient-to-br ${getGradientColor(profile.id)} flex items-center justify-center`}>
          <span className="text-6xl font-bold text-white opacity-90">
            {profile.initials}
          </span>
        </div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Name and age overlay */}
        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
          <h2 className="text-4xl font-bold mb-1 leading-tight">
            {profile.firstName}, {profile.age}
          </h2>
        </div>
      </div>
      
      {/* Content Section - 40% of height, scrollable */}
      <div className="flex-1 overflow-y-auto bg-white" style={{ minHeight: 0 }}>
        <div className="p-5 space-y-4 pb-6">
          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{profile.location}</span>
          </div>
          
          {/* Job */}
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{profile.jobTitle}</span>
            <span className="text-gray-500"> at </span>
            <span className="font-semibold">{profile.company}</span>
          </div>
          
          {/* Basic Info Tags */}
          <div className="flex flex-wrap gap-2">
            {profile.height && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {profile.height}
              </span>
            )}
            {profile.lifestyle?.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
          
          {/* Prompts */}
          <div className="space-y-4 pt-2">
            {profile.prompts.map((prompt, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {prompt.question}
                </p>
                <p className="text-base text-gray-800 leading-relaxed">
                  {prompt.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

