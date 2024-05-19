export interface FileType {
  id: string;
  name: string;
}
export interface FileTypeChecked extends FileType {
  checked?: boolean | null;
}
