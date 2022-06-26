import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import useFetch from "../../src/hooks/useFetch";
import MatchView from "../../src/views/MatchView";
import PaginationProvider from "../../src/contexts/PaginationContext";
import ErrorProvider from "../../src/tools/ErrorProvider";
import { signOut } from "next-auth/react";

export default function IndexApp({ pageProps }) {
  const [data, loading, error] = useFetch("api/profiles");
  if (error) signOut({ callbackUrl: "/signup/" });

  return (
    <ErrorProvider error={null} loading={loading}>
      <ApplicationLayout>
        {data && (
          <PaginationProvider idx={data.index}>
            <MatchView />
          </PaginationProvider>
        )}
      </ApplicationLayout>
    </ErrorProvider>
  );
}
