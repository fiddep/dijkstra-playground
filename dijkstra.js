function dijkstra(graph, start) {
  const explored = {};
  explored[start] = [];
  explored[start].dist = 0;

  while (true) {
    let parent;
    let nearest;
    let dist = Infinity;

    Object.keys(explored).forEach((n) => {
      if (!explored[n]) return;

      const ndist = explored[n].dist;
      const edges = graph[n];

      Object.keys(edges).forEach((edge) => {
        if (explored[edge]) return;
        let d = edges[edge] + ndist;
        if (d < dist) {
          parent = explored[n];
          nearest = edge;
          dist = d;
        }
      });
    });

    if (dist === Infinity) {
      break;
    }

    explored[nearest] = parent.concat(nearest);

    explored[nearest].dist = dist;
  }

  return explored.final;
}

module.exports = dijkstra;
