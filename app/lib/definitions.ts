export interface GroupedSum { name: string, sum: number, emoji: string };
export interface Error { input: string, helperText: string };
export enum RowState { Initial, Editing, Deleting };