export default {
    DB_URI: process.env.DB_URI || "mongodb://127.0.0.1:27017/assignmentPortal",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    PORT: process.env.PORT || 5000,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
};