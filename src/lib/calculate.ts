import { lexer, evaluate, shuntingYard } from "./";
export function calculate(exp: string): string {
  try {
    const res = evaluate(shuntingYard(lexer(exp)));
    return res.toString();
  } catch {
    return "No result";
  }
}
