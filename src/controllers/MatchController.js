import { useContext, useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { PaginationContext } from "../contexts/PaginationContext";
import useFetch from "../hooks/useFetch";
import ErrorProvider from "../tools/ErrorProvider";

export default function MatchController() {
  const [page, setPage] = useContext(PaginationContext);
  const [data, loading, error] = useFetch(
    `https://randomuser.me/api/?page=${page}&results=1&seed=abc`
  );

  function sendInterest(interest) {
    console.log(interest);
  }

  return (
    <>
      <ErrorProvider loading={loading} error={error}>
        {data && (
          <MatchCard
            img={data.results[0].picture.large}
            title={data.results[0].name.first}
            dataInterest={data.results[0].interest || 0}
            sendInterest={sendInterest}
          ></MatchCard>
        )}
      </ErrorProvider>
    </>
  );
}
