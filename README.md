
# MCORE website

Standalone React + Vite website for MCORE.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The output is generated in `dist/`.

## Notes

- No Lovable runtime, tracking or configuration is included.
- The header uses the MCORE monogram with an Outfit wordmark created in CSS.
- MCORE Labs opens through a real transition before redirecting to `labs.mcore.it`.

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

