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
    fetch("api/users/62b0b0b91199f720c21ce3d5", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "62b0a66d1199f720c21ce1e0" }),
    });
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
