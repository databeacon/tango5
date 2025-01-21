'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/ui/data-table';
import { PropsWithoutRef } from 'react';
import { UserGameDeleteDialog } from '~/components/user-game/usergame-delete-dialog';
import { usePagination } from '~/hooks/use-pagination';
import { getUserGamesPage } from '~/lib/actions';
import { useTableApi } from '~/hooks/use-table-api';

type UserGameRow = {
    id: number;
    userId: string;
    scenarioId: number;
    playTime: string;
    success: boolean;
};

type UserGamesTableProps = {
    allowDeleteGames: boolean;
};

export const userColumns: ColumnDef<UserGameRow>[] = [
    {
        accessorKey: 'scenarioId',
        header: () => <div className="text-center">Scenario ID</div>
    },
    {
        accessorKey: 'playTime',
        header: () => <div className="text-center">Play Time</div>
    },
    {
        accessorKey: 'success',
        header: () => <div className="text-center">Succeded?</div>,
        cell: ({ row }) => <div className="text-center">{row.original.success ? '✅' : '❌'}</div>
    }
];

export const adminColumns: ColumnDef<UserGameRow>[] = [
    {
        accessorKey: 'id',
        header: () => <div className="text-center">ID</div>
    },
    {
        accessorKey: 'userId',
        header: () => <div className="text-center">User ID</div>
    },
    {
        accessorKey: 'scenarioId',
        header: () => <div className="text-center">Scenario ID</div>
    },
    {
        accessorKey: 'playTime',
        header: () => <div className="text-center">Play Time</div>
    },
    {
        accessorKey: 'success',
        header: () => <div className="text-center">Succeded?</div>,
        cell: ({ row }) => <div className="text-center">{row.original.success ? '✅' : '❌'}</div>
    },
    {
        accessorKey: 'action',
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            const id = row.getValue('id') as number;

            return (
                <div className="flex justify-center">
                    <UserGameDeleteDialog id={id} />
                </div>
            );
        }
    }
];

export const UserGamesTable = (props: PropsWithoutRef<UserGamesTableProps>) => {
    const { pagination, onPaginationChange, limit, offset } = usePagination();

    const { data, rowCount, loading } = useTableApi(getUserGamesPage, limit, offset);

    return (
        <DataTable
            data={data as UserGameRow[]}
            rowCount={rowCount}
            loading={loading}
            onPaginationChange={onPaginationChange}
            pagination={pagination}
            columns={props.allowDeleteGames ? adminColumns : userColumns}
            initialState={{ columnVisibility: { data: false } }}
        />
    );
};
