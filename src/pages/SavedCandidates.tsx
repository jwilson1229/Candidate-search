import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  const handleDeleteCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Avatar</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Profile</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  <img src={candidate.avatar_url} alt={candidate.login} className="w-12 h-12 rounded-full mx-auto" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{candidate.login}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View Profile
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteCandidate(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates.</p>
      )}
    </div>
  );
};

export default SavedCandidates;

