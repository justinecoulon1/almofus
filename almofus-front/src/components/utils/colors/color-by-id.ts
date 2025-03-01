export const colorById: Record<string, string> = {
  1: 'transparent',
  2: '#555555',
  3: '#5252d5',
  4: '#2121e3',
  5: '#abcd00',
  6: '#126109',
  7: '#f6d710',
  8: '#ff7700',
  9: '#dd1111',
  10: '#f81de6',
};

export function getColor(id: string): string {
  return colorById[id] ?? colorById[1];
}
