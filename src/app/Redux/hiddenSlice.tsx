import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export type ManualTestState = {
  originalAyah: string;
  hiddenIndices: number[];
  userAnswers: Record<number, string>;
  correctAnswers: Record<number, boolean>;
};

const initialState: ManualTestState = {
  originalAyah: "",
  hiddenIndices: [],
  userAnswers: {},
  correctAnswers: {},
};

const manualSlice = createSlice({
  name: "manualTest",
  initialState,
  reducers: {
    setAyah(state, action: PayloadAction<string>) {
      state.originalAyah = action.payload;
    },
    setHiddenIndices(state, action: PayloadAction<number[]>) {
      state.hiddenIndices = action.payload;
    },
    setUserAnswer(
      state,
      action: PayloadAction<{ index: number; answer: string }>
    ) {
      const { index, answer } = action.payload;
      state.userAnswers[index] = answer;
    },
    checkAnswers(state) {
      const words = state.originalAyah.split(" ");
      state.correctAnswers = {};

      state.hiddenIndices.forEach((index) => {
        const correctWord = words[index];
        const userWord = state.userAnswers[index] || "";
        state.correctAnswers[index] = correctWord === userWord;
      });
    },
    resetTest(state) {
      state.originalAyah = "";
      state.hiddenIndices = [];
      state.userAnswers = {};
      state.correctAnswers = {};
    },
  },
});

export const {
  setAyah,
  setHiddenIndices,
  setUserAnswer,
  checkAnswers,
  resetTest,
} = manualSlice.actions;

export default manualSlice.reducer;
