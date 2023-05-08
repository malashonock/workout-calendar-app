export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word: string): string => word[0].toUpperCase())
    .join('');
};
