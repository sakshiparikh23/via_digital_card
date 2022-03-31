import create from "zustand";

export const useProgressStore = create((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
}));
// export const useStatePremium = create((set) => ({
//   isPremimum: false,
//   setIsPremimum: (isPremimum) => set(() => ({ isPremimum })),
// }));
