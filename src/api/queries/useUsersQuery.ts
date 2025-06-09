import { baseUrl, customFetch, throwUnhandledApiError } from "@/api/functions";
import { ListResponse, PaginationRequest } from "@/api/types";
import useCustomQuery from "@/api/useCustomQuery";
import { createPaginationRequest } from "@/functions/factories";
import { useLogoutOnForbidden } from "@/hooks/useAuth";

export const USERS_QUERY_KEY = "users" as const;

const useUsersQuery = (payload: PaginationRequest) => {
  const logoutOnForbidden = useLogoutOnForbidden();
  const { query } = createPaginationRequest(payload);

  return useCustomQuery<ListResponse<any[]>>([USERS_QUERY_KEY], async () => {
    const rsp = await customFetch(`${baseUrl}/admin/users?${query}`, {
      method: "GET",
      credentials: "include",
    });

    if (rsp.status === 200) {
      const data = await rsp.json();
      return data;
    }

    if (rsp.status === 401) {
      logoutOnForbidden();
      return;
    }

    return throwUnhandledApiError(rsp);
  });
};

export default useUsersQuery;
