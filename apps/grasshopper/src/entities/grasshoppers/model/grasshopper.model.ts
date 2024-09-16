export const GRASS_HOPPER_NAMES = [
  "가시모메뚜기",
  "각시메뚜기",
  "검정수염메뚜기",
  "극동벼메뚜기",
  "극동애매뚜기",
  "간날개밑들이메뚜기",
  "꼭지메뚜기",
] as const;

export type GrassHopperNameUnionType = (typeof GRASS_HOPPER_NAMES)[number];

export type GrasshopperType = {
  id: string;
  imgSrc: string;
  name: string;
};
