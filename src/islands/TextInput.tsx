import { JSX } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Input } from "../components/Input.tsx";

interface TextInputProps {
  start: number;
}

export default function TextInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(props.value);
  const onChange = useCallback(
    (e) => setValue(e.target.value),
    [setValue],
  );

  return <input {...props} value={value} onChange={onChange} />;
}
