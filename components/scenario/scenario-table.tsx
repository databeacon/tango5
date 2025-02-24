'use client';

import Link from 'next/link';
import { changeScenarioIsDemo, changeScenarioVisibility, getScenariosPage } from '~/lib/actions';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Download, PlayIcon } from 'lucide-react';
import { usePagination } from '~/hooks/use-pagination';
import { useTableApi } from '~/hooks/use-table-api';
import { TableContext } from '~/hooks/use-table-context';
import { Flight } from '~/lib/domain/flight';
import { Pcd } from '~/lib/domain/pcd';
import { ScenarioSelect } from '~/lib/types';
import { CheckboxAction } from './checkbox-action';
import { useDialogAction } from '~/hooks/use-dialog-action';
import { cacheTags } from '~/lib/constants';
import { DataTable } from '~/components/ui/data-table';
import { ScenarioCheckSolution } from '~/components/scenario/scenario-check-solution';
import { ScenarioDeleteDialog } from '~/components/scenario/scenario-delete-dialog';
import { ScenarioUploadDialog } from '~/components/scenario/scenario-upload-dialog';

export const columns: ColumnDef<ScenarioSelect>[] = [
    {
        accessorKey: 'id',
        header: () => <div className="text-right">ID</div>
    },
    {
        accessorKey: 'data'
    },
    {
        accessorKey: 'flights',
        header: () => <div className="text-right">Flights</div>,
        cell: ({ row }) => {
            const { data: scenarioData } = row.original;

            return <div className="text-right font-medium">{scenarioData.flights.length}</div>;
        }
    },
    {
        accessorKey: 'pcds',
        header: () => <div className="text-right">PCDs</div>,
        cell: ({ row }) => {
            const { data: scenarioData } = row.original;
            const flightsDict: Record<string, Flight> = scenarioData.flights.reduce(
                (acc: Record<string, Flight>, flight) => {
                    acc[flight.id] = new Flight(
                        flight.id,
                        flight.latitudeDeg,
                        flight.longitudeDeg,
                        flight.altitudeFt,
                        flight.callsign,
                        flight.groundSpeedKts,
                        flight.trackDeg,
                        flight.verticalSpeedFtpm,
                        flight.selectedAltitudeFt
                    );
                    return acc;
                },
                {}
            );
            const countPcds = scenarioData.pcds.filter(
                (pcd) =>
                    !new Pcd(
                        flightsDict[pcd.firstId],
                        flightsDict[pcd.secondId],
                        pcd.minDistanceNM,
                        pcd.timeToMinDistanceMs
                    ).isSafe
            ).length;
            return <div className="text-right font-medium">{countPcds}</div>;
        }
    },
    {
        accessorKey: 'active',
        header: () => <div className="text-right">Active</div>,
        cell: ({ row }) => <ActiveCell row={row} />
    },
    {
        accessorKey: 'demo',
        header: () => <div className="text-right">Demo</div>,
        cell: ({ row }) => <DemoCell row={row} />
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const { id, data } = row.original;

            return (
                <div className="flex flex-row justify-end gap-2">
                    <Link href={`/backstage/play/${id}`}>
                        <PlayIcon size={'1rem'} />
                    </Link>
                    <ScenarioCheckSolution scenario={row.original} />
                    <a
                        title={`Download scenario #${id}`}
                        href={`data:application/json,${JSON.stringify(data)}`}
                        download={`t5_scenario_${id}.json`}>
                        <Download size={'1rem'} />
                    </a>
                    <ScenarioDeleteDialog id={id} />
                </div>
            );
        }
    }
];

export const ScenariosTable = () => {
    const { pagination, onPaginationChange, limit, offset } = usePagination();
    const { data, rowCount, loading, forceRefresh } = useTableApi(getScenariosPage, limit, offset);

    return (
        <TableContext value={{ forceRefresh, variant: 'default' }}>
            <DataTable
                data={data}
                rowCount={rowCount}
                loading={loading}
                onPaginationChange={onPaginationChange}
                pagination={pagination}
                columns={columns}
                initialState={{ columnVisibility: { data: false } }}
            />
            <ScenarioUploadDialog />
        </TableContext>
    );
};

const ActiveCell = ({ row }: { row: Row<ScenarioSelect> }) => {
    const { id, active } = row.original;
    const { action } = useDialogAction(
        `Changing visibility for scenario #${id}`,
        changeScenarioVisibility,
        cacheTags.scenarios
    );
    return (
        <div className="mr-2 flex justify-end">
            <CheckboxAction action={(value: boolean) => action({ id, active: value })} checked={active} />
        </div>
    );
};

const DemoCell = ({ row }: { row: Row<ScenarioSelect> }) => {
    const { id, demo } = row.original;
    const { action } = useDialogAction(
        `Changing is demo for scenario #${id}`,
        changeScenarioIsDemo,
        cacheTags.scenarios
    );
    return (
        <div className="mr-2 flex justify-end">
            <CheckboxAction action={(value: boolean) => action({ id, demo: value })} checked={demo} />
        </div>
    );
};
