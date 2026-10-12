export function generateRandomNumber(length, type) {
  if (!length || isNaN(length)) {
    return null;
  }

  const alphabet = "123456789";
  const alphabetZero = "0123456789";

  let id = "";
  for (let i = 0; i < length; i++) {
    id +=
      i === 0
        ? alphabet[Math.floor(Math.random() * alphabet.length)]
        : alphabetZero[Math.floor(Math.random() * alphabetZero.length)];
  }

  const randomNumber = type === "int" ? parseInt(id) : String(id);

  return randomNumber;
}
