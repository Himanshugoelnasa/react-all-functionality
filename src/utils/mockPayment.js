export const mockPayment = {
  initialStep: "idle",

  start: (callback) => {
    // Define the sequence of steps with their duration and target progress percentage
    const sequence = [
      { step: "connecting", duration: 1500, progress: 20 },
      { step: "verifying", duration: 2000, progress: 45 },
      { step: "processing", duration: 2500, progress: 70 },
      { step: "transferring", duration: 2000, progress: 90 },
      { step: "success", duration: 500, progress: 100 },
    ];

    let accumulatedDelay = 0;

    sequence.forEach((item) => {
      setTimeout(() => {
        callback(item.step, item.progress);
      }, accumulatedDelay);

      accumulatedDelay += item.duration;
    });
  },
};

