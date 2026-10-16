/**
 * Integration script for Next.js application
 *
 * This script shows how to integrate the content worker into your Next.js application
 * so it runs automatically when your application starts.
 */

const { EventEmitter } = require('events');

const { contentWorkerService } = require('./content-worker-service');

// Create event emitter for content updates
const contentUpdateEmitter = new EventEmitter();

/**
 * Initialize content worker for Next.js application
 * Call this function in your application startup (e.g., in _app.tsx or server.js)
 */
const initializeContentWorker = async () => {
  try {
    // Start the content worker service
    await contentWorkerService.start();

    // Listen for content updates
    contentWorkerService.manager.worker?.on('message', (message) => {
      if (message.type === 'success') {
        // Emit content update event
        contentUpdateEmitter.emit('contentUpdated', {
          timestamp: message.timestamp,
          message: message.message,
        });
      }
    });

    // Set up graceful shutdown handlers
    const shutdownHandler = async () => {
      await contentWorkerService.stop();
    };

    process.on('SIGINT', shutdownHandler);
    process.on('SIGTERM', shutdownHandler);

    return contentWorkerService;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[ContentWorkerIntegration] Failed to initialize content worker:', error);

    throw error;
  }
};

/**
 * Get content worker status
 * Useful for health checks or monitoring
 */
const getContentWorkerStatus = () => {
  return contentWorkerService.getStatus();
};

/**
 * Force an immediate content update
 * Useful for manual triggers or API endpoints
 */
const forceContentUpdate = () => {
  contentWorkerService.manager.forceUpdate();
};

/**
 * Listen for content updates
 * Useful for invalidating caches or triggering rebuilds
 */
const onContentUpdate = (callback) => {
  contentUpdateEmitter.on('contentUpdated', callback);
};

/**
 * Remove content update listener
 */
const offContentUpdate = (callback) => {
  contentUpdateEmitter.off('contentUpdated', callback);
};

module.exports = {
  initializeContentWorker,
  getContentWorkerStatus,
  forceContentUpdate,
  onContentUpdate,
  offContentUpdate,
  contentWorkerService,
  contentUpdateEmitter,
};
