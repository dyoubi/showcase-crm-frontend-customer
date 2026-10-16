#!/usr/bin/env node

/**
 * Content Worker Startup Script
 *
 * This script integrates the content worker into your Next.js application.
 * It can be used to start the content worker before your application starts,
 * or to run it as a standalone service.
 */

const { ContentWorkerManager } = require('./content-worker');

// Configuration
const WORKER_CONFIG = {
  // Update interval in milliseconds (default: 1 hour)
  updateInterval: process.env.CONTENT_UPDATE_INTERVAL || 60 * 60 * 1000,

  // Whether to run initial content sync on startup
  initialSync: process.env.CONTENT_INITIAL_SYNC !== 'false',

  // Whether to run as a standalone service
  standalone: process.env.CONTENT_WORKER_STANDALONE === 'true',
};

class ContentWorkerService {
  constructor() {
    this.manager = new ContentWorkerManager();
    this.manager.updateInterval = WORKER_CONFIG.updateInterval;
  }

  async start() {
    try {
      // eslint-disable-next-line no-console
      console.log('[ContentWorkerService] Starting content worker service...');

      if (WORKER_CONFIG.initialSync) {
        // eslint-disable-next-line no-console
        console.log('[ContentWorkerService] Performing initial content sync...');
        this.manager.forceUpdate();
      }

      // Start the worker manager
      this.manager.start();

      // eslint-disable-next-line no-console
      console.log('[ContentWorkerService] Content worker service started successfully');

      return this.manager;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[ContentWorkerService] Failed to start content worker service:', error);

      throw error;
    }
  }

  async stop() {
    try {
      // eslint-disable-next-line no-console
      console.log('[ContentWorkerService] Stopping content worker service...');

      this.manager.stop();

      // eslint-disable-next-line no-console
      console.log('[ContentWorkerService] Content worker service stopped successfully');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[ContentWorkerService] Error stopping content worker service:', error);
    }
  }

  getStatus() {
    return {
      ...this.manager.getStatus(),
      config: WORKER_CONFIG,
    };
  }
}

// Create and export service instance
const contentWorkerService = new ContentWorkerService();

// If running as standalone service
if (WORKER_CONFIG.standalone || require.main === module) {
  // Start the service
  contentWorkerService.start().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('[ContentWorkerService] Failed to start standalone service:', error);
    process.exit(1);
  });

  // Handle graceful shutdown
  const gracefulShutdown = async (signal) => {
    // eslint-disable-next-line no-console
    console.log(`\n[ContentWorkerService] Received ${signal}, shutting down gracefully...`);

    try {
      await contentWorkerService.stop();
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[ContentWorkerService] Error during shutdown:', error);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  // Keep process alive and log status periodically
  setInterval(() => {
    const status = contentWorkerService.getStatus();

    // eslint-disable-next-line no-console
    console.log(
      `[ContentWorkerService] Status - Running: ${status.isRunning}, ` +
        `Last Update: ${status.lastUpdate || 'Never'}, ` +
        `Next Update: ${status.nextUpdate || 'Unknown'}`,
    );
  }, 5 * 60 * 1000); // Status check every 5 minutes
}

module.exports = {
  ContentWorkerService,
  contentWorkerService,
  WORKER_CONFIG,
};
