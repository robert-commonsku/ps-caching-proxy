interface BadgeProps {
  title: string;
  count: number;
  units: string;
  isPrefixUnit: boolean;
}

export default function Badge(
  { title, count, units = "", isPrefixUnit = false }: BadgeProps,
) {
  return (
    <div
      class="flex-1"
      style={{
        border: "1px solid rgba(121, 125, 134, 0.3)",
        borderRadius: 3,
        boxShadow: "1px 1px 1px 0 rgba(121, 125, 134, 0.3)",
        padding: "5px",
        margin: "3px",
      }}
    >
      <h1 style={{ fontSize: "0.2em" }}>{title}</h1>
      <div>{isPrefixUnit && units}{count}{!isPrefixUnit && units}</div>
    </div>
  );
}
