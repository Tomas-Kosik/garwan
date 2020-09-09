import { TableColumnType } from '../enums/table-column-type.enum';

export interface TableColumn {
  columnDef: string;
  headerDef: string;
  columnType: TableColumnType;
}
