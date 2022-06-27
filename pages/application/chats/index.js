import { Toolbar } from "@mui/material";
import { useState } from "react";
import ChatController from "../../../src/controllers/ChatController";
import CommController from "../../../src/controllers/CommController";
import ApplicationLayout from "../../../src/Layouts/ApplicationLayout";

export default function Index() {
  const [barOpen, setBarOpen] = useState(true);

  const barHandler = (val) => {
    setBarOpen(val);
  };

  return (
    <>
      <ApplicationLayout toggleBar={barHandler}>
        <Toolbar />
        <CommController />
        {/* <ChatController bar={barOpen} /> */}
      </ApplicationLayout>
    </>
  );
}
