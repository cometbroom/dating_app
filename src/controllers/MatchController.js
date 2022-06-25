import { useContext } from "react";
import MatchCard from "../components/MatchCard";
import { PaginationContext } from "../contexts/PaginationContext";
import useFetch from "../hooks/useFetch";
import { CASING } from "../tools/cases";
import ErrorProvider from "../tools/ErrorProvider";

export default function MatchController() {
  const [page, setPage] = useContext(PaginationContext);
  const [data, loading, error] = useFetch(`api/profiles/${page + 1}`);

  function sendInterest(interest) {
    fetch("api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interest: interest || 0 }),
    });
  }

  return (
    <>
      <ErrorProvider loading={loading} error={error}>
        {data && (
          <MatchCard
            img={data.img}
            title={data.name}
            dataInterest={parseInt(data.interest)}
            sendInterest={sendInterest}
            matchInterests={data.interests.map((x) => CASING.toTitleCase(x))}
          ></MatchCard>
        )}
      </ErrorProvider>
    </>
  );
}
