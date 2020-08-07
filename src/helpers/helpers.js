export const findDaysAgo = (tweetDate) => {
  const today = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.floor((today - tweetDate) / msInDay);
};
