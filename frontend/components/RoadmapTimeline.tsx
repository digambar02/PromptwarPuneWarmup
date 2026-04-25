import React from 'react';
import { RoadmapStep } from '../types';
import { CheckCircle2, Clock, Lightbulb, Link as LinkIcon } from 'lucide-react';

interface RoadmapTimelineProps {
    roadmap: RoadmapStep[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap }) => {
    if (!roadmap || roadmap.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Personalized Learning Path</h2>
            
            <div className="relative border-l-4 border-primary-200 ml-4 md:ml-8 space-y-12 pb-12">
                {roadmap.map((step, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[14px] top-1 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full mb-2 uppercase tracking-wider">
                                        {step.phase}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                                    <Clock className="w-4 h-4" />
                                    {step.estimatedDuration}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {step.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Key Concepts */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                                        Key Concepts
                                    </h4>
                                    <ul className="space-y-2">
                                        {step.keyConcepts.map((concept, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>{concept}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Resources */}
                                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                                        <LinkIcon className="w-4 h-4 text-blue-500" />
                                        Recommended Resources
                                    </h4>
                                    <ul className="space-y-2">
                                        {step.recommendedResources.map((resource, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                <span>{resource}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
