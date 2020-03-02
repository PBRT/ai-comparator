import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Spinner, Icon, Intent } from "@blueprintjs/core";

import { TEST_IDS } from "../../tests/test-ids";
import SectionHeader from "../../components/section-header/SectionHeader";

function CompareAgentsContainer() {
  function refresh() {
    console.log("todo");
  }
  return (
    <div data-testid={TEST_IDS.CONTAINER_COMPARISON_ROOT}>
      <SectionHeader
        title="AI Comparator"
        subtitle="Visualize the performances differences between two agents."
        actions={[
          {
            action: refresh,
            label: "Refresh",
            icon: IconNames.REFRESH,
            tooltipText: "Re-fresh to get the latest data.",
            disabled: false,
            intent: Intent.NONE
          }
        ]}
      />
    </div>
  );
}

export default CompareAgentsContainer;
