import React, {forwardRef, useImperativeHandle} from "react";
import {Button, Row, Select} from "antd";
import {FilterFilled} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";
import {CrudOperators} from "@refinedev/core";
import {DefaultOptionType} from "rc-select/es/Select";
import type {SelectProps} from "antd/lib/select";

type Props<
  TOption extends DefaultOptionType = DefaultOptionType,
> =
  {
    placeholder: React.ReactNode;
    options?: TOption[]
    mode?: 'multiple' | 'tags';
  }
  & Omit<FilterDropdownProps, 'filters'>
  & Pick<SelectProps<TOption>, 'options' | 'onSearch' | 'loading' | 'showSearch' | 'filterOption'>;
const operator: Extract<CrudOperators, "in"> = "in";

export const FilterDropdownSearchSelect = forwardRef(<
  TOption extends DefaultOptionType = DefaultOptionType,
>(props: Props<TOption>, ref: React.Ref<unknown> | undefined) => {
  const {
    setSelectedKeys,
    selectedKeys,
    clearFilters,
    confirm,
    options,
    visible
  } = props;

  const handleSearch = () => {
    const filteredKeys = [...selectedKeys.filter(key => key !== operator)];
    if (filteredKeys.length <= 1) {
      confirm();
      return;
    }
    setSelectedKeys([...selectedKeys.filter(key => key !== operator), operator]);
    confirm();
  }

  const handleOnChange = (e: React.Key[] | React.Key) => {
    if (Array.isArray(e)) {
      setSelectedKeys(e)
    } else {
      setSelectedKeys(e ? [e] : [])
    }
  }

  const handleReset = (close: boolean) => {
    if (clearFilters) {
      clearFilters();
      confirm({closeDropdown: close});
    }
  }
  useImperativeHandle(ref, () => ({
    handleSearch,
    handleReset
  }));

  return <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
    <Select
      options={options}
      value={selectedKeys.filter((key) => key !== operator)}
      onChange={handleOnChange}
      style={{marginBottom: 8, display: 'block', minWidth: 200, maxWidth: 500}}
      {...props}
    />
    <Row justify={"space-between"}>
      <Button
        onClick={() => handleReset(false)}
        size="small"
        disabled={selectedKeys.length === 0}
        type={"link"}
        style={{paddingRight: 10}}
      >
        Reset
      </Button>
      <Button
        type="primary"
        onClick={() => handleSearch()}
        icon={<FilterFilled/>}
        size="small"
      >
        Filter
      </Button>
    </Row>
  </div>
});