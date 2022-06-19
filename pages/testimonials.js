import TestimonialView from "../src/views/TestimonialView";
import ErrorProvider from "../src/tools/ErrorProvider";
import useFetch from "../src/hooks/useFetch";
import LandingLayout from "../src/Layouts/LandingLayout";

export default function Testimonials() {
  const [data, loading, error] = useFetch(
    "https://randomuser.me/api/?results=10"
  );

  return (
    <>
      <LandingLayout>
        <ErrorProvider loading={loading} error={error}>
          {data && <TestimonialView users={data.results} />}
        </ErrorProvider>
      </LandingLayout>
    </>
  );
}
