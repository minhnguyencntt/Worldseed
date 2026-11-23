export interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <section className="intro-screen">
      <p>Every great adventure begins with a question.</p>
      <p>I'm just a boy in my room. I don't know what happens next.</p>
      <p>You decide.</p>
      <p>What should I do?</p>
      <button type="button" onClick={onBegin}>
        Begin
      </button>
    </section>
  );
}
