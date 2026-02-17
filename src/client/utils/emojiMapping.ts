export const EMOJI_NAMES: Record<string, string> = {
  '🍎': 'Apple',
  '🍌': 'Banana',
  '🍒': 'Cherry',
  '🥑': 'Avocado',
  '🥦': 'Broccoli',
  '🍕': 'Pizza',
  '🚀': 'Rocket',
  '⭐': 'Star',
  '💎': 'Diamond',
  '🤖': 'Robot',
  '👻': 'Ghost',
  '🔥': 'Fire',
  '💧': 'Water',
  '🌍': 'Earth',
  '❤️': 'Heart',
};

export const getEmojiName = (emoji: string): string => {
  return EMOJI_NAMES[emoji] || 'Symbol';
};
