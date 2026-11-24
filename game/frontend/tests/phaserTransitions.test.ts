import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { reactToPhaser } from '../src/phaser/events';
import { TRANSITION_FADE_MS, createTransitions } from '../src/phaser/transitions';

// Phaser is a browser canvas runtime, so it is replaced with a fake. Only the event name used by
// createTransitions is provided; the real reactToPhaser bus is used unchanged.
vi.mock('phaser', () => ({
  default: {
    Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
  },
}));

interface FakeScene {
  cameras: { main: { once: Mock; fadeOut: Mock } };
  scene: { get: Mock; start: Mock };
}

function makeFakeScene(): FakeScene {
  return {
    cameras: { main: { once: vi.fn(), fadeOut: vi.fn() } },
    scene: {
      get: vi.fn((id: string) => (id === 'library' ? {} : null)),
      start: vi.fn(),
    },
  };
}

// Returns the handler registered with cam.once for the fade-out completion event.
function completionCallback(fake: FakeScene): () => void {
  const call = fake.cameras.main.once.mock.calls.find(
    ([event]) => event === 'camerafadeoutcomplete',
  );
  if (!call) throw new Error('fade-out completion callback was not registered');
  return call[1] as () => void;
}

describe('createTransitions', () => {
  let fake: FakeScene;

  beforeEach(() => {
    reactToPhaser.clear();
    fake = makeFakeScene();
  });

  it('fades out once and starts the target scene only after the fade completes', () => {
    // Given a transitions handler for a scene that exists
    createTransitions(fake as never);

    // When a transition to 'library' is requested
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });

    // Then the camera fades out for the configured duration and the scene is not started yet
    expect(fake.cameras.main.fadeOut).toHaveBeenCalledTimes(1);
    expect(fake.cameras.main.fadeOut).toHaveBeenCalledWith(TRANSITION_FADE_MS);
    expect(fake.scene.start).not.toHaveBeenCalled();

    // When the fade-out completes
    completionCallback(fake)();

    // Then the target scene is started exactly once
    expect(fake.scene.start).toHaveBeenCalledTimes(1);
    expect(fake.scene.start).toHaveBeenCalledWith('library');
  });

  it('ignores a second request while a fade is running, and accepts requests again after completion', () => {
    // Given a transition already in progress
    createTransitions(fake as never);
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });

    // Then only one fade has started
    expect(fake.cameras.main.fadeOut).toHaveBeenCalledTimes(1);

    // When the fade completes and a new request arrives
    completionCallback(fake)();
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });

    // Then a new fade starts
    expect(fake.cameras.main.fadeOut).toHaveBeenCalledTimes(2);
  });

  it('does not fade for an empty or unknown scene id', () => {
    // Given a transitions handler
    createTransitions(fake as never);

    // When requests name an empty scene id and a scene that does not exist
    reactToPhaser.emit('transitionTo', { sceneId: '' });
    reactToPhaser.emit('transitionTo', { sceneId: 'nope' });

    // Then no fade starts and no scene is started
    expect(fake.cameras.main.fadeOut).not.toHaveBeenCalled();
    expect(fake.scene.start).not.toHaveBeenCalled();
  });

  it('ignores transition requests after dispose', () => {
    // Given a transitions handler that has been disposed
    const transitions = createTransitions(fake as never);
    transitions.dispose();

    // When a transition is requested
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });

    // Then no fade starts
    expect(fake.cameras.main.fadeOut).not.toHaveBeenCalled();
    expect(fake.scene.start).not.toHaveBeenCalled();
  });

  it('does not start the target scene when dispose runs before the pending fade completes', () => {
    // Given a fade in progress
    const transitions = createTransitions(fake as never);
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    expect(fake.cameras.main.fadeOut).toHaveBeenCalledTimes(1);

    // When the handler is disposed before the fade-out completion callback runs
    transitions.dispose();
    completionCallback(fake)();

    // Then the target scene is not started
    expect(fake.scene.start).not.toHaveBeenCalled();
  });
});
