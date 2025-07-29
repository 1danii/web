import { Star } from "./logo/logo";
// https://github.com/tailwindlabs/tailwindcss/discussions/14764
import { colors } from "@/colors";

export function ogImage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "oklch(16.84% 0 0)",
        color: colors.light,
      }}
    >
      <Star fill={colors.light} />
    </div>
  );
}
