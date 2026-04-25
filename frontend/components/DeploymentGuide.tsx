import React from 'react';
import { Server, Globe, Terminal, FileCode2, Rocket } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-800 p-8 text-white">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-blue-400" />
                    How to Deploy This Application
                </h2>
                <p className="text-slate-300 mt-3 text-lg">
                    This application is built as a modern, ESM-based React Single Page Application (SPA). 
                    Because it uses native ES modules and import maps, it doesn't strictly require a complex build step like Webpack or Vite to run, though you can easily adapt it to one.
                </p>
            </div>

            <div className="p-8 space-y-8">
                
                {/* Section 1: Architecture */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
                        <FileCode2 className="w-5 h-5 text-primary-600" />
                        Understanding the Architecture
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        This app uses an <code>index.html</code> file that contains an <strong>import map</strong>. This map tells the browser where to fetch dependencies (like React and GenAI) directly from CDNs (like esm.sh). The code is written in TypeScript, but for a production deployment without a build step, you would typically compile the <code>.tsx</code> files to <code>.js</code> first.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-sm text-yellow-800">
                            <strong>Important Note on API Keys:</strong> This application uses the Google GenAI SDK. In a real-world production scenario, you should <strong>never</strong> expose your API key in the frontend code. You should create a small backend proxy (e.g., using Node.js, Cloudflare Workers, or Vercel Serverless Functions) to handle the API calls securely.
                        </p>
                    </div>
                </section>

                {/* Section 2: Local Testing */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
                        <Terminal className="w-5 h-5 text-primary-600" />
                        Method 1: Simple Static Hosting (If pre-compiled)
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        If you have compiled the TypeScript files to JavaScript (or if the environment handles it on the fly), you only need a basic HTTP server to serve the directory containing <code>index.html</code>.
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                        <p># Using Python</p>
                        <p>python3 -m http.server 8000</p>
                        <br/>
                        <p># Using Node.js (http-server)</p>
                        <p>npx http-server .</p>
                    </div>
                </section>

                {/* Section 3: Modern Hosting */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
                        <Globe className="w-5 h-5 text-primary-600" />
                        Method 2: Deploying to Vercel / Netlify (Recommended)
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        To deploy this robustly, it's best to initialize a standard React project (like Vite) and drop these components in. Here is the standard workflow:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-2">
                        <li>Create a new Vite project: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">npm create vite@latest my-app -- --template react-ts</code></li>
                        <li>Install dependencies: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">npm install @google/genai lucide-react react-router-dom</code></li>
                        <li>Set up Tailwind CSS according to their Vite guide.</li>
                        <li>Copy the <code>components</code>, <code>services</code>, and <code>types.ts</code> files into the <code>src</code> directory.</li>
                        <li>Update <code>App.tsx</code> to use the copied components.</li>
                        <li>Add your API key to a <code>.env</code> file as <code>VITE_API_KEY</code> (and update the service to use <code>import.meta.env.VITE_API_KEY</code>).</li>
                        <li>Push to GitHub.</li>
                        <li>Connect the repository to Vercel or Netlify. They will automatically detect Vite, build the app, and deploy it.</li>
                    </ol>
                </section>

                {/* Section 4: Docker */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
                        <Server className="w-5 h-5 text-primary-600" />
                        Method 3: Docker (Nginx)
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        If you want to containerize the static files (assuming they are compiled to JS):
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-blue-300 overflow-x-auto">
                        <p>FROM nginx:alpine</p>
                        <p>COPY . /usr/share/nginx/html</p>
                        <p>EXPOSE 80</p>
                        <p>CMD ["nginx", "-g", "daemon off;"]</p>
                    </div>
                </section>

            </div>
        </div>
    );
};
