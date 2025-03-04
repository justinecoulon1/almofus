export const colorById: Record<number, string> = {
  1: '#1e2038',
  2: '#877f7f',
  3: '#555555',
  4: '#b8efec',
  5: '#4DA394',
  6: '#1D313C',
  7: '#FFFCC7',
  8: '#D4AA7D',
  9: '#f37676',
  10: '#D54751',
};

export function getColor(id: number): string {
  return colorById[id] ?? colorById[1];
}
