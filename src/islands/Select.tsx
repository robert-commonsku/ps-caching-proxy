import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useCallback } from "preact/hooks";

export default function TextInput(baseProps: JSX.HTMLAttributes<HTMLSelectElement>) {
  const { options, ...props } = baseProps;
  const [value, setValue] = useState(props.value);
  const onChange = useCallback(
    e => setValue(e.target.value),
    [setValue]
  );

  return (
    <select
      {...props}
      value={value}
      onChange={onChange}
    >
      {options.map(
        (o, i) => <option key={o.value ?? i} value={o.value ?? i}>{o.label ?? o.value ?? i}</option>
      )}
    </select>
  );
}
