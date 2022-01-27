import { ChangeEvent, useState } from 'react';

type Config = {
  name: string;
  type?: 'text' | 'email' | 'password';
  initialValue?: string;
};

const useField = (config: Config) => {
  const type = config.type ?? 'text';
  const name = config.name;
  const initialValue = config.initialValue ?? '';

  const [value, setValue] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => setValue(initialValue);

  return {
    input: {
      type,
      name,
      value,
      onChange,
    },
    reset,
  };
};

export default useField;
