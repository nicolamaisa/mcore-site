# MCORE sites

This repository serves both public MCORE sites from one Docker Compose stack:

| Site | Service | Source |
| --- | --- | --- |
| `mcore.it` | `mcore-site` | `index.html` |
| `labs.mcore.it` | `mcore-labs` | `labs/index.html` |

Both services join the external `nginx` network. Configure the central reverse proxy so `mcore.it` targets `mcore-site:80` and `labs.mcore.it` targets `mcore-labs:80`.

## Deploy

```bash
git pull
docker compose up -d --build
```
