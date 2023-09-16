const text1 = `I'm not going to fall overboard!" cried the little fat fellow. "Can't I
row, Jack?`;

const text2 = `A short time before, the Bobbsey twins had returned from the city of New
York where they had spent a part of the winter. Now it was spring and
would soon be summer, and, as the day was a fine, warm one, they had
gone on a little picnic, taking their lunch with them and pretending to
camp on one of the many islands in the lake. Now they were on their way
home.`;

const re = /\w+/g;

function getFrequencies(text) {
  const freq = new Map();
  const wordArray = text.toLowerCase().match(re);

  for (let word of wordArray) {
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }

  return freq;
}

function computeDotProduct(vec1, vec2) {
  let answer = 0;

  for (let [key, value] of vec1) {
    answer += (vec2.get(key) ?? 0) * value;
  }

  return answer;
}

function getDocumentDistance(text1, text2) {
  const vec1 = getFrequencies(text1), vec2 = getFrequencies(text2);
  const norm1 = Math.sqrt(computeDotProduct(vec1, vec1)),
    norm2 = Math.sqrt(computeDotProduct(vec2, vec2));

  return Math.acos(computeDotProduct(vec1, vec2) / (norm1 * norm2));
}

function editDistance(word1, word2) {
  const matrix = Array.from({ length: word1.length + 1 }, () => Array.from({ length: word2.length + 1 }, () => 0));

  for (let i = 0; i < word1.length; i++) {
    matrix[i + 1][0] = matrix[i][0] + 1;
  }

  for (let j = 0; j < word2.length; j++) {
    matrix[0][j + 1] = matrix[0][j] + 1;
  }

  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      matrix[i + 1][j + 1] = Math.min(matrix[i + 1][j], matrix[i][j + 1], matrix[i][j]);
      if (word1[i] !== word2[j]) matrix[i + 1][j + 1]++;
    }
  }

  console.table(matrix)
  return matrix[word1.length][word2.length];
}

console.log(editDistance('hello', 'kelm'));

console.log(getDocumentDistance(text1, text2));
console.log(getDocumentDistance("To be or not to be", "Doubt truth to be a liar"));