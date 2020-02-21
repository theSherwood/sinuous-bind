export function asNumber(val) {
  return isNaN(val) ||
    val === "" ||
    ["boolean", "undefined", "object"].includes(typeof val)
    ? val
    : Number(val);
}
