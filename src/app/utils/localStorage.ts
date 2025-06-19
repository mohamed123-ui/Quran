export type Attempt = {
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  correctCount: number;
  wrongCount: number;
  date: string;
};
// heard
export type HeardSurah = {
  surahNumber: number;
  name: string;
  date: string;
};


export const saveAttempt = (attempt: Attempt) => {
  const attempts = JSON.parse(localStorage.getItem("attempts") || "[]");
  attempts.push(attempt);
  localStorage.setItem("attempts", JSON.stringify(attempts));
};

export const getAttempts = (): Attempt[] => {
  return JSON.parse(localStorage.getItem("attempts") || "[]");
};

export const saveHeardSurah = (surah: HeardSurah) => {
  const heard = JSON.parse(localStorage.getItem("heardSurahs") || "[]");
  if (!heard.find((s: HeardSurah) => s.surahNumber === surah.surahNumber)) {
    heard.push(surah);
    localStorage.setItem("heardSurahs", JSON.stringify(heard));
  }
};

export const getHeardSurahs = (): HeardSurah[] => {
  return JSON.parse(localStorage.getItem("heardSurahs") || "[]");
};
