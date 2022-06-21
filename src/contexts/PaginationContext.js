import React, { useState } from "react";

export const PaginationContext = React.createContext([]);

export default function PaginationProvider(props) {
  const [page, setPage] = useState(props.idx);

  return (
    <PaginationContext.Provider value={[page, setPage]}>
      {props.children}
    </PaginationContext.Provider>
  );
}
