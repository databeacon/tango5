import { notFound } from 'next/navigation';
import { getScenario } from '~/lib/db/queries';
import { GameScene } from '~/components/game/game-scene';

export default async function Page({ params }: { params: Promise<{ scenarioId: number }> }) {
    const id = (await params).scenarioId;

    if (isNaN(id)) notFound();

    const scenario = await getScenario(id);

    if (!scenario) notFound();

    return <GameScene backstageAccess scenario={scenario} />;
}
