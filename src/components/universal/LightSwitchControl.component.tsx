import { useState } from 'preact/hooks';
import { Button } from 'irmas-preact-form-components';

export function LightSwitchControl() {
  const [nightMode, switchNightMode] = useState<boolean>(false);
  return (
    <Button
      value={nightMode ? 'Night' : 'Day'}
      action={() => switchNightMode(!nightMode)}
    />
  );
}
