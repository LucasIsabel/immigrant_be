/**
 * Whether a ban is in force right now.
 *
 * `banned` alone is not the answer, and reading it as if it were is what made a
 * one-hour ban indistinguishable from a permanent one. The column stays `true`
 * after the deadline passes — nothing sweeps it, because this project has no
 * scheduler and because erasing the record that somebody *was* banned is worse
 * than a column whose reading is conditional. The expiry lives in the reading.
 *
 * One function so the two places that decide — the door and the guard — cannot
 * drift into disagreeing about who is banned.
 */
export function isBanActive(
  user: { banned: boolean | null; banExpires: Date | null } | null,
  now: Date = new Date(),
): boolean {
  if (!user?.banned) return false;
  // No deadline means it does not end.
  if (!user.banExpires) return true;
  return user.banExpires.getTime() > now.getTime();
}
