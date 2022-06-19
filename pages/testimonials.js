import TestimonialView from "../src/views/TestimonialView";
import Navbar from "../src/components/Navbar";
import ErrorProvider from "../src/tools/ErrorProvider";
import useFetch from "../src/hooks/useFetch";

export default function Testimonials() {
  const [data, loading, error] = useFetch(
    "https://randomuser.me/api/?results=10"
  );

  return (
    <>
      <Navbar></Navbar>
      <ErrorProvider loading={loading} error={error}>
        {data && <TestimonialView users={data.results} />}
      </ErrorProvider>
    </>
  );
}
