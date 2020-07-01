const fs = require("fs");
const util = require("util");
const dijkstra = require("./dijkstra.js");

const readFile = util.promisify(fs.readFile);

function getFileContent(path) {
  return readFile(path, "utf-8").then((d) =>
    d.split("\n").map((row) => row.split(" ").map((x) => parseInt(x, 10)))
  );
}

function addEdge(node, key, weight) {
  if (!node || !weight) return;

  node[key] = weight;
}

function buildGraph(tree) {
  const depth = tree.shift();
  const map = {
    start: { "0-0": tree[0][0] },
    final: {},
  };

  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree[i].length; j++) {
      map[`${i}-${j}`] = {};

      // Last provided edges lead to final node
      if (i === tree.length - 1) {
        map[`${i}-${j}`]["final"] = 0;
      }

      addEdge(map[`${i - 1}-${j}`], `${i}-${j}`, tree[i][j]);
      addEdge(map[`${i - 1}-${j}`], `${i}-${j + 1}`, tree[i][j + 1]);
    }
  }

  return map;
}

const exercises = [
  { path: "./input-b.txt", result: 447 },
  { path: "./input-simple.txt", result: 13 },
  { path: "./input-a.txt", result: 16 },
];

async function run() {
  for (let i = 0; i < exercises.length; i++) {
    await getFileContent(exercises[i].path)
      .then(buildGraph)
      .then((graph) => dijkstra(graph, "start"))
      .then((res) => console.log(res.dist));
  }
}

run();
