"use client";
import { AxiosInstance } from "axios";
import queryString from "query-string";
import { DataProvider, LogicalFilter } from "@refinedev/core";
import { generateFilter, generateSort } from "@utils";
import { axiosApp } from "@instances";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

const dataProvider = (
  httpClient: AxiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    console.log(httpClient.getUri());
    const url = `${resource}`;
    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
    const {
      headers: headersFromMeta,
      method,
      queries: queriesFromMeta,
    } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";
    const searchAll = filters
      ?.filter((x) => (x as LogicalFilter)?.field == "q")
      .at(0);

    if (searchAll != undefined) {
      filters = filters?.filter((x) => (x as LogicalFilter)?.field != "q");
    }
    const queryFilters = generateFilter(filters);
    const query: {
      page?: number;
      size?: number;
      sort?: string;
    } = {};

    if (mode === "server") {
      query.page = current;
      query.size = pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sort = _sort
        .map(function (sort, i) {
          if (_order[i] === "desc") return `-${sort}`;
          return sort;
        })
        .join(",");
    }
    const combinedQuery: {
      page?: number;
      size?: number;
      filters?: string;
      sort?: string;
      search?: string;
      [key: string]: any;
    } = { ...query, filters: queryFilters, ...queriesFromMeta };

    if (searchAll != undefined) {
      combinedQuery["search"] = searchAll.value;
    }
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${queryString.stringify(combinedQuery)}`
      : url;
    const { data } = await httpClient[requestMethod](urlWithQuery, {
      headers: headersFromMeta,
    });
    const total = +data["totalData"];

    return {
      data: data["data"] || data,
      total: total || data.length,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](
      `${resource}?${queryString.stringify({ id: ids })}`,
      { headers }
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](url, { headers });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return httpClient.getUri();
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
    meta,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${queryString.stringify(sortQuery)}`;
      }
    }
    if (meta?.queries) {
      requestUrl = `${requestUrl}&${queryString.stringify(meta.queries)}`;
    }
    // if (filters) {
    //   const filterQuery = generateFilter(filters);
    //   requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    // }

    if (query) {
      requestUrl = `${requestUrl}&${queryString.stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

export const dataProviderApp = dataProvider(axiosApp);
