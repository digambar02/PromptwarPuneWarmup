import { GoogleGenAI, Type } from '@google/genai';
import { UserProfile, RoadmapStep } from '../types';

// Initialize the SDK. It expects process.env.API_KEY to be available in the environment.
// In a real browser environment without a bundler injecting env vars, this might fail if not handled.
// For this specific environment setup, we assume it's provided or we handle it gracefully.
const getAIClient = () => {
    try {
        return new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI. Ensure API_KEY is set.", e);
        return null;
    }
};

export const generateRoadmap = async (profile: UserProfile): Promise<RoadmapStep[]> => {
    const ai = getAIClient();
    if (!ai) {
        throw new Error("AI Client not initialized. Missing API Key.");
    }

    const prompt = `
    Act as an expert educational counselor and curriculum designer.
    Create a highly personalized, step-by-step learning roadmap for a user with the following profile:
    - Age: ${profile.age}
    - Current Education Level: ${profile.educationLevel}
    - Goal/Topic to Learn: ${profile.learningGoal}
    - Available Time Commitment: ${profile.timeCommitment}

    The roadmap should be realistic, structured logically from beginner to advanced (relative to their goal), and tailored to their age and education level.
    Break it down into distinct phases.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    description: "A list of sequential steps in the learning roadmap.",
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            phase: {
                                type: Type.STRING,
                                description: "The overarching phase name, e.g., 'Phase 1: Fundamentals' or 'Month 1'."
                            },
                            title: {
                                type: Type.STRING,
                                description: "A concise title for this specific step."
                            },
                            description: {
                                type: Type.STRING,
                                description: "A detailed explanation of what the user will learn in this step and why it's important."
                            },
                            estimatedDuration: {
                                type: Type.STRING,
                                description: "Estimated time to complete this step based on their time commitment, e.g., '2 weeks'."
                            },
                            keyConcepts: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "3-5 specific concepts or skills to master in this step."
                            },
                            recommendedResources: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "2-3 types of resources to use (e.g., 'Interactive tutorials', 'Specific book title', 'YouTube crash course'). Keep it general but helpful."
                            }
                        },
                        required: ["phase", "title", "description", "estimatedDuration", "keyConcepts", "recommendedResources"]
                    }
                }
            }
        });

        if (!response.text) {
            throw new Error("Empty response from AI");
        }

        const roadmapData: RoadmapStep[] = JSON.parse(response.text);
        return roadmapData;

    } catch (error) {
        console.error("Error generating roadmap:", error);
        throw new Error("Failed to generate roadmap. Please try again.");
    }
};
