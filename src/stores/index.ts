import { atom, createStore } from "jotai";
export const tokenAtom = atom<string | undefined>();
export const appStore = createStore();
const unsub = appStore.sub(tokenAtom, () => {
  console.log("tokenAtom value is changed to", appStore.get(tokenAtom));
});
