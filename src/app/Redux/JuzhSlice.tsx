import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Ayah {
  number: number;
  text: string;
  surah: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean }; // يمكن أن تكون object
}
export interface SurahInJuz {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

export interface JuzData {
  number: number; 
  ayahs: Ayah[]; 
  surahs: { [key: string]: SurahInJuz }; 
  edition: Edition;
}

export const getAllJuzs = createAsyncThunk(
  'juzs/getAllJuzs',
  async (edition: string = 'quran-uthmani', { rejectWithValue }) => {
    try {
      const allJuzsData: JuzData[] = [];
      for (let i = 1; i <= 30; i++) {
        const response = await fetch(`http://api.alquran.cloud/v1/juz/${i}/${edition}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Juz ${i}: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.data) {
          allJuzsData.push(result.data as JuzData); 
        } else {
          console.warn(`No data found for Juz ${i}`);
        }
      }
      return allJuzsData;
    } catch (err: any) {
      console.error("Error fetching all Juzs:", err);
      return rejectWithValue(err.message || "An unknown error occurred while fetching Juzs.");
    }
  }
);


interface JuzsState {
  juzs: JuzData[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JuzsState = {
  juzs: [],
  loading: 'idle',
  error: null,
};

const juzsSlice = createSlice({
  name: "juzs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJuzs.pending, (state) => {
        state.loading = 'pending';
        state.error = null; // مسح أي أخطاء سابقة عند بدء التحميل
      })
      .addCase(getAllJuzs.fulfilled, (state, action: PayloadAction<JuzData[]>) => {
        state.loading = 'succeeded';
        state.juzs = action.payload; 
        console.log("Juz data fetched successfully:", action.payload);
      })
      .addCase(getAllJuzs.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string || "Failed to fetch Juz data.";
        console.error("Failed to fetch Juz data:", action.payload);
      });
  }
});

export default juzsSlice.reducer;
