"""Add active to game

Revision ID: 3d1f064cdd6a
Revises: 59ad4b7be353
Create Date: 2015-10-24 23:08:13.727273

"""

# revision identifiers, used by Alembic.
revision = '3d1f064cdd6a'
down_revision = '59ad4b7be353'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('game', sa.Column('active', sa.Boolean, nullable=False))


def downgrade():
    op.drop_column('game', 'active')
