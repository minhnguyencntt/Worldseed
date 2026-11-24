import { Button } from './ui/button';
import { Frame } from './ui/Frame';

export interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <section className="intro-screen sf-fullscreen-bg">
      <Frame kind="parchment" className="sf-dialog text-center">
        <p>Every great adventure begins with a question.</p>
        <p>I'm just a boy in my room. I don't know what happens next.</p>
        <p>You decide.</p>
        <p>What should I do?</p>
        <Button variant="gold" onClick={onBegin}>
          Begin
        </Button>
      </Frame>
    </section>
  );
}
