import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BookOpen, Clock, GraduationCap, User } from 'lucide-react';

interface ProfileFormProps {
    onSubmit: (profile: UserProfile) => void;
    isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isLoading }) => {
    const [profile, setProfile] = useState<UserProfile>({
        age: '',
        educationLevel: 'High School',
        learningGoal: '',
        timeCommitment: '5-10 hours/week'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (profile.age && profile.learningGoal) {
            onSubmit(profile);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-primary-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Design Your Path
                </h2>
                <p className="text-primary-100 mt-2 text-sm">
                    Tell us about yourself and what you want to achieve, and our AI will craft a custom learning journey.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div className="space-y-2">
                        <label htmlFor="age" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <User className="w-4 h-4 text-gray-400" />
                            Your Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            min="5"
                            max="120"
                            required
                            value={profile.age}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="e.g., 25"
                        />
                    </div>

                    {/* Education Level */}
                    <div className="space-y-2">
                        <label htmlFor="educationLevel" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <GraduationCap className="w-4 h-4 text-gray-400" />
                            Current Education
                        </label>
                        <select
                            id="educationLevel"
                            name="educationLevel"
                            value={profile.educationLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                        >
                            <option value="Middle School">Middle School</option>
                            <option value="High School">High School</option>
                            <option value="Some College">Some College</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree or Higher">Master's Degree or Higher</option>
                            <option value="Self-Taught / Other">Self-Taught / Other</option>
                        </select>
                    </div>
                </div>

                {/* Time Commitment */}
                <div className="space-y-2">
                    <label htmlFor="timeCommitment" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        Available Time
                    </label>
                    <select
                        id="timeCommitment"
                        name="timeCommitment"
                        value={profile.timeCommitment}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                    >
                        <option value="1-2 hours/week">Casual (1-2 hours/week)</option>
                        <option value="5-10 hours/week">Part-time (5-10 hours/week)</option>
                        <option value="15-20 hours/week">Dedicated (15-20 hours/week)</option>
                        <option value="40+ hours/week">Full-time (40+ hours/week)</option>
                    </select>
                </div>

                {/* Learning Goal */}
                <div className="space-y-2">
                    <label htmlFor="learningGoal" className="block text-sm font-medium text-gray-700">
                        What do you want to learn?
                    </label>
                    <textarea
                        id="learningGoal"
                        name="learningGoal"
                        required
                        rows={3}
                        value={profile.learningGoal}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                        placeholder="e.g., I want to become a frontend web developer using React, or I want to learn conversational Spanish for a trip."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg transition-all duration-200 flex justify-center items-center gap-2
                        ${isLoading 
                            ? 'bg-primary-400 cursor-not-allowed' 
                            : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg active:transform active:scale-[0.98]'
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Roadmap...
                        </>
                    ) : (
                        'Generate My Roadmap'
                    )}
                </button>
            </form>
        </div>
    );
};
