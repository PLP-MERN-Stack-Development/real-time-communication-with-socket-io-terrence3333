const formatMessage = ({ sender, message, isPrivate = false }) => ({
  id: Date.now(),
  sender,
  message,
  timestamp: new Date().toISOString(),
  isPrivate,
});

module.exports = { formatMessage };
