import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import useFetch from "../../src/hooks/useFetch";
import MatchView from "../../src/views/MatchView";
import PaginationProvider from "../../src/contexts/PaginationContext";
import ErrorProvider from "../../src/tools/ErrorProvider";

export default function IndexApp() {
  const [data, loading, error] = useFetch("api/profiles");

  return (
    <ApplicationLayout>
      <ErrorProvider error={error} loading={loading}>
        {data && (
          <PaginationProvider idx={data.index}>
            <MatchView />
          </PaginationProvider>
        )}
      </ErrorProvider>
    </ApplicationLayout>
  );
}
