import { CircularProgress } from "@mui/material";
import useFetch from "../src/hooks/useFetch";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

import TestimonialView from "../src/views/TestimonialView";
import Navbar from "../src/components/Navbar";

export default function Testimonials() {
  const [data, loading, error] = useFetch(
    "https://randomuser.me/api/?results=10"
  );
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <>
      <Alert severity="error">Could not fetch users: {error}</Alert>

      <Navbar></Navbar>
      {error && navigate(`/error/${error}`)}
      {loading ? (
        <CircularProgress />
      ) : (
        data && <TestimonialView users={data.results} />
      )}
    </>
  );
}
