import { Goal } from "../types/global";

export function random(numbers: Array<number>) {
  let n: number = Math.round(Math.random() * 10000);
  if (!numbers.includes(n)) {
    return n;
  } else {
    random(numbers);
  }
}

export function validator (regex:RegExp,data:any) {
  return regex.test(data)
}

export function getIds (goals:Array<Goal>) {
  return () => {
    let idArray: number[] = [];
    goals.map((el: Goal) => {
      idArray.push(el.id);
    });
    return idArray
  }
}

export function lengthCheck (string:string,count:number) {
  if (string.length > count) {
    return string.substring(0, count) + "...";
  } else {
    return string;
  }
}