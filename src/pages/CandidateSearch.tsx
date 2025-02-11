import { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data: Candidate[] = await searchGithub();
      setCandidates(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
    setLoading(false);
  };

  const saveCandidate = () => {
    if (!candidates[currentIndex]) return;

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    localStorage.setItem("savedCandidates", JSON.stringify([...savedCandidates, candidates[currentIndex]]));

    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      fetchCandidates(); 
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      {loading ? (
        <p className="text-lg text-gray-700">Loading candidate...</p>
      ) : candidates.length > 0 && candidates[currentIndex] ? (
        <div className="bg-white border p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center">
          <img
            src={candidates[currentIndex].avatar_url}
            alt={candidates[currentIndex].login}
            className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
          />
          <h2 className="text-2xl font-semibold text-blue-600">{candidates[currentIndex].name || "No Name"}</h2>
          <p className="text-gray-600 text-sm">@{candidates[currentIndex].login}</p>
          <p className="text-gray-500 mt-1">{candidates[currentIndex].location || "No location"}</p>
          <p className="text-gray-500">{candidates[currentIndex].company || "No company"}</p>
          <a
            href={candidates[currentIndex].html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            View Profile
          </a>
          <div className="flex gap-4 mt-4 justify-center">
            <button onClick={saveCandidate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">
              Save Candidate
            </button>
            <button onClick={nextCandidate} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all">
              Skip
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-700">No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;





