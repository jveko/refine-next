import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Button, Input, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";
import {CrudOperators} from "@refinedev/core";

type Props = {
  placeholder?: string;
  operator: Extract<CrudOperators, "eq" | "contains">
} & FilterDropdownProps;

export const FilterDropdownSearchInput = forwardRef((props: Props, ref) => {
  const {
    placeholder,
    setSelectedKeys,
    selectedKeys,
    clearFilters,
    confirm,
    operator,
    visible
  } = props;
  useEffect(() => {
    setUpdate((u) => u + 1); // Force re-render
    console.log("update", u)
  }, [visible]);
  const [u, setUpdate] = useState(0);
  const handleSearch = () => {
    setSelectedKeys([selectedKeys[0], operator]);
    confirm();
    setUpdate((u) => u + 1); // Force re-render

  }

  const handleReset = (close: boolean) => {
    if (clearFilters) {
      clearFilters();
      confirm({closeDropdown: close});
      setUpdate((u) => u + 1); // Force re-render
    }
  }

  useImperativeHandle(ref, () => ({
    handleSearch,
    handleReset
  }));

  return <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
    <Input
      placeholder={placeholder}
      value={selectedKeys[0]}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => handleSearch()}
      style={{marginBottom: 8, display: 'block'}}
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
        icon={<SearchOutlined/>}
        size="small"
      >
        Search
      </Button>
    </Row>
  </div>
});