// src/redux/features/revelationOrder/revelationOrderSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { surahsRevelationData } from "./stacticData";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahWithRevelationOrder extends Surah {
    revelationOrder: number; 
}

interface SurahApiResponse {
  code: number;
  status: string;
  data: Surah[]; 
}

export const fetchSurahsByRevelationOrder = createAsyncThunk<
  SurahWithRevelationOrder[],
  void,
  { rejectValue: string }
>(
  'revelationOrder/fetchSurahs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      if (!response.ok) {
        return rejectWithValue(`Failed with status: ${response.status}`);
      }
      const apiData: SurahApiResponse = await response.json();
      const revelationMap = new Map<number, number>();
      surahsRevelationData.forEach(item => {
        revelationMap.set(item.number, item.revelationOrder);
      });

      const combinedAndSortedSurahs: SurahWithRevelationOrder[] = apiData.data
        .map(surah => ({
          ...surah,
          revelationOrder: revelationMap.get(surah.number) || 999 // Fallback for safety, though all 114 surahs should be in local data
        }))
        .sort((a, b) => a.revelationOrder - b.revelationOrder);

      return combinedAndSortedSurahs;
    } catch (error: any) {
      console.error("Error fetching surah data for revelation order:", error);
      return rejectWithValue(error.message || "Failed to fetch surah data by revelation order.");
    }
  }
);

interface RevelationOrderState {
  surahs: SurahWithRevelationOrder[]; // Changed type here
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RevelationOrderState = {
  surahs: [],
  loading: 'idle',
  error: null,
};

const revelationOrderSlice = createSlice({
  name: 'revelationOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurahsByRevelationOrder.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchSurahsByRevelationOrder.fulfilled, (state, action: PayloadAction<SurahWithRevelationOrder[]>) => {
        state.loading = 'succeeded';
        state.surahs = action.payload;
      })
      .addCase(fetchSurahsByRevelationOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = 'failed';
        state.error = action.payload || "Failed to fetch data.";
      });
  },
});

export default revelationOrderSlice.reducer;