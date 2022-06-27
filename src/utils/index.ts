export function random(numbers: Array<number>) {
  let n: number = Math.round(Math.random() * 1000);
  if (!numbers.includes(n)) {
    return n;
  } else {
    random(numbers);
  }
}

export function validator (regex:RegExp,data:any) {
  return regex.test(data)
}