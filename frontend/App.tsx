import React, { useState } from 'react';
import { ProfileForm } from './components/ProfileForm';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { DeploymentGuide } from './components/DeploymentGuide';
import { generateRoadmap } from './services/geminiService';
import { UserProfile, RoadmapStep, AppTab } from './types';
import { BrainCircuit, Code2, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AppTab>('generator');
    const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRoadmap = async (profile: UserProfile) => {
        setIsLoading(true);
        setError(null);
        try {
            const generatedRoadmap = await generateRoadmap(profile);
            setRoadmap(generatedRoadmap);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            setRoadmap(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <BrainCircuit className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">LearnPath AI</span>
                        </div>
                        
                        {/* Navigation Tabs */}
                        <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('generator')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2
                                    ${activeTab === 'generator' 
                                        ? 'bg-white text-primary-700 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                <Sparkles className="w-4 h-4" />
                                Generator
                            </button>
                            <button
                                onClick={() => setActiveTab('deployment')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2
                                    ${activeTab === 'deployment' 
                                        ? 'bg-white text-primary-700 shadow-sm' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                <Code2 className="w-4 h-4" />
                                Deployment
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {activeTab === 'generator' ? (
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
                                Master Any Skill, <span className="text-primary-600">Your Way</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-xl text-gray-500">
                                Tell us who you are and what you want to learn. Our AI will build a structured, personalized roadmap just for you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Form Section */}
                            <div className={`lg:col-span-5 transition-all duration-500 ${roadmap ? 'lg:sticky lg:top-24' : 'lg:col-start-4 lg:col-span-6'}`}>
                                <ProfileForm onSubmit={handleGenerateRoadmap} isLoading={isLoading} />
                                
                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                )}
                            </div>

                            {/* Results Section */}
                            {roadmap && (
                                <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <RoadmapTimeline roadmap={roadmap} />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <DeploymentGuide />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                    <p className="text-gray-500 text-sm text-center">
                        Built with React, Tailwind CSS, and Google Gemini AI.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;
