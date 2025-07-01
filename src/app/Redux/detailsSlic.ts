import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurahAudioPayload {
  fullAudio: string;
  identifier: string;
  name: string;
}

interface Ayahs {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
}

interface Qari {
  identifier: string;
  name: string;
}

interface surahDetails {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayahs[];
  fullAudio?: string;
}


interface surahDetailsState {
  currentSurah: surahDetails | null;
  selectQari: Qari;
  loading: "idle" | "pending" | "succeeded" | "failed";
  qari: Qari[];
  error: string | null;
  audioPayloading: number | null;
}

// الحالة الابتدائية
const initialState: surahDetailsState = {
  currentSurah: null,
  selectQari: { identifier: "ar.alafasy", name: "مشاري العفاسي" },
  qari: [
    { identifier: "ar.alafasy", name: "مشاري العفاسي" },
    { identifier: "ar.abdulbasit", name: "عبد الباسط عبد الصمد" },
    { identifier: "ar.hudhaify", name: "علي الحذيفي" },
  ],
  loading: "idle",
  error: null,
  audioPayloading: null,
};


export const surahDetails = createAsyncThunk(
  "details/surahDetails",
  async (surahNumber: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const surahAudio = createAsyncThunk(
  "details/surahAudio",
  async ({ identifier, surahNumber }: { identifier: string; surahNumber: number }, { rejectWithValue }) => {
    try {
      const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${identifier}/${surahNumber}.mp3`;
      return {
        fullAudio: audioUrl,
        identifier,
        name: identifier === "ar.alafasy" ? "مشاري العفاسي" :
              identifier === "ar.abdulbasit" ? "عبد الباسط عبد الصمد" :
              identifier === "ar.hudhaify" ? "علي الحذيفي" : "قارئ غير معروف",
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("An unknown error occurred while fetching Juzs.");
    }
  }
);


const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(surahDetails.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.currentSurah = null;
      })
      .addCase(
        surahDetails.fulfilled,
        (state, action: PayloadAction<surahDetails>) => {
          state.loading = "succeeded";
          state.currentSurah = action.payload;
          state.error = null;
        }
      )
      .addCase(surahDetails.rejected, (state) => {
        state.error = "فشل تحميل السورة";
        state.loading = "failed";
        state.currentSurah = null;
      })
      .addCase(surahAudio.pending, (state) => {
        state.audioPayloading = null;
        state.loading = "pending";
      })
  .addCase(surahAudio.fulfilled, (state, action: PayloadAction<SurahAudioPayload>) => {
  if (state.currentSurah) {
    state.currentSurah.fullAudio = action.payload.fullAudio;
  }

  state.selectQari = {
    identifier: action.payload.identifier,
    name: action.payload.name,
  };

  state.loading = "succeeded";
  state.error = null;
})

      .addCase(surahAudio.rejected, (state) => {
        state.error = "فشل تحميل تلاوة السورة";
        state.loading = "failed";
        state.audioPayloading = null;
      });
  },
});

export default detailsSlice.reducer;
