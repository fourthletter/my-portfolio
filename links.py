"""Slug-to-env-key map for outbound `/go/<slug>/` redirects.

Only handle-free slugs live in source. Actual destination URLs are read from
environment variables at build time so the committed repository never contains
personal handles or third-party project URLs.
"""

from __future__ import annotations

LINK_ENV_KEYS: dict[str, str] = {
    "contact-github": "LINK_CONTACT_GITHUB",
    "contact-linkedin": "LINK_CONTACT_LINKEDIN",
    "esusu-repo": "LINK_ESUSU_REPO",
    "esusu-press": "LINK_ESUSU_PRESS",
    "nanny-state-repo": "LINK_NANNY_STATE_REPO",
    "nanny-state-press": "LINK_NANNY_STATE_PRESS",
    "exposing-the-invisible": "LINK_EXPOSING_THE_INVISIBLE",
    "mapping-pretrial-risk": "LINK_MAPPING_PRETRIAL_RISK",
    "demochat-video": "LINK_DEMOCHAT_VIDEO",
    "demochat-press": "LINK_DEMOCHAT_PRESS",
}
