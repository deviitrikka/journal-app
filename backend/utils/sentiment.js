const happyWords = ['happy', 'excited', 'joy', 'grateful', 'blessed', 'amazing', 'wonderful', 'fantastic', 'love'];
const sadWords = ['sad', 'unhappy', 'crying', 'miserable', 'depressed', 'lonely', 'awful', 'terrible'];
const angryWords = ['angry', 'mad', 'furious', 'irritated', 'frustrated', 'annoyed'];

const getEmotion = (text) => {
  const content = text.toLowerCase();
  let score = { happy: 0, sad: 0, angry: 0 };

  happyWords.forEach(word => {
    if (content.includes(word)) score.happy++;
  });
  sadWords.forEach(word => {
    if (content.includes(word)) score.sad++;
  });
  angryWords.forEach(word => {
    if (content.includes(word)) score.angry++;
  });

  // Find the max score
  let detectedEmotion = 'neutral';
  let maxScore = 0;

  if (score.happy > maxScore) {
    maxScore = score.happy;
    detectedEmotion = 'happy';
  }
  if (score.sad > maxScore) {
    maxScore = score.sad;
    detectedEmotion = 'sad';
  }
  if (score.angry > maxScore) {
    maxScore = score.angry;
    detectedEmotion = 'angry';
  }

  return detectedEmotion;
};

module.exports = { getEmotion };