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
    return `Floor ${unitFloor} of ${floorCount}`;
  }
  if (unitFloor !== undefined) {
    return `Floor ${unitFloor}`;
  }
  if (floorCount !== undefined) {
    return `${floorCount} floors in building`;
  }
  return undefined;
}
