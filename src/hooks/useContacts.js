import useSWR from "swr";

const fetcher = (...args) =>
  fetch(...args, { method: "GET" }).then((res) => {
    return res.json();
  });

export default function useContacts() {
  const { data, error } = useSWR(`/api/chat`, fetcher, {
    refreshInterval: 30000,
  });

  return [data, !error && !data, error];
}
