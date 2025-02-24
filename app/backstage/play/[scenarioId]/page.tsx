import { notFound } from 'next/navigation';
import { getScenario } from '~/lib/db/queries';
import { GameLayout } from '~/components/game/game-layout';

export default async function Page({ params }: { params: Promise<{ scenarioId: number }> }) {
    const id = (await params).scenarioId;

    if (isNaN(id)) notFound();

    const scenario = await getScenario(id);

    if (!scenario) notFound();

    return <GameLayout backstageAccess scenario={scenario} />;
}
