import { Toolbar } from "@mui/material";
import ChatController from "../../../src/controllers/ChatController";
import ApplicationLayout from "../../../src/Layouts/ApplicationLayout";

export default function index() {
  return (
    <>
      <ApplicationLayout>
        <Toolbar />
        <ChatController />
      </ApplicationLayout>
    </>
  );
}
