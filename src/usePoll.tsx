import React from 'react';
import { useLatest } from 'react-use';

export type MaybePromise<T> = Promise<T> | T;

export interface UsePollOption {
  onCompleted?: () => void;
  onFailed?: () => void;

  /**
   * This function determines whether polling is complete or not; return `true` to complete polling or `false` to continue
   */
  onPoll: () => MaybePromise<boolean>;

  maxTries: number;
  delay: number;
  initialDelay?: number;
}

export const usePoll = (option: UsePollOption): [() => void, boolean, () => void] => {
  const { onCompleted, onFailed, onPoll, maxTries, delay, initialDelay = 0 } = option;

  const latestOnCompleted = useLatest(onCompleted);
  const latestOnFailed = useLatest(onFailed);
  const latestOnPoll = useLatest(onPoll);

  const [running, setRunning] = React.useState(false);
  const triesRef = React.useRef(0);

  const retry = React.useCallback(async () => {

    if (triesRef.current == -1) return;

    const now = Date.now();
    const result = await latestOnPoll.current?.();
    if (triesRef.current == -1) return;
    
    if (result) {
      setRunning(false);
      triesRef.current = 0;
      return latestOnCompleted.current?.();
    }
    
    triesRef.current++;
    if (triesRef.current >= maxTries) {
      setRunning(false);
      triesRef.current = 0;
      return latestOnFailed.current?.();
    }

    await sleep(delay - (Date.now() - now));
    await retry();
  }, [latestOnCompleted, latestOnFailed, latestOnPoll, delay, maxTries]);

  const startPoll = React.useCallback(async () => {
    setRunning(true);

    triesRef.current = 0;

    if (triesRef.current <= 0) {
      await sleep(initialDelay);
      retry();
      return;
    }
  }, [initialDelay, retry]);

  const stopPoll = React.useCallback(() => {
    triesRef.current = -1;
  }, []);

  React.useEffect(() => {
    return () => stopPoll();
  }, [stopPoll]);

  return [startPoll, running, stopPoll];
}

const sleep = async (ms: number) => new Promise(r => setTimeout(r, ms)); 