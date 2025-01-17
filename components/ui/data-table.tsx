'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    InitialTableState,
    useReactTable,
    getPaginationRowModel
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './data-table-pag';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    initialState?: InitialTableState;
}

export function DataTable<TData, TValue>({ columns, data, initialState }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState,
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <div className="divide-y rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table} />
        </div>
    );
}
