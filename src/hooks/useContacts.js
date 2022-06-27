import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useContacts() {
  const { data, error } = useSWR(`/api/chat`, fetcher, {
    refreshInterval: 30000,
  });

  return [data, !error && !data, error];
}
