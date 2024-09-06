import { CrudFilter, CrudSort } from "@refinedev/core";
import { FormProps } from "antd";
import { useState, useRef, useEffect, useCallback } from "react";

type Props<T> = {
  searchFormProps: FormProps<T>;
  filters: CrudFilter[];
  sorters: CrudSort[];
  setSorters: (sorters: CrudSort[]) => void;
};

export const useTableToolbar = <T extends object>(props: Props<T>) => {
  const { searchFormProps, filters, sorters, setSorters } = props;
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [activeSorter, setActiveSorter] = useState<number>(0);
  const refSearchButton = useRef<HTMLButtonElement>(null);

  const getActiveFilter = useCallback(() => {
    if (!searchFormProps.form?.getFieldsValue()) return;
    const values: any = searchFormProps.form?.getFieldsValue();
    let count = 0;
    for (const key in values) {
      if (
        !(
          values[key] === undefined ||
          values[key] === null ||
          values[key] === "" ||
          values[key].length === 0
        )
      ) {
        console.log("active", key);
        count++;
      }
    }
    return count;
  }, [searchFormProps.form]);

  const setResetFilter = useCallback(() => {
    const count = getActiveFilter();
    if (typeof count === "number") {
      setActiveFilter(count);
    }
  }, [getActiveFilter]);

  const setResetSorter = useCallback(() => {
    const count = sorters.length;
    setActiveSorter(count);
  }, [sorters.length]);

  const search = () => {
    searchFormProps.form?.submit();
    refSearchButton.current?.focus();
    setResetFilter();
  };

  useEffect(() => {
    setResetFilter();
  }, [filters, setResetFilter]);

  useEffect(() => {
    setResetSorter();
  }, [setResetSorter, sorters]);
  const resetFilter = () => {
    searchFormProps.form?.resetFields();
    searchFormProps.form?.submit();
  };
  const resetSorter = () => {
    setSorters([]);
  };
  return {
    searchFormProps,
    search,
    activeFilter,
    activeSorter,
    resetFilter,
    resetSorter,
    refSearchButton,
  };
};
