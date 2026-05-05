from flask_frozen import Freezer

from app import app
from links import LINK_ENV_KEYS
from portfolio_data import PROJECTS


app.config["FREEZER_DESTINATION"] = "dist"
app.config["FREEZER_REMOVE_EXTRA_FILES"] = False
app.config["FREEZER_RELATIVE_URLS"] = True

freezer = Freezer(app)


@freezer.register_generator
def project_detail():
    for project in PROJECTS:
        yield {"slug": project.slug}


@freezer.register_generator
def go():
    for slug in LINK_ENV_KEYS:
        yield {"slug": slug}


if __name__ == "__main__":
    freezer.freeze()
