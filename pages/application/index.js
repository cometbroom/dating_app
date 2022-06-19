import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import MatchCard from "../../src/components/MatchCard";
import useFetch from "../../src/hooks/useFetch";
import ErrorProvider from "../../src/tools/ErrorProvider";
import MatchView from "../../src/views/MatchView";
import { useState } from "react";
import { GET_ERROR_PATH } from "../../src/tools/constants";
import { useRouter } from "next/router";

export default function IndexApp() {
  const [url, setUrl] = useState("https://randomuser.me/api/");
  const [data, loading, error] = useFetch(url);
  const router = useRouter();

  async function getNext() {
    try {
      const response = await fetch(url);
      const next = await response.json();
      return next;
    } catch (error) {
      router.push(GET_ERROR_PATH(error));
    }
  }

  return (
    <ApplicationLayout>
      <ErrorProvider loading={loading} error={error}>
        {data && (
          <MatchView
            img={data.results[0].picture.large}
            title={data.results[0].name.first}
            getNext={getNext}
          ></MatchView>
        )}
      </ErrorProvider>
    </ApplicationLayout>
  );
}
