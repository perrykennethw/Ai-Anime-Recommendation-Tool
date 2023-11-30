import { atom } from "jotai";

const favAnimeAtom = atom(['Naruto', 'Dragon Ball Z', 'One Piece']);
const chatDataAtom = atom({});

export { favAnimeAtom, chatDataAtom };