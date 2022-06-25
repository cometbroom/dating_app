import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import useFetch from "../../src/hooks/useFetch";
import MatchView from "../../src/views/MatchView";
import PaginationProvider from "../../src/contexts/PaginationContext";
import ErrorProvider from "../../src/tools/ErrorProvider";

export default function IndexApp({ pageProps }) {
  const [data, loading, error] = useFetch("api/profiles");

  return (
    <ErrorProvider error={error} loading={loading}>
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
