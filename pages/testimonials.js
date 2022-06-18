import { CircularProgress } from "@mui/material";
import useFetch from "../src/hooks/useFetch";
import Alert from "@mui/material/Alert";

import TestimonialView from "../src/views/TestimonialView";
import Navbar from "../src/components/Navbar";

export default function Testimonials() {
  const [data, loading, error] = useFetch(
    "https://randomuser.me/api/?results=10"
  );

  return (
    <>
      <Navbar></Navbar>
      {error && (
        <Alert severity="error">Could not fetch users: {error.message}</Alert>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <TestimonialView users={data.results} />
      )}
    </>
  );
}
