import bumble_bee from '../assets/bumble_bee.png';
import hacker from '../assets/hacker.png';
import hex from '../assets/hex.png';
import pillow from '../assets/pillow.png';

const basic = [
  {
    accent: '#ede594',
    background: `linear-gradient(
      to bottom right,
      #e96459,
      #5543be
    )`,
    name: 'Autumn',
    text: 'rgba(255,255,255,0.85)',
  },
  {
    accent: '#ede594',
    background: `linear-gradient(
      to bottom right,
      #5b247a,
      #1bcedf
    )`,
    name: 'Blueberry',
    text: 'rgba(255,255,255,0.85)',
  },
  {
    accent: '#B3230C',
    background: `linear-gradient(
      to bottom right,
      #ED1C24,
      #FCEE21
    )`,
    name: 'Fresh Papaya',
    text: 'rgba(255,255,255,0.75)',
  },
  {
    accent: '#ede594',
    background: `linear-gradient(
      to bottom right,
      #312A6C,
      #852D91
    )`,
    name: 'Grape',
    text: 'rgba(255,255,255,0.85)',
  },
  {
    accent: 'rgba(60,60,60,0.85)',
    background: `linear-gradient(
      to bottom right,
      #009245,
      #FCEE21
    )`,
    name: 'Luscious Lime',
    text: 'rgba(255,255,255,0.85)',
  },
  {
    accent: '#5aacc8',
    background: `linear-gradient(
      to bottom right,
      #141517,
      #4b4f57
    )`,
    name: 'Wrought Iron',
    text: 'rgba(255,255,255,0.85)',
  },
].sort((a, b) => a.name.localeCompare(b.name));

const fancy = [
  {
    accent: '#5aacc8',
    background: `linear-gradient(
      to bottom right,
      rgba(200,200,200,0.65),
      rgba(200,200,200,0.65)
    ), url('${hex}')`,
    name: 'Hex',
    text: 'rgba(60,60,60,0.85)',
  },
  {
    accent: '#5aacc8',
    background: `linear-gradient(
      to bottom right,
      rgba(0,0,0,0.85),
      rgba(0,0,0,0.85)
    ), url('${hex}')`,
    name: 'Hex (Night)',
    text: 'rgba(255,255,255,0.85)',
  },
  {
    accent: '#E67657',
    background: `url('${bumble_bee}')`,
    name: 'Bumble Bee',
    text: '#786F54',
  },
  {
    accent: '#c9ceca',
    background: `linear-gradient(
      to bottom right,
      rgba(0,0,0,0.60),
      rgba(0,0,0,0.60)
    ), url('${hacker}')`,
    name: 'Hackerman',
    text: '#35cb5e',
  },
  {
    accent: '#E6D38F',
    background: `linear-gradient(
      to bottom right,
      rgba(60, 31, 81, 0.75),
      rgba(60, 31, 81, 0.75)
    ), url('${pillow}')`,
    name: 'Pillowfort',
    text: '#e6e4f2',
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default { basic, fancy, master: [...basic, ...fancy] };
