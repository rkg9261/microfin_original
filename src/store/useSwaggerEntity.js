import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./hooks";
import { swaggerActions } from "./swaggerSlices";
import { toApi } from "../api/entityMappers";
import { useConfirm } from "../components/common/ConfirmModal";

const resolveId = (editing) => {
  if (!editing || typeof editing !== "object") return null;

  const candidate =
    editing.id ??
    editing.memberId ??
    editing.productId ??
    editing.variantId ??
    editing.supplierId ??
    editing.insurancePartyId ??
    editing.productLoanId ??
    editing.brandId ??
    editing.bankId ??
    editing.penaltySchemeId ??
    editing.stateId ??
    editing.districtId ??
    editing.countryId ??
    null;

  // Never treat foreign keys like branchId/staffId as the row id.
  return candidate !== undefined && candidate !== null && candidate !== ""
    ? candidate
    : null;
};

export const useSwaggerEntity = (key) => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const actions = swaggerActions[key];
  const state = useAppSelector((store) => store[key]) || {
    items: [],
    loading: false,
    error: "",
    saving: false,
  };

  useEffect(() => {
    if (actions?.fetchAll) {
      dispatch(actions.fetchAll());
    }
  }, [dispatch, actions]);

  const save = async (formData, editing) => {
    const payload = toApi[key] ? toApi[key]({ ...editing, ...formData }) : formData;
    const id = resolveId(editing);

    if (id !== null && id !== undefined && id !== "") {
      await dispatch(actions.updateItem({ id, data: payload })).unwrap();
      toast.success("Updated successfully");
    } else {
      await dispatch(actions.createItem(payload)).unwrap();
      toast.success("Saved successfully");
    }
  };

  const remove = async (id, message) => {
    const confirmed = await confirm({
      title: "Confirm Delete",
      message: message || "Are you sure you want to delete this record?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!confirmed) return false;

    await dispatch(actions.deleteItem(id)).unwrap();
    toast.success("Deleted successfully");
    return true;
  };

  return {
    items: state.items || [],
    loading: state.loading,
    saving: state.saving,
    error: state.error,
    dispatch,
    actions,
    save,
    remove,
  };
};
