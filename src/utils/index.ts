import { Goal } from "../types/global";

export function random(numbers: Array<number>, limit?: number) {
  let n: number = Math.round(Math.random() * (limit ?? 10000));
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
  if(start == 0){
    result.splice(end-1>=0?end-1:end, 0, {...replaced, status: endCol});
  }
  else {
    result.splice(end, 0, {...replaced, status: endCol});
  }
  return result;
};

export function validator (regex:RegExp, data:string) {
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
  } else {
    return string;
  }
}

export const handleDblClick = (type:string,compType:CallableFunction,changeType:CallableFunction) => {
  compType("create");
  changeType(type);
}

export const handleBlur = (
  e: any,
  field: { value: string; error: boolean },
  value: string,
  setFormData:CallableFunction,
  formData:any
) => {
  if (e.target.value == value) {
    e.target.classList.add("redborder");
    field.error = true;
    setFormData({ ...formData });
  }
  if (e.target.value != value) {
    e.target.classList.remove("redborder");
    field.error = false;
    setFormData({ ...formData });
  }
};

export const handleChange = (e:any,setFormData:CallableFunction,formData:any)=> {
  setFormData({
    ...formData,
    [e.target.name]: { value: e.target.value, error: false },
  });
}