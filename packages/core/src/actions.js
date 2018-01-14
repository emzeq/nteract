// @flow
import * as actionTypes from "./actionTypes";

import type {
  ImmutableCell,
  ImmutableNotebook,
  CellID,
  CellType,
  ImmutableCellOrder,
  ImmutableOutput,
  ImmutableOutputs,
  MimeBundle
} from "@nteract/commutable/src/types";

import type {
  PasteCellAction,
  ChangeFilenameAction,
  ToggleCellExpansionAction,
  ChangeCellTypeAction,
  CutCellAction,
  CopyCellAction,
  DeleteMetadataFieldAction,
  OverwriteMetadataFieldAction,
  AcceptPayloadMessageAction,
  SetNotebookAction,
  NewCellAfterAction,
  NewCellBeforeAction,
  ClearOutputsAction,
  AppendOutputAction,
  SetNotebookCheckpointAction,
  UpdateDisplayAction,
  FocusNextCellAction,
  FocusCellEditorAction,
  FocusNextCellEditorAction,
  FocusPreviousCellEditorAction,
  RemoveCellAction,
  FocusCellAction,
  NewCellAppendAction,
  MergeCellAfterAction,
  MoveCellAction,
  ToggleStickyCellAction,
  FocusPreviousCellAction,
  SetKernelInfoAction,
  SetLanguageInfoAction,
  UpdateCellStatusAction,
  ToggleCellInputVisibilityAction,
  ToggleCellOutputVisibilityAction,
  SetInCellAction,
  SendExecuteMessageAction,
  NewKernelAction,
  SetGithubTokenAction,
  SetNotificationSystemAction,
  SetExecutionStateAction,
  ExitAction,
  StartSavingAction,
  InterruptKernelAction,
  KillKernelAction,
  DoneSavingAction,
  DoneSavingConfigAction,
  SetConfigAction
} from "../actionTypes";

import { createExecuteRequest } from "@nteract/messaging";

// TODO: This is one of the untyped actions currently
export function newKernel(kernelSpec: any, cwd: string) {
  return {
    type: actionTypes.LAUNCH_KERNEL,
    kernelSpec,
    cwd
  };
}

// TODO: This is one of the untyped actions currently
export function newKernelByName(kernelSpecName: any, cwd: string) {
  return {
    type: actionTypes.LAUNCH_KERNEL_BY_NAME,
    kernelSpecName,
    cwd
  };
}

export function setNotebookKernelInfo(kernelInfo: any): SetKernelInfoAction {
  return {
    type: actionTypes.SET_KERNEL_INFO,
    kernelInfo
  };
}

// TODO: Lock this type down to a proper enum
// TODO: Create a proper flow type in actionTypes
export function setExecutionState(executionState: string) {
  return {
    type: actionTypes.SET_EXECUTION_STATE,
    executionState
  };
}

export function clearOutputs(id: string): ClearOutputsAction {
  return {
    type: actionTypes.CLEAR_OUTPUTS,
    id
  };
}

export function moveCell(
  id: string,
  destinationId: string,
  above: boolean
): MoveCellAction {
  return {
    type: actionTypes.MOVE_CELL,
    id,
    destinationId,
    above
  };
}

export function removeCell(id: string): RemoveCellAction {
  return {
    type: actionTypes.REMOVE_CELL,
    id
  };
}

export function createCellAfter(
  cellType: CellType,
  id: string,
  source: string = ""
): NewCellAfterAction {
  return {
    type: actionTypes.NEW_CELL_AFTER,
    source,
    cellType,
    id
  };
}

export function createCellBefore(
  cellType: CellType,
  id: string
): NewCellBeforeAction {
  return {
    type: actionTypes.NEW_CELL_BEFORE,
    cellType,
    id
  };
}

export function createCellAppend(cellType: CellType): NewCellAppendAction {
  return {
    type: actionTypes.NEW_CELL_APPEND,
    cellType
  };
}

export function mergeCellAfter(id: string): MergeCellAfterAction {
  return {
    type: actionTypes.MERGE_CELL_AFTER,
    id
  };
}

/**
 * setInCell can generically be used to set any attribute on a cell, including
 * and especially for changing metadata per cell.
 * @param {CellID} id    cell ID
 * @param {Array<string>} path  path within a cell to set
 * @param {any} value what to set it to
 *
 * Example:
 *
 * > action = setInCell('123', ['metadata', 'cool'], true)
 * > documentReducer(state, action)
 * {
 *   ...
 *   '123': {
 *     'metadata': {
 *       'cool': true
 *     }
 *   }
 * }
 *
 */
export function setInCell<T>(
  id: CellID,
  path: Array<string>,
  value: T
): SetInCellAction<T> {
  return {
    type: actionTypes.SET_IN_CELL,
    id,
    path,
    value
  };
}

export function updateCellSource(
  id: string,
  source: string
): SetInCellAction<string> {
  return setInCell(id, ["source"], source);
}

export function updateCellExecutionCount(
  id: string,
  count: number
): SetInCellAction<number> {
  return setInCell(id, ["execution_count"], count);
}

