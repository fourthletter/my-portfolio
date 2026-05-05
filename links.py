"""Slug-to-env-key map for outbound `/go/<slug>/` redirects.

Handle-free slugs live here; destination URLs come from environment variables
at build time. Project references avoid committing third-party URLs; the home
page LinkedIn link is set separately in templates (see index.html).
"""

from __future__ import annotations

LINK_ENV_KEYS: dict[str, str] = {
    "contact-github": "LINK_CONTACT_GITHUB",
    "esusu-repo": "LINK_ESUSU_REPO",
    "esusu-press": "LINK_ESUSU_PRESS",
    "nanny-state-repo": "LINK_NANNY_STATE_REPO",
    "nanny-state-press": "LINK_NANNY_STATE_PRESS",
    "exposing-the-invisible": "LINK_EXPOSING_THE_INVISIBLE",
    "mapping-pretrial-risk": "LINK_MAPPING_PRETRIAL_RISK",
    "demochat-video": "LINK_DEMOCHAT_VIDEO",
    "demochat-press": "LINK_DEMOCHAT_PRESS",
}
