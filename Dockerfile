FROM python:3.12-slim-bookworm AS builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    WRITE_CNAME=0

COPY requirements-build.txt build_static.py app.py links.py portfolio_data.py ./
COPY scripts/build_static_site.sh scripts/
COPY content/ content/
COPY static/ static/
COPY templates/ templates/

RUN pip install --no-cache-dir -r requirements-build.txt \
    && chmod +x scripts/build_static_site.sh \
    && ./scripts/build_static_site.sh

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
