import { Goal } from "../types/global";

export function random(numbers: Array<number>) {
  let n: number = Math.round(Math.random() * 10000);
  if (!numbers.includes(n)) {
    return n;
  } 
  else {
    random(numbers);
  }
}

export const reorder = (
  tasks: Goal[],
  start: number,
  end: number,
  startCol: string,
  endCol: string,
): Goal[] => {
  const result = Array.from(tasks);
  const [replaced] = result.splice(start, 1);
  result.splice(end-1, 0, {...replaced, status: endCol});
  return result;
};

export function validator (regex:RegExp, data:any) {
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

export function lengthCheck (string:string, count:number) {
  if (string.length > count) {
    return string.substring(0, count) + "...";
  } 
  
  else {
    return string;
  }
}
