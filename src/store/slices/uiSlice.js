import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    hoverEnabled: true,
    openMenu: "",
    openAccountingMenu: "",
    openReportingMenu: "",
    selectedSession: "2026-2027",
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
      state.hoverEnabled = !state.hoverEnabled;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setHoverEnabled: (state, action) => {
      state.hoverEnabled = action.payload;
    },
    toggleMenu: (state, action) => {
      state.openMenu = state.openMenu === action.payload ? "" : action.payload;
    },
    toggleAccountingMenu: (state, action) => {
      state.openAccountingMenu =
        state.openAccountingMenu === action.payload ? "" : action.payload;
    },
    toggleReportingMenu: (state, action) => {
      state.openReportingMenu =
        state.openReportingMenu === action.payload ? "" : action.payload;
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setHoverEnabled,
  toggleMenu,
  toggleAccountingMenu,
  toggleReportingMenu,
  setSelectedSession,
} = uiSlice.actions;

export default uiSlice.reducer;
