export default function(str) {
  try {
    return decodeURIComponent(
      myAtob(str)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  } catch (e) {
    return str;
  }
}
