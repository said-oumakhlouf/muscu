"use client";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface WgerExercise {
  id: number;
  name: string;
  category: string;
}

interface WgerApiExercise {
  id: number;
  translations: { language: number; name: string }[];
  category: { name: string } | null;
}

interface WgerApiResponse {
  results: WgerApiExercise[];
  next: string | null;
}

const CATEGORIES = [
  { label: "Tous", id: null },
  { label: "Abdos", id: 10 },
  { label: "Bras", id: 8 },
  { label: "Dos", id: 12 },
  { label: "Pectoraux", id: 11 },
  { label: "Jambes", id: 9 },
  { label: "Épaules", id: 13 },
  { label: "Mollets", id: 14 },
];

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  Abs: "Abdos",
  Arms: "Bras",
  Back: "Dos",
  Chest: "Pectoraux",
  Legs: "Jambes",
  Shoulders: "Épaules",
  Calves: "Mollets",
};

const buildUrl = (categoryId: number | null) => {
  const base =
    "https://wger.de/api/v2/exerciseinfo/?format=json&language=2&limit=20";
  return categoryId ? `${base}&category=${categoryId}` : base;
};

const parseResults = (results: WgerApiExercise[]): WgerExercise[] => {
  return results
    .map((e) => {
      const frTranslation = e.translations?.find((t) => t.language === 12);
      const enTranslation = e.translations?.find((t) => t.language === 2);
      const name = frTranslation?.name || enTranslation?.name || "";
      const rawCategory = e.category?.name || "";
      return {
        id: e.id,
        name,
        category: CATEGORY_TRANSLATIONS[rawCategory] || rawCategory || "Autre",
      };
    })
    .filter((e) => e.name);
};

export default function ExerciseLibrary() {
  const [listState, setListState] = useState<{
    exercises: WgerExercise[];
    loading: boolean;
    nextUrl: string | null;
  }>({ exercises: [], loading: true, nextUrl: null });

  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    fetch(buildUrl(selectedCategory.id))
      .then((res) => res.json())
      .then((data: WgerApiResponse) => {
        setListState({
          exercises: parseResults(data.results),
          loading: false,
          nextUrl: data.next,
        });
      });
  }, [selectedCategory]);

  const handleCategoryChange = (cat: (typeof CATEGORIES)[number]) => {
    setListState({ exercises: [], loading: true, nextUrl: null });
    setSelectedCategory(cat);
  };

  const loadMore = () => {
    if (!listState.nextUrl) return;
    setLoadingMore(true);
    fetch(listState.nextUrl)
      .then((res) => res.json())
      .then((data: WgerApiResponse) => {
        setListState((prev) => ({
          exercises: [...prev.exercises, ...parseResults(data.results)],
          loading: false,
          nextUrl: data.next,
        }));
        setLoadingMore(false);
      });
  };

  const handleDragStart = (e: React.DragEvent, exercise: WgerExercise) => {
    e.dataTransfer.setData(
      "exercise",
      JSON.stringify({
        externalId: String(exercise.id),
        name: exercise.name,
        category: exercise.category,
      }),
    );
  };

  const filtered = listState.exercises.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Bibliothèque d&apos;exercices
      </h2>

      <div className="relative mb-3">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          className="w-full bg-zinc-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#7C5CBF] transition"
          placeholder="Rechercher un exercice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              selectedCategory.label === cat.label
                ? "bg-[#7C5CBF] text-white"
                : "bg-zinc-100 text-gray-500 hover:bg-[#F3EEFF] hover:text-[#7C5CBF]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {listState.loading ? (
        <p className="text-gray-400 text-sm text-center py-8">Chargement...</p>
      ) : (
        <>
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">
                Aucun exercice trouvé
              </p>
            ) : (
              filtered.map((exercise) => (
                <div
                  key={exercise.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, exercise)}
                  className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl border border-gray-100 cursor-grab hover:border-[#7C5CBF]/30 hover:bg-[#F3EEFF] transition group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-[#7C5CBF]">
                      {exercise.name}
                    </p>
                    <p className="text-xs text-gray-400">{exercise.category}</p>
                  </div>
                  <span className="text-gray-300 text-xs group-hover:text-[#7C5CBF]">
                    ⠿ drag
                  </span>
                </div>
              ))
            )}
          </div>

          {listState.nextUrl && (
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-[#F3EEFF] hover:text-[#7C5CBF] hover:border-[#7C5CBF]/30 transition disabled:opacity-40"
            >
              {loadingMore ? "Chargement..." : "Charger plus"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
