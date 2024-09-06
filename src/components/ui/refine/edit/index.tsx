import React from "react";

import { Button, Card, CardProps, Flex, Space, SpaceProps, Spin } from "antd";
import {
  useBack,
  useGo,
  useMutationMode,
  useNavigation,
  useRefineContext,
  useResource,
  useRouterType,
  useToPath,
} from "@refinedev/core";

import {
  AutoSaveIndicator,
  DeleteButton,
  type DeleteButtonProps,
  ListButton,
  type ListButtonProps,
  RefreshButton,
  type RefreshButtonProps,
  SaveButton,
  type SaveButtonProps,
} from "@refinedev/antd";
import { RefineCrudEditProps } from "@refinedev/ui-types";
import { ArrowLeftOutlined } from "@ant-design/icons";

type EditProps = RefineCrudEditProps<
  SaveButtonProps,
  DeleteButtonProps,
  SpaceProps,
  SpaceProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  CardProps,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  object,
  RefreshButtonProps,
  ListButtonProps
>;
/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/edit} for more details.
 */
export const RefineEdit: React.FC<EditProps> = ({
  title,
  saveButtonProps: saveButtonPropsFromProps,
  mutationMode: mutationModeProp,
  recordItemId,
  children,
  deleteButtonProps: deleteButtonPropsFromProps,
  canDelete,
  resource: resourceFromProps,
  isLoading = false,
  dataProviderName,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
  autoSaveProps,
}) => {
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeProp ?? mutationModeContext;

  const routerType = useRouterType();
  const back = useBack();
  const go = useGo();
  const { goBack, list: legacyGoList } = useNavigation();

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource(resourceFromProps);

  const goListPath = useToPath({
    resource,
    action: "list",
  });

  const id = recordItemId ?? idFromParams;

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const hasList = resource?.list && !recordItemId;
  const isDeleteButtonVisible =
    canDelete ??
    ((resource?.meta?.canDelete ?? resource?.canDelete) ||
      deleteButtonPropsFromProps);

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
      ...(isLoading ? { disabled: true } : {}),
      resource: routerType === "legacy" ? resource?.route : identifier,
    }
    : undefined;

  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: routerType === "legacy" ? resource?.route : identifier,
    recordItemId: id,
    dataProviderName,
  };

  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? {
      ...(isLoading ? { disabled: true } : {}),
      resource: routerType === "legacy" ? resource?.route : identifier,
      mutationMode,
      onSuccess: () => {
        if (routerType === "legacy") {
          legacyGoList(resource?.route ?? resource?.name ?? "");
        } else {
          go({ to: goListPath });
        }
      },
      recordItemId: id,
      dataProviderName,
      ...deleteButtonPropsFromProps,
    }
    : undefined;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultHeaderButtons = (
    <>
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </>
  );

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
    </>
  );

  return (
    <div style={{ marginBottom: "12px" }} {...(wrapperProps ?? {})}>
      {/* <Flex */}
      {/* style={{ */}
      {/* paddingLeft: "8px", */}
      {/* paddingBottom: "8px", */}
      {/* }} */}
      {/* // > */}
      {/*{typeof breadcrumb !== "undefined" ? (*/}
      {/*  <>{breadcrumb}</> ?? undefined*/}
      {/*) : (*/}
      {/*  <Breadcrumb />*/}
      {/*)}*/}
      {/* </Flex> */}
      <Card
        title={
          <Space>
            {goBackFromProps == undefined ? (
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={
                  action !== "list" && typeof action !== "undefined"
                    ? routerType === "legacy"
                      ? goBack
                      : back
                    : undefined
                }
              />
            ) : (
              goBackFromProps
            )}
            {title}
          </Space>
        }
        extra={
          <Space wrap {...(headerButtonProps ?? {})}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                  defaultButtons: defaultHeaderButtons,
                  listButtonProps,
                  refreshButtonProps,
                })
                : headerButtons
              : defaultHeaderButtons}
          </Space>
        }
        {...(headerProps ?? {})}
        actions={[
          <Space
            key="footer-buttons"
            wrap
            style={{
              float: "right",
              marginRight: 24,
            }}
            {...(footerButtonProps ?? {})}
          >
            {footerButtons
              ? typeof footerButtons === "function"
                ? footerButtons({
                  defaultButtons: defaultFooterButtons,
                  deleteButtonProps,
                  saveButtonProps,
                })
                : footerButtons
              : defaultFooterButtons}
          </Space>,
        ]}
      >
        <Spin spinning={isLoading}>
          <div {...(contentProps ?? {})}>{children}</div>
        </Spin>
      </Card>
    </div>
  );
};
