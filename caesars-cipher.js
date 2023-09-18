function rot13(str) {
  const decodeChar = (char) => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
    } else {
      return char;
    }
  };

  return str.split('').map(decodeChar).join('');
}

rot13("SERR PBQR PNZC");
