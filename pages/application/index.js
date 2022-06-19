import ApplicationLayout from "../../src/components/ApplicationLayout";
import MatchCard from "../../src/components/MatchCard";
import useFetch from "../../src/hooks/useFetch";
import ErrorProvider from "../../src/tools/ErrorProvider";
import MatchView from "../../src/views/MatchView";

export default function IndexApp() {
  const [data, loading, error] = useFetch("https://randomuser.me/api/");

  return (
    <ApplicationLayout>
      <ErrorProvider loading={loading} error={error}>
        {data && (
          <MatchView
            img={data.results[0].picture.large}
            title={data.results[0].name.first}
          ></MatchView>
        )}
      </ErrorProvider>
    </ApplicationLayout>
  );
}
