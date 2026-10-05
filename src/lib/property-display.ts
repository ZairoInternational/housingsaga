/**
 * Human-readable labels for property enums and floor copy.
 */
export function formatDashCaseLabel(value: string): string {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatFloorStatus(
  floors?: number | null,
  propertyOnFloor?: number,
  locale: "en" | "el" = "en",
): string | undefined {
  const floorCount =
    floors !== undefined && floors !== null && !Number.isNaN(floors)
      ? floors
      : undefined;
  const unitFloor =
    propertyOnFloor !== undefined &&
    propertyOnFloor !== null &&
    !Number.isNaN(propertyOnFloor)
      ? propertyOnFloor
      : undefined;

  if (unitFloor !== undefined && floorCount !== undefined) {
    return locale === "el"
      ? `Όροφος ${unitFloor} από ${floorCount}`
      : `Floor ${unitFloor} of ${floorCount}`;
  }
  if (unitFloor !== undefined) {
    return locale === "el" ? `Όροφος ${unitFloor}` : `Floor ${unitFloor}`;
  }
  if (floorCount !== undefined) {
    return locale === "el"
      ? `${floorCount} όροφοι στο κτίριο`
      : `${floorCount} floors in building`;
  }
  return undefined;
}
