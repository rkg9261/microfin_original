import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractError, normalizeList } from "./utils";

const initialState = {
  items: [],
  loading: false,
  saving: false,
  error: "",
};

export const createCrudSlice = ({ name, api }) => {
  const fetchAll = createAsyncThunk(
    `${name}/fetchAll`,
    async (_, { rejectWithValue }) => {
      try {
        const data = await api.getAll();
        return normalizeList(data);
      } catch (error) {
        return rejectWithValue(extractError(error));
      }
    }
  );

  const createItem = createAsyncThunk(
    `${name}/create`,
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        const data = await api.create(payload);
        try {
          await dispatch(fetchAll()).unwrap();
        } catch {
          // Keep create success even if list refresh fails (e.g. 204 list APIs).
        }
        return data;
      } catch (error) {
        return rejectWithValue(extractError(error));
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/update`,
    async ({ id, data }, { dispatch, rejectWithValue }) => {
      try {
        const result = await api.update(id, data);
        try {
          await dispatch(fetchAll()).unwrap();
        } catch {
          // Keep update success even if list refresh fails.
        }
        return result;
      } catch (error) {
        return rejectWithValue(extractError(error));
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/delete`,
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const result = await api.remove(id);
        await dispatch(fetchAll());
        return result;
      } catch (error) {
        return rejectWithValue(extractError(error));
      }
    }
  );

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = "";
      },
      setItems: (state, action) => {
        state.items = action.payload || [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(fetchAll.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.items = [];
          state.error = action.payload || "Failed to load data.";
        })
        .addCase(createItem.pending, (state) => {
          state.saving = true;
          state.error = "";
        })
        .addCase(createItem.fulfilled, (state, action) => {
          state.saving = false;
          const created = action.payload;
          const createdId =
            created?.id ??
            created?.branchId ??
            created?.branchCenterId ??
            created?.employeeId;
          if (created && createdId != null) {
            const exists = state.items.some(
              (item) =>
                String(item.id ?? item.branchId ?? item.employeeId) ===
                String(createdId)
            );
            if (!exists) {
              state.items = [...state.items, created];
            }
          }
        })
        .addCase(createItem.rejected, (state, action) => {
          state.saving = false;
          state.error = action.payload || "Failed to save.";
        })
        .addCase(updateItem.pending, (state) => {
          state.saving = true;
          state.error = "";
        })
        .addCase(updateItem.fulfilled, (state, action) => {
          state.saving = false;
          const updated = action.payload;
          const updatedId = updated?.id ?? action.meta?.arg?.id;
          if (updated && updatedId != null) {
            const index = state.items.findIndex(
              (item) => String(item.id) === String(updatedId)
            );
            if (index >= 0) {
              state.items[index] = { ...state.items[index], ...updated };
            } else {
              state.items.push(updated);
            }
          }
        })
        .addCase(updateItem.rejected, (state, action) => {
          state.saving = false;
          state.error = action.payload || "Failed to update.";
        })
        .addCase(deleteItem.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(deleteItem.fulfilled, (state, action) => {
          state.loading = false;
          const deletedId = action.meta?.arg;
          if (deletedId != null) {
            state.items = state.items.filter(
              (item) => String(item.id) !== String(deletedId)
            );
          }
        })
        .addCase(deleteItem.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to delete.";
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: {
      ...slice.actions,
      fetchAll,
      createItem,
      updateItem,
      deleteItem,
    },
  };
};
