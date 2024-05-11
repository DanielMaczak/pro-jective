export const TaskPanelFooter = () => {
  return (
    <tfoot className="task-panel-footer">
      <tr className="task-panel-footer-row">
        {/* Task info */}
        <td className="task-panel-info sticky-col-0 bottom-left"></td>
        <td className="task-panel-info sticky-col-1"></td>
        <td className="task-panel-info sticky-col-2 bottom-right"></td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Plan */}
        <td className="task-panel-plan bottom-left"></td>
        <td className="task-panel-plan"></td>
        <td className="task-panel-plan"></td>
        <td className="task-panel-plan"></td>
        <td className="task-panel-plan"></td>
        <td className="task-panel-plan bottom-right"></td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Reality */}
        <td className="task-panel-reality bottom-left"></td>
        <td className="task-panel-reality"></td>
        <td className="task-panel-reality"></td>
        <td className="task-panel-reality"></td>
        <td className="task-panel-reality bottom-right"></td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Gantt */}
        <td className="task-panel-gantt bottom-left"></td>
        <td className="task-panel-gantt"></td>
        <td className="task-panel-gantt"></td>
        <td className="task-panel-gantt"></td>
        <td className="task-panel-gantt"></td>
        <td className="task-panel-gantt"></td>
        <td className="task-panel-gantt bottom-right"></td>
      </tr>
    </tfoot>
  );
};
