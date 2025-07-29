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
        backgroundColor: colors.dark,
        color: colors.light,
        fill: colors.light,
      }}
    >
      {/* TODO: fix png rendering gaps  */}
      <Star style={{ height: "64px", width: "64px" }} fill={colors.light} />
    </div>
  );
}
