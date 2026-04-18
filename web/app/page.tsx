"use client";

import { useState } from "react";
import { predictNews } from "@/lib/api";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ prediction: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!text) return;
    setLoading(true);
    setResult(null); // Clear previous result for better UX
    try {
      const res = await predictNews(text);
      setResult(res);
    } catch (error) {
      alert("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
      
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Veritas <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-slate-500 text-lg">
            High-precision news authenticity analysis.
          </p>
        </header>

        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
          <div className="p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
              Article Content
            </label>
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
              rows={8}
              placeholder="Paste the news article text here to verify its credibility..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={handlePredict}
              disabled={loading || !text}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] ${
                loading || !text 
                  ? "bg-slate-300 cursor-not-allowed" 
                  : "bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Sources...
                </span>
              ) : (
                "Verify Authenticity"
              )}
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div className={`border-t animate-in fade-in slide-in-from-bottom-4 duration-500 ${
              result.prediction === "Fake" ? "bg-red-50/50" : "bg-emerald-50/50"
            }`}>
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Analysis Result</h3>
                  <p className={`text-4xl font-black ${
                    result.prediction === "Fake" ? "text-red-600" : "text-emerald-600"
                  }`}>
                    {result.prediction.toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-600">Confidence Score</span>
                    <span className="text-xl font-bold text-slate-900">{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  {/* Visual Confidence Bar */}
                  <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        result.prediction === "Fake" ? "bg-red-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          Powered by Natural Language Processing • Used for educational purposes.
        </footer>
      </div>
    </div>
  );
}