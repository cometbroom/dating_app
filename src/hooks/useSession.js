import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useSession() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = getSession();
  useEffect(() => {
    setLoading(true);
    session
      .then((session) => {
        if (session) {
          setData(session.user);
        } else {
          return null;
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return [data, loading, error];
}
