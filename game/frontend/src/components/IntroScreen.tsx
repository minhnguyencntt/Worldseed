import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

export interface IntroScreenProps {
  onBegin: () => void;
}

export function IntroScreen({ onBegin }: IntroScreenProps) {
  return (
    <section className="intro-screen sf-fullscreen-bg">
      <Dialog open onOpenChange={(next) => { if (!next) onBegin(); }}>
        <DialogContent className="sf-frame-parchment sf-dialog text-center">
          <DialogTitle className="sr-only">Introduction</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>Every great adventure begins with a question.</p>
              <p>I'm just a boy in my room. I don't know what happens next.</p>
              <p>You decide.</p>
              <p>What should I do?</p>
            </div>
          </DialogDescription>
          <Button variant="gold" onClick={onBegin}>
            Begin
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
