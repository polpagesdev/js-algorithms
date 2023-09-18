function palindrome(str) {
  
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  return cleanStr === cleanStr.split('').reverse().join('');
}

palindrome("eye");
