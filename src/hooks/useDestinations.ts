import { useQuery } from "react-query";
import { getDestinations } from "../api/fake-api";
import { Destination } from "../api/model";

interface Props {
  query?: string | undefined;
  enabled?: boolean;
}

export const useDestinations = ({ query, enabled }: Props) => {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["destinations", { query }],
    queryFn() {
      return getDestinations(query);
    },
    enabled,
  });

  return {
    destinations,
    isLoading,
  };
};
