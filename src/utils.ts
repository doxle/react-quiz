export const shuffleArray = (array:any[]) =>
// TAKE EVERY ELEMENT IN THE ARRAY AND SORT IT
[...array].sort(()=>Math.random() - 0.5)
