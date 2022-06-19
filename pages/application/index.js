import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import MatchCard from "../../src/components/MatchCard";
import useFetch from "../../src/hooks/useFetch";
import MatchView from "../../src/views/MatchView";
import PaginationProvider from "../../src/contexts/PaginationContext";

export default function IndexApp() {
  return (
    <ApplicationLayout>
      <PaginationProvider>
        <MatchView />
      </PaginationProvider>
    </ApplicationLayout>
  );
}
