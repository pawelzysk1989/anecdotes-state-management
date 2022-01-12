import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React from 'react';

import filter from '../atoms/filter';

const Filter = () => {
  const setFilter = useUpdateAtom(filter.update);
  const filterValue = useAtomValue(filter.value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      filter <input value={filterValue} onChange={handleChange} />
    </>
  );
};

export default Filter;
