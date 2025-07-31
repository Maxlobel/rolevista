import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Modal states
  modals: {
    exitConfirmation: false,
    premiumUpgrade: false,
    fileUpload: false,
  },
  // Sidebar state
  sidebarOpen: false,
  // Loading states
  globalLoading: false,
  // Toast notifications
  notifications: [],
  // Current page/section
  currentPage: null,
  // Mobile menu state
  mobileMenuOpen: false,
  // Theme (future feature)
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal management
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Mobile menu
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    
    // Loading state
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: 'info', // 'success', 'error', 'warning', 'info'
        message: '',
        duration: 5000,
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Page tracking
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    // Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  setGlobalLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  setCurrentPage,
  setTheme,
} = uiSlice.actions;

// Selectors
export const selectModals = (state) => state.ui.modals;
export const selectIsModalOpen = (modalName) => (state) => state.ui.modals[modalName];
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectGlobalLoading = (state) => state.ui.globalLoading;
export const selectNotifications = (state) => state.ui.notifications;
export const selectCurrentPage = (state) => state.ui.currentPage;
export const selectTheme = (state) => state.ui.theme;

export default uiSlice.reducer; 