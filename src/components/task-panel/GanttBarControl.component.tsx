import { useState } from 'preact/hooks';

import { CSS_BAR_WIDTH } from '../../services/constants.service';

export const GanttBarControl = () => {
  const [planOffset, _] = useState<number>(Math.floor(Math.random() * 5));
  const [planWidth, __] = useState<number>(Math.floor(Math.random() * 15));
  const [realityOffset, ___] = useState<number>(
    planOffset + Math.floor(Math.random() * 3)
  );
  const [realityWidth, ____] = useState<number>(Math.floor(Math.random() * 25));
  const [totalWidth, _____] = useState<number[]>([
    ...Array(realityOffset + realityWidth).keys(),
  ]);
  return (
    <div class="input-group gantt-bar-control">
      {/* Lighter bar showing plan */}
      <div
        class="gantt-bar-plan-control"
        style={
          `left: ${planOffset * CSS_BAR_WIDTH}rem;` +
          `width: ${planWidth * CSS_BAR_WIDTH}rem;`
        }
      ></div>
      {/* Darker bar showing real progress */}
      <div
        class="gantt-bar-reality-control"
        style={
          `left: ${realityOffset * CSS_BAR_WIDTH}rem;` +
          `width: ${realityWidth * CSS_BAR_WIDTH}rem;`
        }
      ></div>
      {/* Grid behind */}
      <table className="gantt-bar-back-control">
        <tr>
          {totalWidth.map(_ => (
            <td></td>
          ))}
        </tr>
      </table>
    </div>
  );
};
