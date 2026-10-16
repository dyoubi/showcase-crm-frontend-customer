const { Worker, isMainThread, parentPort } = require('worker_threads');

const { exportAllContent } = require('./contentmanager');

// Worker thread implementation
if (!isMainThread) {
  // This code runs in the worker thread
  const runContentUpdate = async () => {
    try {
      // eslint-disable-next-line no-console
      console.log(`[Worker] Starting content update at ${new Date().toISOString()}`);

      // Run the content export
      await exportAllContent();

      // Send success message to parent
      parentPort.postMessage({
        type: 'success',
        message: 'Content update completed successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Worker] Content update failed:', error);

      // Send error message to parent
      parentPort.postMessage({
        type: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Listen for messages from parent thread
  parentPort.on('message', (message) => {
    if (message.type === 'update') {
      runContentUpdate();
    }
  });

  // Initial run when worker starts
  runContentUpdate();
}

// Main thread implementation - Content Worker Manager
class ContentWorkerManager {
  constructor() {
    this.worker = null;
    this.intervalId = null;
    this.isRunning = false;
    this.updateInterval = 60 * 60 * 1000; // 1 hour in milliseconds
    this.lastUpdate = null;
    this.lastError = null;
  }

  start() {
    if (this.isRunning) {
      // eslint-disable-next-line no-console
      console.log('[ContentWorkerManager] Worker is already running');

      return;
    }

    // eslint-disable-next-line no-console
    console.log('[ContentWorkerManager] Starting content worker...');
    this.isRunning = true;

    // Create and start the worker
    this.createWorker();

    // Set up interval for periodic updates
    this.intervalId = setInterval(() => {
      this.triggerUpdate();
    }, this.updateInterval);

    // eslint-disable-next-line no-console
    console.log(
      `[ContentWorkerManager] Content worker started. Updates every ${this.updateInterval / (1000 * 60)} minutes`,
    );
  }

  stop() {
    if (!this.isRunning) {
      // eslint-disable-next-line no-console
      console.log('[ContentWorkerManager] Worker is not running');

      return;
    }

    // eslint-disable-next-line no-console
    console.log('[ContentWorkerManager] Stopping content worker...');
    this.isRunning = false;

    // Clear interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Terminate worker
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }

    // eslint-disable-next-line no-console
    console.log('[ContentWorkerManager] Content worker stopped');
  }

  createWorker() {
    if (this.worker) {
      this.worker.terminate();
    }

    this.worker = new Worker(__filename);

    this.worker.on('message', (message) => {
      if (message.type === 'success') {
        // eslint-disable-next-line no-console
        console.log(`[ContentWorkerManager] ${message.message} at ${message.timestamp}`);
        this.lastUpdate = new Date(message.timestamp);
        this.lastError = null;
      } else if (message.type === 'error') {
        // eslint-disable-next-line no-console
        console.error(`[ContentWorkerManager] Worker error: ${message.message} at ${message.timestamp}`);
        this.lastError = {
          message: message.message,
          timestamp: new Date(message.timestamp),
        };
      }
    });

    this.worker.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error('[ContentWorkerManager] Worker thread error:', error);
      this.lastError = {
        message: error.message,
        timestamp: new Date(),
      };

      // Restart worker on error
      setTimeout(() => {
        if (this.isRunning) {
          this.createWorker();
        }
      }, 5000);
    });

    this.worker.on('exit', (code) => {
      if (code !== 0) {
        // eslint-disable-next-line no-console
        console.error(`[ContentWorkerManager] Worker stopped with exit code ${code}`);
      }
    });
  }

  triggerUpdate() {
    if (!this.worker || !this.isRunning) {
      // eslint-disable-next-line no-console
      console.log('[ContentWorkerManager] Cannot trigger update - worker not available');

      return;
    }

    // eslint-disable-next-line no-console
    console.log('[ContentWorkerManager] Triggering content update...');
    this.worker.postMessage({ type: 'update' });
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastUpdate: this.lastUpdate,
      lastError: this.lastError,
      updateInterval: this.updateInterval,
      nextUpdate: this.lastUpdate ? new Date(this.lastUpdate.getTime() + this.updateInterval) : null,
    };
  }

  // Force an immediate update
  forceUpdate() {
    // eslint-disable-next-line no-console
    console.log('[ContentWorkerManager] Forcing immediate content update...');
    this.triggerUpdate();
  }
}

// Export for use in main application
module.exports = {
  ContentWorkerManager,
  isMainThread,
};

// If this file is run directly, start the worker manager
if (require.main === module && isMainThread) {
  const manager = new ContentWorkerManager();

  // Start the worker
  manager.start();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    // eslint-disable-next-line no-console
    console.log('\n[ContentWorkerManager] Received SIGINT, shutting down gracefully...');
    manager.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    // eslint-disable-next-line no-console
    console.log('\n[ContentWorkerManager] Received SIGTERM, shutting down gracefully...');
    manager.stop();
    process.exit(0);
  });

  // Keep the process alive
  setInterval(() => {
    const status = manager.getStatus();

    // eslint-disable-next-line no-console
    console.log(
      `[ContentWorkerManager] Status check - Running: ${status.isRunning}, Last Update: ${
        status.lastUpdate || 'Never'
      }`,
    );
  }, 10 * 60 * 1000); // Status check every 10 minutes
}
