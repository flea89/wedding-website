module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'started',
      url: ['http://localhost:3000']
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
