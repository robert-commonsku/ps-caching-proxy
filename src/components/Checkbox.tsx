import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Checkbox(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      type="checkbox"
      class="px-2 py-1 border(gray-100 2) hover:bg-gray-200"
    />
  );
}
