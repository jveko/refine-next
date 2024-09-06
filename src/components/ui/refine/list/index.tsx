import React from "react";
import { Card, Flex, Space, SpaceProps } from "antd";
import { useRefineContext, useResource, useRouterType } from "@refinedev/core";

import { CreateButton, type CreateButtonProps } from "@refinedev/antd";
import { CardProps } from "antd/lib";
import { RefineCrudListProps } from "@refinedev/ui-types";
import { createStyles } from "antd-style";

type ListProps = RefineCrudListProps<
  CreateButtonProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  CardProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/list} for more details.
 */
export const RefineList: React.FC<ListProps> = ({
  canCreate,
  title,
  children,
  createButtonProps: createButtonPropsFromProps,
  resource: resourceFromProps,
  wrapperProps,
  contentProps,
  headerProps,
  breadcrumb: breadcrumbFromProps,
  headerButtonProps,
  headerButtons,
}) => {
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const { styles } = useStyles();

  const routerType = useRouterType();

  const { resource, identifier } = useResource(resourceFromProps);

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonPropsFromProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? {
        size: "middle",
        resource: routerType === "legacy" ? resource?.route : identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultExtra = isCreateButtonVisible ? (
    <CreateButton {...createButtonProps} />
  ) : null;

  return (
    <div style={{ marginBottom: "12px" }} {...(wrapperProps ?? {})}>
      <Card
        title={title}
        extra={
          headerButtons ? (
            <Space wrap {...headerButtonProps}>
              {typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultExtra,
                    createButtonProps,
                  })
                : headerButtons}
            </Space>
          ) : (
            defaultExtra
          )
        }
        className={styles.card}
        {...(headerProps ?? {})}
      >
        <div {...(contentProps ?? {})}>{children}</div>
      </Card>
    </div>
  );
};

const useStyles = createStyles({
  card: {
    ".ant-card-body": {
      padding: "12px 24px",
    },
  },
});
