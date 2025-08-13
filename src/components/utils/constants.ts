// API Configuration
export const API_BASEURL = "https://api.infinitermis.com";

// Application Configuration
export const APP_NAME = "Mindset Dashboard";
export const APP_VERSION = "1.0.0";

// Routes
export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  USERS: "/users",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "theme",
  SIDEBAR_COLLAPSED: "sidebar_collapsed",
  USER_PREFERENCES: "user_preferences",
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  API: "yyyy-MM-dd",
  DATETIME: "MMM dd, yyyy HH:mm",
} as const;
