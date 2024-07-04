import { useEffect, useState } from "react";
import { COLLECTION_ID, DB_ID, databases, ID } from "./lib/appWrite";

//ID - got from appwrite  it generates unique ID

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionText, setSuggestionText] = useState("");

  useEffect(() => {
    getSuggestion();
  }, []);

  async function getSuggestion() {
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
    setSuggestions(res.documents.reverse());
  }

  const addSuggestion = async (e) => {
    e.preventDefault();
    if (suggestionText) {
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        text: suggestionText,
      });
      setSuggestionText("");
      getSuggestion();
    }
  };
  async function upDateDocument(id, completed) {
    await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
      completed: completed,
    });
    getSuggestion();
  }
  async function deleteDocument(id) {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
    getSuggestion();
  }

  const handleInput = (e) => {
    setSuggestionText(e.target.value);
  };

  return (
    <main className="max-w-3xl w-full mx-auto">
      <form className="flex flex-col gap-4 my-6 " onSubmit={addSuggestion}>
        <textarea
          className="bg-slate-800 shadow-xl w-full h-20 p-4 rounded"
          value={suggestionText}
          onInput={handleInput}
          placeholder="Enter Your Suggestion here"
        ></textarea>
        <button
          className="bg-purple-900 px-6 py-2 rounded ml-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ul className="space-y-4">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.$id}
            className="flex items-center border border-white/20 p-4 rounded shadow gap-2"
          >
            <span>{suggestion.completed ? "✅" : ""}</span>
            {suggestion.text}
            <input
              type="checkbox"
              checked={suggestion.completed}
              className="ml-auto"
              onChange={() =>
                upDateDocument(suggestion.$id, !suggestion.completed)
              }
            />
            <button
              className="text-red-500 hover:text-red-500"
              onClick={() => deleteDocument(suggestion.$id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
