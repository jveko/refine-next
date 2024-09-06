import React from "react";
import { Button, Card, CardProps, Flex, Space, SpaceProps, Spin } from "antd";
import { useBack, useRefineContext } from "@refinedev/core";

import { SaveButton, type SaveButtonProps } from "@refinedev/antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { RefineCrudCreateProps } from "@refinedev/ui-types";

type CreateProps = RefineCrudCreateProps<
  SaveButtonProps,
  SpaceProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  CardProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/create} for more details.
 */
export const RefineCreate: React.FC<CreateProps> = ({
  title,
  saveButtonProps: saveButtonPropsFromProps,
  children,
  resource: resourceFromProps,
  isLoading = false,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
}) => {
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const back = useBack();
  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
    htmlType: "submit",
  };

  const defaultFooterButtons = (
    <>
      <SaveButton {...saveButtonProps} />
    </>
  );

  return (
    <div style={{ marginBottom: "12px" }} {...(wrapperProps ?? {})}>
      
      <Card
        style={{
          padding: "0",
        }}
        title={
          <Space>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={back} />
            {title}
          </Space>
        }
        extra={
          <Space wrap {...(headerButtonProps ?? {})}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                  defaultButtons: null,
                })
                : headerButtons
              : null}
          </Space>
        }
        actions={[
          <Space
            key="action-buttons"
            style={{ float: "right", marginRight: 24 }}
            {...(footerButtonProps ?? {})}
          >
            {footerButtons
              ? typeof footerButtons === "function"
                ? footerButtons({
                  defaultButtons: defaultFooterButtons,
                  saveButtonProps: saveButtonProps,
                })
                : footerButtons
              : defaultFooterButtons}
          </Space>,
        ]}
        {...(headerProps ?? {})}
      >
        <Spin spinning={isLoading}>
          <div {...(contentProps ?? {})}>{children}</div>
        </Spin>
      </Card>
    </div>
  );
};
