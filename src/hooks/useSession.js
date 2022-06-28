import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSession() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
      .catch(() => {
        router.replace("/signup");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return [data, loading];
}
