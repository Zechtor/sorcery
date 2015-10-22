"""remove-source-constraint

Revision ID: 59ad4b7be353
Revises: 179fa3e746d0
Create Date: 2015-10-19 23:21:18.777952

"""

# revision identifiers, used by Alembic.
revision = '59ad4b7be353'
down_revision = '179fa3e746d0'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.drop_constraint("source", "feed", type_="unique")


def downgrade():
    op.create_unique_constraint('source', 'feed', ['source'])
