import ApplicationLayout from "../../src/Layouts/ApplicationLayout";
import useFetch from "../../src/hooks/useFetch";
import SonarView from "../../src/views/SonarView";
import PaginationProvider from "../../src/contexts/PaginationContext";
import ErrorProvider from "../../src/tools/ErrorProvider";
import { signOut } from "next-auth/react";
import usePeer from "../../src/hooks/usePeer";
import CommController from "../../src/controllers/CommController";
import { useState } from "react";
import useSession from "../../src/hooks/useSession";
import AudioProvider from "../../src/contexts/AudioContext";

export default function IndexApp({ pageProps }) {
  const [data, loading, error] = useFetch("api/profiles");
  const [session, loadSession, errSession] = useSession();
  const [tab, setTab] = useState(0);
  const [peer] = usePeer(session);
  if (error) signOut({ callbackUrl: "/signup/" });

  return (
    <ErrorProvider error={null} loading={loading}>
      <AudioProvider peer={peer}>
        <ApplicationLayout setTab={setTab}>
          {tab === 0 && data && (
            <PaginationProvider idx={data.index}>
              <SonarView />
            </PaginationProvider>
          )}
          {tab === 1 && <CommController session={session} peer={peer} />}
        </ApplicationLayout>
      </AudioProvider>
    </ErrorProvider>
  );
}