export function toggleCellOutputVisibility(
  id: string
): ToggleCellOutputVisibilityAction {
  return {
    type: actionTypes.TOGGLE_CELL_OUTPUT_VISIBILITY,
    id
  };
}

export function toggleCellInputVisibility(
  id: string
): ToggleCellInputVisibilityAction {
  return {
    type: actionTypes.TOGGLE_CELL_INPUT_VISIBILITY,
    id
  };
}

export function updateCellStatus(
  id: string,
  status: string
): UpdateCellStatusAction {
  return {
    type: actionTypes.UPDATE_CELL_STATUS,
    id,
    status
  };
}

export function focusCell(id: string): FocusCellAction {
  return {
    type: actionTypes.FOCUS_CELL,
    id
  };
}

export function focusNextCell(
  id: string,
  createCellIfUndefined: boolean
): FocusNextCellAction {
  return {
    type: actionTypes.FOCUS_NEXT_CELL,
    id,
    createCellIfUndefined
  };
}

export function focusPreviousCell(id: string): FocusPreviousCellAction {
  return {
    type: actionTypes.FOCUS_PREVIOUS_CELL,
    id
  };
}

export function focusCellEditor(id: string | null): FocusCellEditorAction {
  return {
    type: actionTypes.FOCUS_CELL_EDITOR,
    id
  };
}

export function focusNextCellEditor(id: string): FocusNextCellEditorAction {
  return {
    type: actionTypes.FOCUS_NEXT_CELL_EDITOR,
    id
  };
}

export function focusPreviousCellEditor(
  id: string
): FocusPreviousCellEditorAction {
  return {
    type: actionTypes.FOCUS_PREVIOUS_CELL_EDITOR,
    id
  };
}

export function toggleStickyCell(id: string): ToggleStickyCellAction {
  return {
    type: actionTypes.TOGGLE_STICKY_CELL,
    id
  };
}

export function overwriteMetadata(
  field: string,
  value: any
): OverwriteMetadataFieldAction {
  return {
    type: actionTypes.OVERWRITE_METADATA_FIELD,
    field,
    value
  };
}

export function deleteMetadata(field: string): DeleteMetadataFieldAction {
  return {
    type: actionTypes.DELETE_METADATA_FIELD,
    field
  };
}

export const killKernel: KillKernelAction = {
  type: actionTypes.KILL_KERNEL
};

export const interruptKernel: InterruptKernelAction = {
  type: actionTypes.INTERRUPT_KERNEL
};

export function setNotificationSystem(
  notificationSystem: any
): SetNotificationSystemAction {
  return {
    type: actionTypes.SET_NOTIFICATION_SYSTEM,
    notificationSystem
  };
}

export function copyCell(id: CellID): CopyCellAction {
  return {
    type: actionTypes.COPY_CELL,
    id
  };
}

export function cutCell(id: CellID): CutCellAction {
  return {
    type: actionTypes.CUT_CELL,
    id
  };
}

export function pasteCell(): PasteCellAction {
  return {
    type: actionTypes.PASTE_CELL
  };
}

export function changeCellType(id: CellID, to: CellType): ChangeCellTypeAction {
  return {
    type: actionTypes.CHANGE_CELL_TYPE,
    id,
    to
  };
}

export function setGithubToken(githubToken: string): SetGithubTokenAction {
  return {
    type: actionTypes.SET_GITHUB_TOKEN,
    githubToken
  };
}

export function setConfigAtKey<T>(key: string, value: T): SetConfigAction<T> {
  return {
    type: actionTypes.SET_CONFIG_AT_KEY,
    key,
    value
  };
}

export function setTheme(theme: string): SetConfigAction<string> {
  return setConfigAtKey("theme", theme);
}

export function setCursorBlink(value: string): SetConfigAction<string> {
  return setConfigAtKey("cursorBlinkRate", value);
}

export function toggleOutputExpansion(id: string): ToggleCellExpansionAction {
  return {
    type: actionTypes.TOGGLE_OUTPUT_EXPANSION,
    id
  };
}

/**
 * Execute Cell action.
 *
 * @param {String} id - Universally Unique Identifier of cell to be executed.
 * @param {Object} source - Source code to executed.
 * @return {Object} executeCellAction - Action to be dispatched to reducer.
 */
export function executeCell(
  id: string,
  source: string
): SendExecuteMessageAction {
  const message = createExecuteRequest(source);

  return {
    type: actionTypes.SEND_EXECUTE_REQUEST,
    id,
    message
  };
}

export function changeFilename(filename: string): ChangeFilenameAction {
  return {
    type: actionTypes.CHANGE_FILENAME,
    filename
  };
}

export function save(filename: string, notebook: any) {
  return {
    type: actionTypes.SAVE,
    filename,
    notebook
  };
}

export function saveAs(filename: string, notebook: any) {
  return {
    type: actionTypes.SAVE_AS,
    filename,
    notebook
  };
}

export function doneSaving(notebook: any) {
  return {
    type: actionTypes.DONE_SAVING,
    notebook
  };
}
