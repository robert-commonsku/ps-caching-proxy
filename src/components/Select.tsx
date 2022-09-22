import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Select(baseProps: JSX.HTMLAttributes<HTMLSelectElement>) {
  const { options, ...props} = baseProps;
  return (
    <select
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    >
      {options.map(
        (o, i) => <option key={o.value ?? i} value={o.value ?? i}>{o.label ?? o.value ?? i}</option>
      )}
    </select>
  );
}
