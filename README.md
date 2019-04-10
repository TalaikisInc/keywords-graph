# Keywords Graph

This is proprietary keywords generation tool and keywords graph database.

## Run

```bash
cd neo4j
docker build -t graph .
docker run -it -p 7687:7687 -p 7474:7474 --restart always -v $HOME/Desktop/keywords-graph/.data/keywords:/data --name graph -d graph
```
