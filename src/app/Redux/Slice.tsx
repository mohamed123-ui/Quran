import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. تعريف نوع (Interface) للـ Surah الواحدة
interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahApiResponse {
  code: number;
  status: string;
  data: Surah[]; 
}

export const getSurah = createAsyncThunk<
  SurahApiResponse,
  void,
  { rejectValue: string }
>("tabs/getSurah", async (_, { rejectWithValue }) => { 
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    if (!response.ok) {
      return rejectWithValue(`Failed with status: ${response.status}`);
    }
    const data: SurahApiResponse = await response.json();
    console.log("Fetched data:", data); 
    return data; 
  } catch (error: any) { 
    console.error("Error fetching surah data:", error);
    return rejectWithValue(error.message || "Failed to fetch surah data due to network error or other issue.");
  }
});

interface TabState {
  tabActive: string;
  surahs: Surah[]; 
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'; 
}

const initialState: TabState = {
  tabActive: "سوره",
  surahs: [],
  loading: 'idle',
  error: null,
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.tabActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSurah.pending, (state) => {
        state.loading = 'pending';
        state.error = null; 
        console.log("Fetching Surah data...");
      })
      .addCase(getSurah.fulfilled, (state, action: PayloadAction<SurahApiResponse>) => {
        state.loading = 'succeeded';
        state.surahs = action.payload.data; 
        console.log("Surah data fetched successfully:", action.payload.data);
      })
      .addCase(getSurah.rejected, (state, action: PayloadAction<string | undefined>) => { 
        state.loading = 'failed';
        state.error = action.payload || "Failed to fetch Surah data."; 
        console.error("Failed to fetch Surah data:", action.payload);
      });
  }
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;