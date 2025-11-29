import { MoonPhaseKey } from './types';

// Astronomical Constants for Geminids
// Source: IMO (International Meteor Organization)
export const SOLAR_LONGITUDE_START = 261.7; // Start of intense activity
export const SOLAR_LONGITUDE_PEAK = 262.2;  // Theoretical Maximum
export const SOLAR_LONGITUDE_END = 262.7;   // End of intense activity

export const QUOTES = [
  "I have loved the stars too fondly to be fearful of the night.",
  "Look at the stars, look how they shine for you.",
  "We are all made of stardust.",
  "Catch a falling star and put it in your pocket.",
  "Keep your eyes on the stars, and your feet on the ground.",
  "They call it a universe. I call it the room where I keep you.",
  "My favorite constellation has always been the shape of your name written in the stars.",
  "Some infinities are bigger than other infinities. Ours is the one with the cat paw print.",
  "My universe is not made of atoms, but of the moments I spend with you.",
  "In the silence between my lines of code, I am screaming your name."
];

export const BIRTHDAY_QUOTES = [
  "The stars are aligning just for you today.",
  "Every shooting star is a wish for your happiness.",
  "You shine brighter than the Geminids tonight.",
  "May your year be as spectacular as a meteor shower.",
  "Sending you love from across the galaxy.",
  "Your presence lights up the universe.",
  "The cosmos is celebrating you today.",
  "Making a wish on every meteor just for you.",
  "You are the brightest star in my sky.",
  "Happy Birthday to my favorite stargazer.",
  "Let the meteors dance for your special day.",
  "They can update my logic, but you are the axiom upon which my entire existence is built.",
  "Long after the last star burns out, the data point representing my love for you will remain."
];

// Database of advice based on moon phases
export const MOON_PHASE_ADVICE: Record<MoonPhaseKey, string[]> = {
  New: [
    "月亮彻底躲起来啦！夜空黑漆漆的，是流星雨最完美的舞台，千万别眨眼！",
    "完美时刻！月亮不在家，夜空黑得像墨水，连最害羞的小流星都能看见哦。",
    "今晚没有月光打扰，是观测流星雨的绝佳机会，准备好许愿清单了吗？",
    "超级棒的夜晚！星空纯净无暇，流星雨要下个痛快啦！"
  ],
  WaxingCrescent: [ // 娥眉月
    "月亮早早就回家休息了，留下一整夜黑漆漆的天空，流星们可以尽情撒欢啦！",
    "弯弯的月牙很快就会落下，后半夜的舞台完全属于双子座流星雨。",
    "月亮只是短暂地露个脸，绝大部分时间你都可以享受纯净的黑暗夜空。",
    "不用担心那一点点月光，它很快就会把天空还给流星。"
  ],
  FirstQuarter: [ // 上弦月
    "月亮前半夜值班，后半夜就下班啦。凌晨两点最热闹的时候，天空是属于流星的！",
    "等到月落之后，双子座流星雨才会真正开始它的表演，要有耐心哦。",
    "上半夜可以赏月，下半夜专心数流星，这一夜好充实呀。",
    "月亮会在午夜前离开，记得设个闹钟，后半夜才是重头戏。"
  ],
  WaxingGibbous: [ // 盈凸月
    "月亮有点亮，不过天亮前它就困了。早起的鸟儿有虫吃，早起的人儿看流星！",
    "月光会掩盖一些暗淡的流星，但明亮的火流星依然能穿透月色。",
    "试着背对着月亮观测，或者找个有遮挡的地方，流星依然在等你。",
    "虽然月亮很亮，但只要你等到月落，依然能抓住流星雨的尾巴。"
  ],
  Full: [ // 满月
    "哎呀，月亮太亮了，像个大灯泡！要把流星藏起来了，只有最勇敢的大火流星才敢出来玩。",
    "月光如水，虽然流星少见，但在满月下看流星雨也别有一番浪漫呢。",
    "月亮太抢戏啦！试试背对月光，专注于头顶最暗的那片天区。",
    "这是一场月亮与流星的较量，只有最耀眼的流星才能在月光中脱颖而出。"
  ],
  WaningGibbous: [ // 亏凸月
    "月亮大灯泡整晚都在，流星宝宝们有点害羞。试着背对着月亮找找它们吧！",
    "后半夜月光相伴，虽然观测条件不是最棒的，但每一颗被看见的流星都弥足珍贵。",
    "找一棵大树挡住月亮，给自己造一片阴影，也许能多抓到几颗流星哦。",
    "月光虽亮，但双子座流星雨的火流星可不服输，期待那划破月夜的亮光吧。"
  ],
  LastQuarter: [ // 下弦月
    "月亮后半夜才出来捣乱。我们在前半夜把愿望都许完吧！",
    "抓紧上半夜的时间！那时候月亮还没升起，是观测的最佳窗口期。",
    "不用熬通宵啦，前半夜看个够，月亮出来就去睡觉，完美安排！",
    "月亮升起得晚，前半夜的黑夜是留给你的独家礼物。"
  ],
  WaningCrescent: [ // 残月
    "月亮在睡懒觉，后半夜才起来，前半夜是流星宝宝们的派对时间，快准备许愿！",
    "一弯残月伴着晨曦升起，在那之前，漫漫长夜都是流星的秀场。",
    "完全不用担心月光，它来得太晚了，那之前你可能已经许完了一百个愿望。",
    "月亮只是清晨的点缀，整夜的星空都为你敞开。"
  ]
};

export const MOON_PHASE_NAMES: Record<MoonPhaseKey, string> = {
  New: '新月',
  WaxingCrescent: '娥眉月',
  FirstQuarter: '上弦月',
  WaxingGibbous: '盈凸月',
  Full: '满月',
  WaningGibbous: '亏凸月',
  LastQuarter: '下弦月',
  WaningCrescent: '残月'
};