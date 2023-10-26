import { useQuery } from "react-query";
import { Destination } from "../api/model";
import { getNearbyDestinations } from "../api/fake-api";

interface Args {
  current: Destination;
}

export const useNearbyDestinations = ({ current }: Args) => {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["nearby", { current }],
    queryFn() {
      return getNearbyDestinations(current);
    },
  });

  return {
    destinations,
    isLoading,
  };
};
