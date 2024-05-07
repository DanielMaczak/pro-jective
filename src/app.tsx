import { Button } from 'irmas-preact-form-components';

export function App() {
  return (
    <>
      <Button
        value="Click me!"
        action={() => console.log('Clicked!')}
        singleClick
      />
    </>
  );
}
