import React, { useState } from "react";

export const PaginationContext = React.createContext([]);

export default function PaginationProvider(props) {
  const [page, setPage] = useState(0);

  return (
    <PaginationContext.Provider value={[page, setPage]}>
      {props.children}
    </PaginationContext.Provider>
  );
}
