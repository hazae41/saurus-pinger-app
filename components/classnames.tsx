export function cx(...names: (string | boolean)[]) {
  return names.filter(Boolean).join(" ")
}