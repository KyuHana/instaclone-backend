export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || null;
  const hash = hashtags.map((hashtag) => ({
    where: {hashtag},
    create: {hashtag}
  }));
  return hash;
};