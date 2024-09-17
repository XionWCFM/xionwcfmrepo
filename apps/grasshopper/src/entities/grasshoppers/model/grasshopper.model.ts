export const GRASS_HOPPER_NAMES = [
  "가시모메뚜기",
  "각시메뚜기",
  "검정수염메뚜기",
  "극동벼메뚜기",
  "극동애메뚜기",
  "긴날개밑들이메뚜기",
  "꼭지메뚜기",
  "끝검은메뚜기",
  "두꺼비메뚜기",
  "등검은메뚜기",
  "땅딸보메뚜기",
  "뚱보주름메뚜기",
  "모메뚜기",
  "발톱메뚜기",
  "벼메뚜기붙이",
  "섬서구메뚜기",
  "수염치레애메뚜기",
  "시베리아애메뚜기",
  "야산모메뚜기",
  "우리벼메뚜기",
  "원산밑들이메뚜기",
  "장삼모메뚜기",
  "제주밑들이메뚜기",
  "제주청날개애메뚜기",
  "좁쌀메뚜기",
  "참볼록모메뚜기",
  "참홍날개메뚜기",
  "청날개애메뚜기",
  "청분홍메뚜기",
  "팔공산밑들이메뚜기",
  "한국민날개밑들이메뚜기",
  "한라북방밑들이메뚜기",
  "한라애메뚜기",
  "해변메뚜기",
  "홍날개메뚜기",
] as const;

export type GrassHopperNameUnionType = (typeof GRASS_HOPPER_NAMES)[number];

export type GrasshopperType = {
  id: string;
  imgSrc: string;
  name: string;
};