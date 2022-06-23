import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function TabPanel({ tabLabels, tabContent }) {
  const [current, setCurrect] = useState(0);

  function handleChange(event, newValue) {
    setCurrect(newValue);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Tabs value={current} onChange={handleChange}>
        {tabLabels.map((x) => (
          <Tab label={x} />
        ))}
      </Tabs>
      {tabContent.map((y, idx) => (
        <div hidden={idx !== current} aria-labelledby={`simple-tab-${idx}`}>
          {y}
        </div>
      ))}
    </Box>
  );
}
