import { useContext, useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { PaginationContext } from "../contexts/PaginationContext";
import useFetch from "../hooks/useFetch";
import ErrorProvider from "../tools/ErrorProvider";

export default function MatchController() {
  const [page, setPage] = useContext(PaginationContext);
  const [data, loading, error] = useFetch(`api/profiles/${page + 1}`);

  function sendInterest(interest) {
    // fetch("api/users/62b0b0b91199f720c21ce3d5", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: "62b0a66d1199f720c21ce1e0" }),
    // });
  }

  return (
    <>
      <ErrorProvider loading={loading} error={error}>
        {data && (
          <MatchCard
            img={data.img}
            title={data.name}
            dataInterest={parseInt(data.interest, 10) || 0}
            sendInterest={sendInterest}
          ></MatchCard>
        )}
      </ErrorProvider>
    </>
  );
}
