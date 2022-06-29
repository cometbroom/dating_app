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
import { Alert, Box, Snackbar } from "@mui/material";

export default function IndexApp({ pageProps }) {
  const [data, loading, error] = useFetch("api/profiles");
  const [session] = useSession();
  const [tab, setTab] = useState(0);
  const [peer] = usePeer(session);
  if (error) signOut({ callbackUrl: "/signup/" });

  return (
    <>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <ErrorProvider error={null} loading={loading}>
          <AudioProvider peer={peer}>
            <ApplicationLayout setTab={setTab}>
              {tab === 0 && data && (
                <PaginationProvider idx={data.index}>
                  <SonarView />
                </PaginationProvider>
              )}
              {tab === 1 && session && (
                <CommController session={session} peer={peer} />
              )}
            </ApplicationLayout>
          </AudioProvider>
        </ErrorProvider>
      </Box>
    </>
  );
}
