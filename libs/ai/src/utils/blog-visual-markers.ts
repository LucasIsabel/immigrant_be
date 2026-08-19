/** Matches inline `[Visual sugerido]` callouts the text generator inserts. */
export const VISUAL_MARKER_REGEX =
  />\s*📊\s*\*\*\[Visual sugerido\]:\*\*\s*(.+)/g;

/** True when the post body still has description-only visual callouts. */
export function contentHasVisualMarkers(content: string): boolean {
  return new RegExp(VISUAL_MARKER_REGEX.source, 'g').test(content);
}
