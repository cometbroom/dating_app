import useSWR from "swr";

const fetcher = (...args) =>
  fetch(...args, { method: "POST" }).then((res) => res.json());

export default function useUpdate(id) {
  const { data, error } = useSWR(`/api/chat/${id}`, fetcher, {
    refreshInterval: 30000,
  });

  return;
}
