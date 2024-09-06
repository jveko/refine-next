import { Button, Col, Form, Input, Row, Space, Tooltip } from "antd";
import React, { PropsWithChildren, useState } from "react";
import { useTableToolbar } from "@/hooks/table-toolbar";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";

type Props<T extends object> = ReturnType<typeof useTableToolbar<T>> & {
  children: React.ReactNode;
};
export const TableToolbar = <T extends object>(
  props: PropsWithChildren<Props<T>>
) => {
  const {
    search,
    activeFilter,
    activeSorter,
    resetFilter,
    resetSorter,
    searchFormProps,
    refSearchButton,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Row
      style={{
        paddingBottom: 12,
      }}
      justify={"space-between"}
      align={"middle"}
    >
      <Col xs={24} md={12}>
        <Space>
          <Tooltip title={`${activeFilter} Filters`}>
            <React.Fragment>
              <Button
                type={"default"}
                onClick={resetFilter}
                disabled={activeFilter === 0}
                style={{
                  borderColor: "#d9d9d9",
                }}
              >
                Reset Filter
              </Button>
            </React.Fragment>
          </Tooltip>
          <Tooltip title={`${activeSorter} Sort`}>
            <React.Fragment>
              <Button
                type={"default"}
                onClick={resetSorter}
                disabled={activeSorter === 0}
                style={{
                  borderColor: "#d9d9d9",
                }}
              >
                Reset Sort
              </Button>
            </React.Fragment>
          </Tooltip>
        </Space>
      </Col>
      <Col xs={24} md={12}>
        <Row justify={"end"}>
          <Form {...searchFormProps}>
            <Space>
              <Button
                type={"link"}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                style={{
                  color: "#185FA3",
                }}
              >
                Advanced {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </Button>
              <Form.Item name={"q"} noStyle>
                <Input.Search
                  placeholder={"Search"}
                  onPressEnter={search}
                  enterButton={
                    <Button
                      ref={refSearchButton}
                      icon={<SearchOutlined />}
                      htmlType={"submit"}
                      type={"primary"}
                    />
                  }
                />
              </Form.Item>
            </Space>
          </Form>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          style={{
            display: isOpen ? "block" : "none",
            paddingTop: 12,
          }}
          justify={"end"}
        >
          {props.children}
        </Row>
      </Col>
    </Row>
  );
};
