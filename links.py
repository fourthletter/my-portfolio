"""Slug-to-env-key map for outbound `/go/<slug>/` redirects.

Handle-free slugs live here; destination URLs come from environment variables
at build time (env vars or defaults). Project references avoid committing third-party URLs; the home
page LinkedIn link is set separately in templates (see index.html).
"""

from __future__ import annotations

from typing import Final

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
    "new-tech-new-rules": "LINK_NEW_TECH_NEW_RULES",
    "more-than-code": "LINK_MORE_THAN_CODE",
}


LINK_DEFAULTS: Final[dict[str, str]] = {
    "contact-github": "https://github.com/fourthletter",
    "contact-linkedin": "https://www.linkedin.com/in/diluong/",
    "esusu-repo": "https://github.com/fourthletter/eSuSu",
    "esusu-press": "https://techcrunch.com/2016/05/08/e-susu-aims-to-close-the-gap-between-community-loan-groups-and-traditional-banking-services/",
    "nanny-state-repo": "https://github.com/fourthletter/nanny-surveillance",
    "nanny-state-press": "https://www.mozillafoundation.org/en/blog/building-with-a-bias-for-inclusivity-at-mozfest-2021/",
    "exposing-the-invisible": "https://tacticaltech.org/projects/exposing-the-invisible/",
    "mapping-pretrial-risk": "https://pretrialrisk.com/#:~:text=Movement%20Alliance%20Project%20has%20spent%20almost%20three%20years%20gathering%20data%20on%20pretrial%20risk%20assessments.",
    "demochat-video": "https://www.youtube.com/watch?v=EfocaSr1kS0",
    "demochat-press": "https://www.makingallvoicescount.org/news/global-innovation-competition-finale-innovation-celebration-and-now-the-hard-work-really-begins/",
    "new-tech-new-rules": "https://storyforimpact.io/newtechnewrules",
    "more-than-code": "https://morethancode.org",
}


def link_default_for_slug(slug: str) -> str | None:
    return LINK_DEFAULTS.get(slug)
