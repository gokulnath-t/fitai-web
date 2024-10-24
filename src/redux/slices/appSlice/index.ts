import { AIChatType } from "@/screens/AIChat";
import { GoalType } from "@/screens/GoalScreen/helper";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileDetailsType {
  currentHeight: string;
  currentWeight: string;
  goalWeight: string;
  name: string;
}
const profileInitialDetails = {
  currentHeight: "",
  currentWeight: "",
  goalWeight: "",
  name: "",
};
interface initialAppStateTypes {
  data: string[];
  profileDetails: ProfileDetailsType;
  goalDetails: GoalType;
  mealRestriction: string[];
  dietImprovement: string[];
  allergies: string[];
  restaurants: string[];
  AIchat: AIChatType[];
  currentStep: number;
  suggestions: string[];
  history: History[];
}

interface History {
  role: 'user' | 'assistant'; // Restricting role to specific string literals
  content: string;
}
const initialAppState: initialAppStateTypes = {
  data: [],
  profileDetails: profileInitialDetails,
  goalDetails: {
    title: "",
    index: 0,
  },
  mealRestriction: [],
  dietImprovement: [],
  allergies: [],
  restaurants: [],
  AIchat: [],
  currentStep: 0,
  suggestions: ["Sample to be suggessted", "Sample to be suggessted", "Sample to be suggessted"],
  history: [],
};

const AppSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    updateData: (state, action: { payload: string[] }) => {
      state.data = action.payload;
    },
    updateProfile: (state, action: { payload: ProfileDetailsType }) => {
      state.profileDetails = action.payload;
    },
    resetProfile: (state) => {
      state.profileDetails = initialAppState.profileDetails;
    },
    updateGoal: (state, action: { payload: GoalType }) => {
      state.goalDetails = action.payload;
    },
    updateMealRestriction: (state, action: { payload: string[] }) => {
      state.mealRestriction = action.payload;
    },
    updateDietImprovement: (state, action: { payload: string[] }) => {
      state.dietImprovement = action.payload;
    },
    updateAllergies: (state, action: { payload: string[] }) => {
      state.allergies = action.payload;
    },
    updateRestaurants: (state, action: { payload: string[] }) => {
      state.restaurants = action.payload;
    },
    updateAIChat: (state, action: { payload: AIChatType }) => {
      state.AIchat = [action.payload];
    },
    addAIChat: (state, action: { payload: AIChatType }) => {
      state.AIchat = [...state.AIchat, action.payload];
    },
    resetAll: (state) => {
      state.dietImprovement = initialAppState.dietImprovement;
      state.allergies = initialAppState.allergies;
      state.restaurants = initialAppState.restaurants;
      state.goalDetails = initialAppState.goalDetails;
      state.profileDetails = initialAppState.profileDetails;
      state.mealRestriction = initialAppState.mealRestriction;
    },
    clearChat: (state) => {
      state.AIchat = [];
    },
    goToNextStep: (state) => {
      state.currentStep += 1;
    },
    goToPreviousStep: (state) => {
      state.currentStep -= 1;
    },
    resetStep: (state) => {
      state.currentStep = 0;
    },
    updateSuggestions: (state, action: { payload: string[] }) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    addToHistory: (state, action: { payload: History }) => {
      state.history = [...state.history, action.payload];
    },
    clearHistory:(state) => {
      state.history = [];
    },

  },
});
export default AppSlice.reducer;
export const {
  updateData,
  updateProfile,
  updateGoal,
  updateMealRestriction,
  updateDietImprovement,
  updateAllergies,
  updateRestaurants,
  updateAIChat,
  resetAll,
  clearChat,
  addAIChat,
  goToNextStep,
  goToPreviousStep,
  resetStep,
  addToHistory,
  clearHistory,
  updateSuggestions,
  clearSuggestions,
  resetProfile,
  
} = AppSlice.actions;
