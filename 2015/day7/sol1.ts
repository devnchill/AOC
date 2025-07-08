import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf8");
const circuit = new Map<string, string[]>();

for (const line of data.trim().split("\n")) {
  const [expression, wire] = line.split(" -> ").map((s) => s.trim());
  circuit.set(wire, expression.split(" "));
}

const memo = new Map<string, number>();

function evaluate(wire: string): number {
  if (/^\d+$/.test(wire)) return parseInt(wire);
  if (memo.has(wire)) return memo.get(wire)!;

  const expr = circuit.get(wire);
  if (!expr) throw new Error(`Unknown wire: ${wire}`);

  let result: number;

  if (expr.length === 1) {
    result = evaluate(expr[0]);
  } else if (expr.length === 2 && expr[0] === "NOT") {
    result = ~evaluate(expr[1]) & 0xffff;
  } else if (expr.length === 3) {
    const [left, op, right] = expr;
    const a = evaluate(left);
    const b = evaluate(right);
    switch (op) {
      case "AND":
        result = a & b;
        break;
      case "OR":
        result = a | b;
        break;
      case "LSHIFT":
        result = (a << b) & 0xffff;
        break;
      case "RSHIFT":
        result = a >> b;
        break;
      default:
        throw new Error(`Unknown operation: ${op}`);
    }
  } else {
    throw new Error(`Invalid expression for wire ${wire}: ${expr.join(" ")}`);
  }
  memo.set(wire, result);
  return result;
}

console.log("Signal on wire a:", evaluate("a"));
