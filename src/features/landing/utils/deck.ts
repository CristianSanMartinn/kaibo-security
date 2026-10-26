export function getDeckOffset(
  index: number,
  activeIndex: number,
  count: number,
) {
  if (count < 1) return 0;
  let offset = index - activeIndex;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}
