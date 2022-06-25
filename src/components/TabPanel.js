import { Box, Tab, Tabs, Toolbar } from "@mui/material";
import { useState } from "react";

export default function TabPanel({ tabLabels, tabContent }) {
  const [current, setCurrect] = useState(0);

  function handleChange(event, newValue) {
    setCurrect(newValue);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Tabs value={current} onChange={handleChange}>
        {tabLabels.map((x, idx) => (
          <Tab key={idx} label={x} />
        ))}
      </Tabs>

      {tabContent.map((y, idx) => (
        <div
          key={idx}
          hidden={idx !== current}
          aria-labelledby={`simple-tab-${idx}`}
        >
          {y}
        </div>
      ))}
    </Box>
  );
}
