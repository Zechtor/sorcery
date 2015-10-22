"""Larger description

Revision ID: 179fa3e746d0
Revises: 356a87c27859
Create Date: 2015-10-11 15:56:12.417864

"""

# revision identifiers, used by Alembic.
revision = '179fa3e746d0'
down_revision = '356a87c27859'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.alter_column('article', 'description', type=sa.String(2000))


def downgrade():
    pass
