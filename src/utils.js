export function selectSpawner(spawners, spawnerWeights) {
    const randomValue = Math.random()

    let sum = 0;
    for (let i = 0; i < spawners.length; i++) {
        sum += spawnerWeights[i]
        if (randomValue < sum) {
            return spawners[i]
        }
    }
}