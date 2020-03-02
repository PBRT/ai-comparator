export function isInvalidID(id: string | undefined) {
  return (
    id === undefined ||
    id === null ||
    isNaN(Number(id)) ||
    Number(id) < 0 ||
    id === "Infinity" ||
    id === "-Infinity"
  );
}
