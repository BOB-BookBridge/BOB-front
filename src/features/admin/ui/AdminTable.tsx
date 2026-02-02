import styled from 'styled-components';

export interface ColumnConfig {
  key: string;
  label: string;
  width: number;
  render?: (value: unknown) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: ColumnConfig[];
  data: T[];
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
}

const AdminTable = <T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  keyExtractor,
}: AdminTableProps<T>) => {
  return (
    <Table $columns={columns}>
      <thead>
        <TableHeader>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </TableHeader>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow key={keyExtractor(item)} onClick={() => onRowClick?.(item)}>
            {columns.map((col) => (
              <td key={`${keyExtractor(item)}-${col.key}`}>
                {col.render ? col.render(item[col.key]) : String(item[col.key])}
              </td>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;

const Table = styled.table<{ $columns: ColumnConfig[] }>`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
  table-layout: fixed;

  ${({ $columns }) =>
    $columns
      .map(
        (col, index) => `
    th:nth-child(${index + 1}),
    td:nth-child(${index + 1}) {
      width: ${col.width}%;
    }
  `,
      )
      .join('\n')}
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }

  td {
    padding: 12px 4px;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.BLACK};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TableHeader = styled.tr`
  th {
    padding: 12px 0;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.BLACK};
    border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY_300};
  }
`;
