import tailwindConfig from "tailwind.config.js";
import resolveConfig from "tailwindcss/resolveConfig";
import { Star } from "./logo/logo";

const { theme } = resolveConfig(tailwindConfig);

export function ogImage() {
  const { colors } = theme as any;
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: colors.background,
        color: colors.foreground,
      }}
    >
      <Star fill={colors.foreground} />
    </div>
  );
}
