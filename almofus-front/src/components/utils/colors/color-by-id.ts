export const colorById: Record<string, string> = {
  1: 'transparent',
  2: '#555555',
  3: '#5252d5',
  4: '#2121e3',
  5: '#008867',
  6: '#003e51',
  7: '#006036',
  8: '#43007c',
  9: '#570000',
  10: '#67005e',
};

export function getColor(id: string): string {
  return colorById[id] ?? colorById[1];
}
